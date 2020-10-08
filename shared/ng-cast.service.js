"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgCastService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var window;
var cast;
var chrome;
var NgCastService = /** @class */ (function () {
    function NgCastService() {
        var _this = this;
        this.status = {
            casting: false
        };
        this.onInitSuccess = function () {
            console.log('GCast initialization success');
        };
        this.onError = function (err) {
            console.log('GCast initialization failed', err);
        };
        this.discoverDevices = function () {
            var self = _this;
            var subj = new rxjs_1.Subject();
            _this.cast.requestSession(function (s) {
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
            var mediaInfo = new _this.cast.media.MediaInfo(media);
            var request = new _this.cast.media.LoadRequest(mediaInfo);
            console.log('launch media with session', _this.session);
            if (!_this.session) {
                window.open(media);
                return false;
            }
            _this.session.loadMedia(request, _this.onMediaDiscovered.bind(_this, 'loadMedia'), _this.onMediaError);
            return true;
        };
        this.onMediaDiscovered = function (media) {
            _this.currentMedia = media;
        };
        this.play = function () {
            _this.currentMedia.play(null);
        };
        this.pause = function () {
            _this.currentMedia.pause(null);
        };
        this.stop = function () {
            _this.currentMedia.stop(null);
        };
        this.onMediaError = function (err) {
            console.error('Error launching media', err);
        };
    }
    NgCastService.prototype.initializeCastApi = function () {
        var _this = this;
        this.cast = window['chrome'].cast;
        var sessionRequest = new this.cast.SessionRequest(this.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID);
        var apiConfig = new this.cast.ApiConfig(sessionRequest, function () { }, function (status) { if (status === _this.cast.ReceiverAvailability.AVAILABLE) { } });
        var x = this.cast.initialize(apiConfig, this.onInitSuccess, this.onError);
    };
    ;
    NgCastService.prototype.onGCastApiAvailable = function (url, type) {
        window.__onGCastApiAvailable = function (isAvailable) {
            if (!isAvailable) {
                return false;
            }
            var castContext = cast.framework.CastContext.getInstance();
            castContext.setOptions({
                autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
                receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
            });
            var stateChanged = cast.framework.CastContextEventType.CAST_STATE_CHANGED;
            castContext.addEventListener(stateChanged, function () {
                var castSession = castContext.getCurrentSession();
                var media = new chrome.cast.media.MediaInfo(url, type);
                var request = new chrome.cast.media.LoadRequest(media);
                castSession && castSession
                    .loadMedia(request)
                    .then(function () {
                    console.log('Success');
                })
                    .catch(function (error) {
                    console.log('Error: ' + error);
                });
            });
        };
    };
    NgCastService.prototype.setCasting = function (value) {
        this.status.casting = value;
    };
    NgCastService.prototype.getStatus = function () {
        return this.status;
    };
    NgCastService = __decorate([
        core_1.Injectable()
    ], NgCastService);
    return NgCastService;
}());
exports.NgCastService = NgCastService;
//# sourceMappingURL=ng-cast.service.js.map