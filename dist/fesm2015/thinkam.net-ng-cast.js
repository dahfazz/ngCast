import { __decorate } from 'tslib';
import { Component, Injectable, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

let NgCastComponent = class NgCastComponent {
    constructor(ngCastService) {
        this.ngCastService = ngCastService;
    }
    ngOnInit() {
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
        template: '<google-cast-launcher id="castbutton"></google-cast-launcher>',
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
        this.onMediaDiscovered = (categories) => {
            let script = window['document'].createElement('script');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1');
            window['document'].body.appendChild(script);
            let media = window['document'].createElement('script');
            media.setAttribute('type', 'text/javascript');
            media.setAttribute('src', '/assets/lib/media.js');
            window['document'].body.appendChild(media);
            let castVideo = window['document'].createElement('script');
            media.setAttribute('type', 'text/javascript');
            media.setAttribute('src', '/assets/lib/castVideo.js');
            window['document'].body.appendChild(castVideo);
            let ads = window['document'].createElement('script');
            media.setAttribute('type', 'text/javascript');
            media.setAttribute('src', '/assets/lib/ads.js');
            window['document'].body.appendChild(ads);
            mediaJSON.categories = categories;
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
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
