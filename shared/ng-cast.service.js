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
var NgCastService = /** @class */ (function () {
    function NgCastService() {
        var _this = this;
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
        this.onMediaDiscovered = function (categories) {
            mediaJSON.categories = categories;
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
        this.cast = this.window['chrome'].cast;
        var sessionRequest = new this.cast.SessionRequest(this.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID);
        var apiConfig = new this.cast.ApiConfig(sessionRequest, function () { }, function (status) { if (status === _this.cast.ReceiverAvailability.AVAILABLE) { } });
        var x = this.cast.initialize(apiConfig, this.onInitSuccess, this.onError);
    };
    ;
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