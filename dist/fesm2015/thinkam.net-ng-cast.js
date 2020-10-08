import { __decorate } from 'tslib';
import { Component, Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

let NgCastComponent = class NgCastComponent {
    constructor(ngCastService) {
        this.ngCastService = ngCastService;
        this.window = window;
    }
    ngOnInit() {
        let script = window['document'].createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1');
        window['document'].body.appendChild(script);
        let ngCastService = this.ngCastService;
        this.window['__onGCastApiAvailable'] = function (isAvailable) {
            if (isAvailable) {
                ngCastService.initializeCastApi();
            }
        };
        this.castingStatus = this.ngCastService.getStatus();
    }
    openSession() {
        this.ngCastService.discoverDevices();
    }
    closeSession() {
        this.ngCastService.stop();
    }
};
NgCastComponent = __decorate([
    Component({
        selector: 'ng-cast',
        template: "<i *ngIf=\"castingStatus && !castingStatus.casting\" class=\"material-icons\" (click)=\"openSession()\">cast</i>\n<i *ngIf=\"castingStatus && castingStatus.casting\" class=\"material-icons\" (click)=\"openSession()\">cast_connected</i>",
        styles: [""]
    })
], NgCastComponent);

let NgCastService = class NgCastService {
    constructor() {
        this.window = window;
        this.status = {
            casting: false
        };
        this.onInitSuccess = function () {
            console.log('GCast initialization success');
        };
        this.onError = function (err) {
            console.log('GCast initialization failed', err);
        };
        this.discoverDevices = () => {
            let self = this;
            let subj = new Subject();
            this.cast.requestSession((s) => {
                self.session = s;
                self.setCasting(true);
                subj.next('CONNECTED');
            }, function (err) {
                self.setCasting(false);
                if (err.code === 'cancel') {
                    self.session = undefined;
                    subj.next('CANCEL');
                }
                else {
                    console.error('Error selecting a cast device', err);
                }
            });
            return subj;
        };
        this.launchMedia = (media) => {
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
        this.onMediaDiscovered = (media) => {
            this.currentMedia = media;
        };
        this.play = () => {
            this.currentMedia.play(null);
        };
        this.pause = () => {
            this.currentMedia.pause(null);
        };
        this.stop = () => {
            this.currentMedia.stop(null);
        };
        this.onMediaError = (err) => {
            console.error('Error launching media', err);
        };
    }
    initializeCastApi() {
        this.cast = this.window['chrome'].cast;
        let sessionRequest = new this.cast.SessionRequest(this.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID);
        let apiConfig = new this.cast.ApiConfig(sessionRequest, () => { }, (status) => { if (status === this.cast.ReceiverAvailability.AVAILABLE) { } });
        let x = this.cast.initialize(apiConfig, this.onInitSuccess, this.onError);
    }
    ;
    onGCastApiAvailable(url, type) {
        this.window.__onGCastApiAvailable = (isAvailable) => {
            if (!isAvailable) {
                return false;
            }
            this.cast = this.window['chrome'].cast;
            this.chrome = this.window['chrome'];
            var castContext = this.cast.framework.CastContext.getInstance();
            castContext.setOptions({
                autoJoinPolicy: this.chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
                receiverApplicationId: this.chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
            });
            var stateChanged = this.cast.framework.CastContextEventType.CAST_STATE_CHANGED;
            castContext.addEventListener(stateChanged, () => {
                var castSession = castContext.getCurrentSession();
                var media = new this.chrome.cast.media.MediaInfo(url, type);
                var request = new this.chrome.cast.media.LoadRequest(media);
                castSession && castSession
                    .loadMedia(request)
                    .then(() => {
                    console.log('Success');
                })
                    .catch((error) => {
                    console.log('Error: ' + error);
                });
            });
        };
    }
    setCasting(value) {
        this.status.casting = value;
    }
    getStatus() {
        return this.status;
    }
};
NgCastService = __decorate([
    Injectable()
], NgCastService);

let NgCastModule = class NgCastModule {
};
NgCastModule = __decorate([
    NgModule({
        imports: [
            CommonModule
        ],
        exports: [NgCastComponent],
        providers: [NgCastService],
        declarations: [NgCastComponent]
    })
], NgCastModule);

/**
 * Generated bundle index. Do not edit.
 */

export { NgCastModule, NgCastService, NgCastComponent as ɵa };
//# sourceMappingURL=thinkam.net-ng-cast.js.map
