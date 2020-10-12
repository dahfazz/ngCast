import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

declare global {
  var CastPlayer: any;
}

@Injectable()
export class NgCastService {
  private cast: any;
  private currentMedia: any;
  private window: any = window;

  public status = {
    casting: false
  };

  constructor() {
    globalThis.CastPlayer.mediaJSON = {
      categories: []
    };
  }

  initializeCastApi() {
    this.cast = this.window['chrome'].cast;
    let sessionRequest = new this.cast.SessionRequest('4F8B3483');
    let apiConfig = new this.cast.ApiConfig(sessionRequest,
      () => { },
      (status: any) => { if (status === this.cast.ReceiverAvailability.AVAILABLE) { } }
    );
    let x = this.cast.initialize(apiConfig, this.onInitSuccess, this.onError);
  };

  onInitSuccess = function () {
    console.log('GCast initialization success');
  };

  onError = function (err: any) {
    console.log('GCast initialization failed', err);
  };

  discoverDevices = () => {
    let self: any = this;
    let subj = new Subject();
    this.cast.requestSession((s: any) => {
      self.session = s;
      self.setCasting(true);
      subj.next('CONNECTED');
    }, function (err: any) {
      self.setCasting(false);
      if (err.code === 'cancel') {
        self.session = undefined;
        subj.next('CANCEL');
      } else {
        console.error('Error selecting a cast device', err);
      }
    });
    return subj;
  };

  onMediaDiscovered = (categories: any[]) => {
    let script = window['document'].createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1');
    window['document'].body.appendChild(script);

    globalThis.CastPlayer.mediaJSON.categories = categories;

    return globalThis.CastPlayer.addMediaContents();
  };

  initialize(mediaContents: any): void {
    if (mediaContents) {
      globalThis.CastPlayer.initializeUI();
      globalThis.CastPlayer.setupLocalPlayer();
      this.window['__onGCastApiAvailable'] = (isAvailable: boolean) => {
        if (isAvailable) {
          globalThis.CastPlayer.initializeCastPlayer();
        }
      };
    }
  }

  play = () => {
    this.currentMedia.play(null);
  };

  pause = () => {
    this.currentMedia.pause(null);
  };

  stop = () => {
    this.currentMedia.stop(null);
  };

  onMediaError = (err: any) => {
    console.error('Error launching media', err);
  };

  setCasting(value: any) {
    this.status.casting = value;
  }

  getStatus() {
    return this.status
  }
}
