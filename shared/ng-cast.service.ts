import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

let window: any;
let cast: any;
let chrome: any;

@Injectable()
export class NgCastService {
  private cast: any;
  private session: any;
  private currentMedia: any;
  public status = {
    casting: false
  };

  constructor() {}

  initializeCastApi() {
    this.cast = window['chrome'].cast;
    let sessionRequest = new this.cast.SessionRequest(this.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID);
    let apiConfig = new this.cast.ApiConfig(sessionRequest,
      () => { },
      (status: any) => { if (status === this.cast.ReceiverAvailability.AVAILABLE) { } }
    );
    let x = this.cast.initialize(apiConfig, this.onInitSuccess, this.onError);
  };

  onGCastApiAvailable(url: string, type: string): void {
    window.__onGCastApiAvailable = function(isAvailable: boolean){
      if(!isAvailable){
          return false;
      }
  
      var castContext = cast.framework.CastContext.getInstance();
  
      castContext.setOptions({
          autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
          receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
      });
  
      var stateChanged = cast.framework.CastContextEventType.CAST_STATE_CHANGED;
      castContext.addEventListener(stateChanged, () => {
          var castSession = castContext.getCurrentSession();
          var media = new chrome.cast.media.MediaInfo(url, type);
          var request = new chrome.cast.media.LoadRequest(media);
  
          castSession && castSession
              .loadMedia(request)
              .then(() => {
                  console.log('Success');
              })
              .catch((error: any) => {
                  console.log('Error: ' + error);
              });
      });
    };
  }

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

  launchMedia = (media: any) =>  {
    let mediaInfo = new this.cast.media.MediaInfo(media);
    let request = new this.cast.media.LoadRequest(mediaInfo);
    console.log('launch media with session', this.session);

    if (!this.session) {
      window.open(media);
      return false;
    }
    this.session.loadMedia(request, this.onMediaDiscovered.bind(this, 'loadMedia'), this.onMediaError);
    return true;
  };

  onMediaDiscovered = (media: any) => {
    this.currentMedia = media;
  };

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
