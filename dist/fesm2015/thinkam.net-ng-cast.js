import { __decorate } from 'tslib';
import { Component, Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

let NgCastComponent = class NgCastComponent {
    constructor(ngCastService) {
        this.ngCastService = ngCastService;
    }
    ngOnInit() {
        let script = window['document'].createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1');
        window['document'].body.appendChild(script);
        let ngCastService = this.ngCastService;
        window['__onGCastApiAvailable'] = function (isAvailable) {
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
        this.status = {
            casting: false
        };
        this.onInitSuccess = function (e) {
            console.log('GCast initialization success');
        };
        this.onError = function (err) {
            console.log('GCast initialization failed', err);
        };
        this.discoverDevices = function () {
            let self = this;
            let subj = new Subject();
            this.cast.requestSession(function (s) {
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
        this.launchMedia = function (media) {
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
        this.onMediaDiscovered = function (how, media) {
            this.currentMedia = media;
        };
        this.play = function () {
            this.currentMedia.play(null);
        };
        this.pause = function () {
            this.currentMedia.pause(null);
        };
        this.stop = function () {
            this.currentMedia.stop(null);
        };
        this.onMediaError = function (err) {
            console.error('Error launching media', err);
        };
    }
    initializeCastApi() {
        this.cast = window['chrome'].cast;
        let sessionRequest = new this.cast.SessionRequest(this.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID);
        let apiConfig = new this.cast.ApiConfig(sessionRequest, s => { }, status => { if (status === this.cast.ReceiverAvailability.AVAILABLE) { } });
        let x = this.cast.initialize(apiConfig, this.onInitSuccess, this.onError);
    }
    ;
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
