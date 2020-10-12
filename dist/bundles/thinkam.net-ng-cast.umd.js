(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('@thinkam.net/ng-cast', ['exports', '@angular/core', '@angular/common', 'rxjs'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.thinkam = global.thinkam || {}, global.thinkam.net = global.thinkam.net || {}, global.thinkam.net['ng-cast'] = {}), global.ng.core, global.ng.common, global.rxjs));
}(this, (function (exports, core, common, rxjs) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    function __createBinding(o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    }
    function __exportStar(m, exports) {
        for (var p in m)
            if (p !== "default" && !exports.hasOwnProperty(p))
                exports[p] = m[p];
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k))
                    result[k] = mod[k];
        result.default = mod;
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    exports.ɵa = /** @class */ (function () {
        function NgCastComponent(ngCastService) {
            this.ngCastService = ngCastService;
            this.videoImage = '';
            this.imageOffline = false;
            this.srcImageOffline = '';
        }
        NgCastComponent.prototype.ngOnInit = function () {
            this.window = window;
            var ngCastService = this.ngCastService;
            this.window['__onGCastApiAvailable'] = function (isAvailable) {
                if (isAvailable) {
                    ngCastService.initializeCastApi();
                }
            };
            this.castingStatus = this.ngCastService.getStatus();
        };
        NgCastComponent.prototype.openSession = function () {
            this.ngCastService.discoverDevices();
        };
        NgCastComponent.prototype.closeSession = function () {
            this.ngCastService.discoverDevices();
        };
        return NgCastComponent;
    }());
    __decorate([
        core.Input()
    ], exports.ɵa.prototype, "videoImage", void 0);
    __decorate([
        core.Input()
    ], exports.ɵa.prototype, "imageOffline", void 0);
    __decorate([
        core.Input()
    ], exports.ɵa.prototype, "srcImageOffline", void 0);
    exports.ɵa = __decorate([
        core.Component({
            selector: 'ng-cast',
            template: "<div *ngIf=\"!imageOffline\" id=\"main_video\">\n  <div class=\"imageSub\"> <!-- Put Your Image Width -->\n     <div class=\"blackbg\" id=\"playerstatebg\">IDLE</div>\n     <div class=label id=\"playerstate\">IDLE</div>\n     <img [src]=\"videoImage\" id=\"video_image\">\n     <div id=\"video_image_overlay\"></div>\n     <video id=\"video_element\">\n     </video>\n  </div>\n\n  <div id=\"media_control\">\n     <div id=\"play\"></div>\n     <div id=\"pause\"></div>\n     <div id=\"progress_bg\"></div>\n     <div id=\"progress\"></div>\n     <div id=\"progress_indicator\"></div>\n     <div id=\"fullscreen_expand\"></div>\n     <div id=\"fullscreen_collapse\"></div>\n     <google-cast-launcher id=\"castbutton\"></google-cast-launcher>\n     <div id=\"audio_bg\"></div>\n     <div id=\"audio_bg_track\"></div>\n     <div id=\"audio_indicator\"></div>\n     <div id=\"audio_bg_level\"></div>\n     <div id=\"audio_on\"></div>\n     <div id=\"audio_off\"></div>\n     <div id=\"duration\">00:00:00</div>\n  </div>\n</div>\n<div *ngIf=\"!imageOffline\" id=\"media_info\">\n  <div id=\"media_title\">\n  </div>\n  <div id=\"media_subtitle\">\n  </div>\n  <div id=\"media_desc\">\n  </div>\n</div>\n\n<div *ngIf=\"!imageOffline\" id=\"carousel\">\n</div>\n\n<img \n  width=\"100%\" \n  *ngIf=\"imageOffline\" \n  [src]=\"srcImageOffline\"\n  alt=\"TV Offline\"\n/>\n",
            styles: ["body{background-color:#f2f2f2;font-family:Roboto,OpenSans,Verdana,Georgia,Serif}#msg{-webkit-transition:opacity 0 2s;color:#fff;display:none;font-size:90%;font-weight:400;margin-left:200px;transition:opacity 0 2s}#top_header_bar{background-image:url(/assets/imagefiles/header_bg-top.png);background-repeat:repeat-x;height:10px;margin:0;width:100%}#top_header{background-image:url(/assets/imagefiles/header_bg.png);height:71px;z-index:1000}#footer,#top_header{background-repeat:repeat-x;float:left;margin:0;width:100%}#footer{background-image:url(/assets/imagefiles/footer_bg.png);height:81px}#copyright{width:300px}#copyright,#footer_content{color:#fff;float:left;font-size:13px;margin:10px}#footer_content{width:400px}#footer_content_link{color:#fff}#footer_language{color:#fff;float:right;font-size:13px;margin:10px;width:200px}#logo{background-image:url(/assets/imagefiles/logo.png);float:left;height:71px;margin:10px 25px 0;width:201px}.header_tab{-moz-transition:all .6s ease-in-out;-o-transition:all .6s ease-in-out;-webkit-transition:all .6s ease-in-out;float:left;font-family:Roboto,OpenSans;font-size:20px;font-weight:700;height:31px;margin-top:10px;padding:20px}#title_text{text-align:center;width:100%}#main_video{float:left;width:100%}#video_image{height:536px;margin-bottom:0;margin-right:auto;margin-top:20px;width:100%}#video_image_overlay{background:linear-gradient(0deg,rgba(0,0,0,.9),transparent 72%,transparent);margin-right:0;margin-top:0;position:absolute;z-index:0}#video_element,#video_image_overlay{display:none;height:540px;margin-bottom:0;width:100%}#video_element{background-color:#000;margin-right:auto;margin-top:20px}#media_info{background-color:#dde0e5;clear:both;color:#000;display:block;float:left;height:116px;margin-top:10px;opacity:.9;padding:10px;width:100%}#media_title{font-size:30px;font-weight:700;margin:0 10px 0 0}#media_subtitle,#media_title{float:left;font-family:Roboto,Open Sans,Verdana,Georgia,Serif;padding:0}#media_subtitle{font-size:18px;margin:13px 0 0 30px}#media_desc{float:left;font-size:12px;margin:5px}#media_control,#media_desc{font-family:Roboto,Open Sans,Verdana,Georgia,Serif;width:100%}#media_control{-webkit-transition:opacity 1s;background-color:#000;height:60px;opacity:.7;padding:0;position:absolute;top:595px;transition:opacity 1s;z-index:1000}#media_control:hover{opacity:.7}#play{background-image:url(/assets/imagefiles/play.png);float:left;height:40px;margin:10px 20px 10px 10px;width:65px}#play:hover{background-image:url(/assets/imagefiles/play-hover.png)}#play:press{background-image:url(/assets/imagefiles/play-press.png)}#pause{background-image:url(/assets/imagefiles/pause.png);display:none;float:left;height:40px;margin:10px 20px 10px 10px;width:65px}#pause:hover{background-image:url(/assets/imagefiles/pause-hover.png)}.button{font-family:Roboto,Open Sans,Verdana,Georgia,Serif;font-size:100%;margin:5px}.volume{margin-left:8px;width:60px}#muteText{margin-left:3px;width:30px}.muteButton{font-family:Roboto,Open Sans,Verdana,Georgia,Serif;font-size:110%}.imageIcon{padding:3px 0 0;width:25px}#progress{background-image:url(/assets/imagefiles/timeline_bg_progress.png);width:1px;z-index:10}#progress,#progress_indicator{background-repeat:repeat-x;cursor:pointer;float:left;height:36px;margin:20px 0 10px -620px}#progress_indicator{background-image:url(/assets/imagefiles/timeline_indicator.png);width:6px;z-index:1000}#progress_bg{background-image:url(/assets/imagefiles/timeline_bg_track.png);background-repeat:repeat-x;cursor:pointer;float:left;height:36px;margin:20px 20px 10px 0;width:600px}#castbutton{background-color:#000;border:none;float:right;height:32px;margin:10px 6px 14px 0;opacity:.7;outline:none;width:40px}#castbutton:hover{--connected-color:#fff;--disconnected-color:#fff}#audio_off{background-image:url(/assets/imagefiles/audio_off.png);display:none}#audio_off,#audio_on{float:right;height:32px;margin:10px 4px 10px 0;width:32px}#audio_on{background-image:url(/assets/imagefiles/audio_on.png);display:block}#audio_bg{background-image:url(/assets/imagefiles/audio_bg.png);height:124px;margin:-115px 8px -10px 0;opacity:.1;width:41px;z-index:10}#audio_bg,#audio_bg_track{display:block;float:right;position:relative}#audio_bg_track{background-image:url(/assets/imagefiles/audio_bg_track.png);height:100px;margin:-100px 20px -30px 0;opacity:0;width:16px;z-index:1000}#audio_indicator{background-image:url(/assets/imagefiles/audio_indicator.png);display:none;height:5px}#audio_bg_level,#audio_indicator{float:right;margin:-50px 20px -30px 0;opacity:0;position:relative;width:16px;z-index:1000}#audio_bg_level{background-image:url(/assets/imagefiles/audio_bg_level.png);display:block;height:50px}#fullscreen_expand{background-image:url(/assets/imagefiles/fullscreen_expand.png);display:block}#fullscreen_collapse,#fullscreen_expand{cursor:pointer;float:right;height:32px;margin:10px 20px 10px 0;width:32px}#fullscreen_collapse{background-image:url(/assets/imagefiles/fullscreen_collapse.png);display:none}#duration{color:#fff;display:block;float:right;height:32px;margin:18px 15px 10px;width:60px}div.imageSub{position:relative}div.imageSub img{z-index:1}div.imageSub div{bottom:0;left:0;padding:0;position:absolute;right:0}div.imageSub div.blackbg{-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)\";background-color:#000;color:#000;filter:alpha(opacity=50);opacity:.5;z-index:2000}div.imageSub div.blackbg,div.imageSub div.label{bottom:60px;display:none;font-size:120%;height:30px;left:300px;padding:10px;width:400px}div.imageSub div.label{color:#fff;z-index:3000}#carousel{margin:20px 10px 10px 40px;width:990px}.thumb{cursor:pointer;float:left;margin:10px 10px 10px 0}.thumbnail{height:127px;margin-right:10px;width:225px}.vertical{-webkit-transform:rotate(90deg)}"]
        })
    ], exports.ɵa);

    exports.NgCastService = /** @class */ (function () {
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
                var subj = new rxjs.Subject();
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
                var script = window['document'].createElement('script');
                script.setAttribute('type', 'text/javascript');
                script.setAttribute('src', 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1');
                window['document'].body.appendChild(script);
                globalThis.CastPlayer.mediaJSON.categories = categories;
                return globalThis.CastPlayer.addMediaContents();
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
            globalThis.CastPlayer.mediaJSON = {
                categories: []
            };
        }
        NgCastService.prototype.initializeCastApi = function () {
            var _this = this;
            this.cast = this.window['chrome'].cast;
            var sessionRequest = new this.cast.SessionRequest('4F8B3483');
            var apiConfig = new this.cast.ApiConfig(sessionRequest, function () { }, function (status) { if (status === _this.cast.ReceiverAvailability.AVAILABLE) { } });
            var x = this.cast.initialize(apiConfig, this.onInitSuccess, this.onError);
        };
        ;
        NgCastService.prototype.initialize = function (mediaContents) {
            if (mediaContents) {
                globalThis.CastPlayer.initializeUI();
                globalThis.CastPlayer.setupLocalPlayer();
                globalThis.CastPlayer.initializeCastPlayer();
            }
        };
        NgCastService.prototype.setCasting = function (value) {
            this.status.casting = value;
            globalThis.CastPlayer.setupRemotePlayer();
        };
        NgCastService.prototype.getStatus = function () {
            return this.status;
        };
        return NgCastService;
    }());
    exports.NgCastService = __decorate([
        core.Injectable()
    ], exports.NgCastService);

    exports.NgCastModule = /** @class */ (function () {
        function NgCastModule() {
        }
        return NgCastModule;
    }());
    exports.NgCastModule = __decorate([
        core.NgModule({
            schemas: [core.CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                common.CommonModule
            ],
            exports: [exports.ɵa],
            providers: [exports.NgCastService],
            declarations: [exports.ɵa]
        })
    ], exports.NgCastModule);

    "use strict";
    /** @const {string} Media source root URL */
    var MEDIA_SOURCE_ROOT = '';
    /**
     * Width of progress bar in pixel
     * @const
     */
    var PROGRESS_BAR_WIDTH = 600;
    /** @const {number} Time in milliseconds for minimal progress update */
    var TIMER_STEP = 1000;
    /** @const {number} Cast volume upon initial connection */
    var DEFAULT_VOLUME = 0.5;
    /** @const {number} Height, in pixels, of volume bar */
    var FULL_VOLUME_HEIGHT = 100;
    /** @enum {string} Constants of states for media for both local and remote playback */
    var PLAYER_STATE = {
        // No media is loaded into the player. For remote playback, maps to
        // the PlayerState.IDLE state.
        IDLE: 'IDLE',
        LOADING: 'LOADING',
        // Player is in PLAY mode but not actively playing content. For remote
        // playback, maps to the PlayerState.BUFFERING state.
        BUFFERING: 'BUFFERING',
        // The media is loaded but not playing.
        LOADED: 'LOADED',
        // The media is playing. For remote playback, maps to the PlayerState.PLAYING state.
        PLAYING: 'PLAYING',
        // The media is paused. For remote playback, maps to the PlayerState.PAUSED state.
        PAUSED: 'PAUSED',
        STOPPED: 'STOPPED',
        ERROR: 'ERROR'
    };
    /**
     * Cast player object
     * Main variables:
     *  - PlayerHandler object for handling media playback
     *  - Cast player variables for controlling Cast mode media playback
     *  - Current media variables for transition between Cast and local modes
     *  - Current ad variables for controlling UI based on ad playback
     *  - Current live variables for controlling UI based on ad playback
     * @struct @constructor
     */
    var CastPlayer = function () {
        /** @type {PlayerHandler} Delegation proxy for media playback */
        this.playerHandler = new PlayerHandler(this);
        /** @type {PLAYER_STATE} A state for media playback */
        this.playerState = PLAYER_STATE.IDLE;
        /**
         * @type {PLAYER_STATE} Player state before switching between local and
         * remote playback.
         */
        this.playerStateBeforeSwitch = null;
        /* Cast player variables */
        /** @type {cast.framework.RemotePlayer} */
        this.remotePlayer = null;
        /** @type {cast.framework.RemotePlayerController} */
        this.remotePlayerController = null;
        /* Local+Remote player variables */
        /** @type {number} A number for current time in seconds. Maintained in media time. */
        this.currentMediaTime = 0;
        /**
         * @type {?number} A number for current duration in seconds. Maintained in media time.
         * Null if duration should not be shown.
         */
        this.mediaDuration = -1;
        /** @type {?number} A timer for tracking progress of media */
        this.timer = null;
        /** @type {function()} Listener for handling current time increments */
        this.incrementMediaTimeHandler = this.incrementMediaTime.bind(this);
        /** @type {function()} Listener to be added/removed for the seek action */
        this.seekMediaListener = this.seekMedia.bind(this);
        /* Local player variables */
        /** @type {number} A number for current media index */
        this.currentMediaIndex = 0;
        /** @type {?Object} media contents from JSON */
        this.mediaContents = null;
        /** @type {boolean} Fullscreen mode on/off */
        this.fullscreen = false;
        /* Remote Player variables */
        /** @type {?chrome.cast.media.MediaInfo} Current mediaInfo */
        this.mediaInfo = null;
        /* Ad variables */
        /**
         * @type {?number} The time in seconds when the break clip becomes skippable.
         * 5 means that the end user can skip this break clip after 5 seconds. If
         * negative or not defined, it means that the current break clip is not skippable.
         */
        this.whenSkippable = null;
        /* Live variables */
        /** @type {?chrome.cast.media.LiveSeekableRange} Seekable range for live content */
        this.liveSeekableRange = null;
        /** @type {boolean} Remote player is playing live content. */
        this.isLiveContent = false;
        this.mediaJSON = {
            'categories': []
        };
    };
    CastPlayer.prototype.initializeCastPlayer = function () {
        var options = {};
        // Set the receiver application ID to your own (created in the
        // Google Cast Developer Console), or optionally
        // use the chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
        options.receiverApplicationId = '4F8B3483';
        // Auto join policy can be one of the following three:
        // ORIGIN_SCOPED - Auto connect from same appId and page origin
        // TAB_AND_ORIGIN_SCOPED - Auto connect from same appId, page origin, and tab
        // PAGE_SCOPED - No auto connect
        options.autoJoinPolicy = chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED;
        cast.framework.CastContext.getInstance().setOptions(options);
        castPlayer.remotePlayer = new cast.framework.RemotePlayer();
        castPlayer.remotePlayerController = new cast.framework.RemotePlayerController(castPlayer.remotePlayer);
        castPlayer.remotePlayerController.addEventListener(cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED, castPlayer.switchPlayer.bind(castPlayer));
    };
    /**
     * Switch between the remote and local players.
     */
    CastPlayer.prototype.switchPlayer = function () {
        castPlayer.stopProgressTimer();
        castPlayer.resetVolumeSlider();
        castPlayer.playerHandler.stop();
        castPlayer.playerState = PLAYER_STATE.IDLE;
        if (cast && cast.framework) {
            if (castPlayer.remotePlayer.isConnected) {
                castPlayer.setupRemotePlayer();
                return;
            }
        }
        castPlayer.setupLocalPlayer();
    };
    /**
     * PlayerHandler
     *
     * This is a handler through which the application will interact
     * with both the RemotePlayer and LocalPlayer. Combining these two into
     * one interface is one approach to the dual-player nature of a Cast
     * Chrome application. Otherwise, the state of the RemotePlayer can be
     * queried at any time to decide whether to interact with the local
     * or remote players.
     *
     * To set the player used, implement the following methods for a target object
     * and call setTarget(target).
     *
     * Methods to implement:
     *  - play()
     *  - pause()
     *  - stop()
     *  - seekTo(time)
     *  - load(mediaIndex)
     *  - isMediaLoaded(mediaIndex)
     *  - prepareToPlay()
     *  - getMediaDuration()
     *  - getCurrentMediaTime()
     *  - setVolume(volumeSliderPosition)
     *  - mute()
     *  - unMute()
     *  - isMuted()
     *  - updateDisplay()
     *  - updateCurrentTimeDisplay()
     *  - updateDurationDisplay()
     *  - setTimeString(element, time)
     */
    var PlayerHandler = function (castPlayer) {
        this.target = {};
        this.setTarget = function (target) {
            this.target = target;
        };
        this.play = function () {
            if (castPlayer.playerState !== PLAYER_STATE.PLAYING &&
                castPlayer.playerState !== PLAYER_STATE.PAUSED &&
                castPlayer.playerState !== PLAYER_STATE.LOADED) {
                this.load(castPlayer.currentMediaIndex);
                return;
            }
            this.target.play();
            castPlayer.playerState = PLAYER_STATE.PLAYING;
            document.getElementById('play').style.display = 'none';
            document.getElementById('pause').style.display = 'block';
            this.updateDisplayMessage();
        };
        this.updateDisplayMessage = function () {
            this.target.updateDisplayMessage();
        };
        this.pause = function () {
            this.target.pause();
            castPlayer.playerState = PLAYER_STATE.PAUSED;
            document.getElementById('play').style.display = 'block';
            document.getElementById('pause').style.display = 'none';
        };
        this.stop = function () {
            castPlayer.playerState = PLAYER_STATE.IDLE;
            this.target.stop();
        };
        this.load = function (mediaIndex) {
            if (mediaIndex === void 0) { mediaIndex = null; }
            if (!mediaIndex) {
                mediaIndex = castPlayer.currentMediaIndex;
            }
            castPlayer.playerState = PLAYER_STATE.BUFFERING;
            this.target.load(mediaIndex);
        };
        /**
         * Check if media has been loaded on the target player.
         * @param {number?} mediaIndex The desired media index. If null, verify if
         *  any media is loaded.
         */
        this.isMediaLoaded = function (mediaIndex) {
            return this.target.isMediaLoaded(mediaIndex);
        };
        /**
         * Called after media has been successfully loaded and is ready to start playback.
         * When local, will start playing the video, start the timer, and update the UI.
         * When remote, will set the UI to PLAYING and start the timer to update the
         *   UI based on remote playback.
         */
        this.prepareToPlay = function () {
            castPlayer.mediaDuration = this.getMediaDuration();
            castPlayer.playerHandler.updateDurationDisplay();
            castPlayer.playerState = PLAYER_STATE.LOADED;
            this.play();
            castPlayer.startProgressTimer();
            this.updateDisplay();
        };
        this.loaded = function () {
            castPlayer.currentMediaDuration = this.getMediaDuration();
            castPlayer.updateMediaDuration();
            castPlayer.playerState = PLAYER_STATE.LOADED;
            if (castPlayer.currentMediaTime > 0) {
                this.seekTo(castPlayer.currentMediaTime);
            }
            this.play();
            castPlayer.startProgressTimer();
            this.updateDisplayMessage();
        };
        this.getCurrentMediaTime = function () {
            return this.target.getCurrentMediaTime();
        };
        this.getMediaDuration = function () {
            return this.target.getMediaDuration();
        };
        this.updateDisplay = function () {
            // Update local variables
            this.currentMediaTime = this.target.getCurrentMediaTime();
            this.mediaDuration = this.target.getMediaDuration();
            this.target.updateDisplay();
        };
        this.updateCurrentTimeDisplay = function () {
            this.target.updateCurrentTimeDisplay();
        };
        /**
         * Determines the correct time string (media or clock) and sets it for the given element.
         */
        this.setTimeString = function (element, time) {
            this.target.setTimeString(element, time);
        };
        this.setVolume = function (volumeSliderPosition) {
            this.target.setVolume(volumeSliderPosition);
        };
        this.mute = function () {
            this.target.mute();
            document.getElementById('audio_on').style.display = 'none';
            document.getElementById('audio_off').style.display = 'block';
        };
        this.unMute = function () {
            this.target.unMute();
            document.getElementById('audio_on').style.display = 'block';
            document.getElementById('audio_off').style.display = 'none';
        };
        this.isMuted = function () {
            return this.target.isMuted();
        };
        this.seekTo = function (time) {
            this.target.seekTo(time);
        };
    };
    /**
     * Set the PlayerHandler target to use the video-element player
     */
    CastPlayer.prototype.setupLocalPlayer = function () {
        var localPlayer = document.getElementById('video_element');
        localPlayer.addEventListener('loadeddata', castPlayer.onMediaLoadedLocally.bind(castPlayer));
        // This object will implement PlayerHandler callbacks with localPlayer
        var playerTarget = {};
        playerTarget.play = function () {
            localPlayer.play();
            var vi = document.getElementById('video_image');
            vi.style.display = 'none';
            localPlayer.style.display = 'block';
        };
        playerTarget.pause = function () {
            localPlayer.pause();
        };
        playerTarget.stop = function () {
            if (typeof localPlayer.stop === "function")
                localPlayer.stop();
        };
        playerTarget.load = function (mediaIndex) {
            localPlayer.src =
                castPlayer.mediaContents[mediaIndex]['sources'][0];
            localPlayer.load();
        }.bind(castPlayer);
        playerTarget.getCurrentMediaTime = function () {
            return localPlayer.currentTime;
        };
        playerTarget.getMediaDuration = function () {
            return localPlayer.duration;
        };
        playerTarget.updateDisplayMessage = function () {
            document.getElementById('playerstate').style.display = 'none';
            document.getElementById('playerstatebg').style.display = 'none';
            document.getElementById('video_image_overlay').style.display = 'none';
        };
        playerTarget.setVolume = function (volumeSliderPosition) {
            localPlayer.volume = volumeSliderPosition < FULL_VOLUME_HEIGHT ?
                volumeSliderPosition / FULL_VOLUME_HEIGHT : 1;
            var p = document.getElementById('audio_bg_level');
            p.style.height = volumeSliderPosition + 'px';
            p.style.marginTop = -volumeSliderPosition + 'px';
        };
        playerTarget.mute = function () {
            localPlayer.muted = true;
        };
        playerTarget.unMute = function () {
            localPlayer.muted = false;
        };
        playerTarget.isMuted = function () {
            return localPlayer.muted;
        };
        playerTarget.seekTo = function (time) {
            localPlayer.currentTime = time;
        };
        castPlayer.playerHandler.setTarget(playerTarget);
        castPlayer.playerHandler.setVolume(DEFAULT_VOLUME * FULL_VOLUME_HEIGHT);
        castPlayer.showFullscreenButton();
        if (castPlayer.currentMediaTime > 0) {
            castPlayer.playerHandler.play();
        }
    };
    /**
     * Set the PlayerHandler target to use the remote player
     * Add event listeners for player changes which may occur outside sender app.
     */
    CastPlayer.prototype.setupRemotePlayer = function () {
        var castSession = cast.framework.CastContext.getInstance().getCurrentSession();
        // Add event listeners for player changes which may occur outside sender app
        castPlayer.remotePlayerController.addEventListener(cast.framework.RemotePlayerEventType.IS_PAUSED_CHANGED, function () {
            if (castPlayer.remotePlayer.isPaused) {
                castPlayer.playerHandler.pause();
            }
            else {
                castPlayer.playerHandler.play();
            }
        }.bind(castPlayer));
        castPlayer.remotePlayerController.addEventListener(cast.framework.RemotePlayerEventType.IS_MUTED_CHANGED, function () {
            if (castPlayer.remotePlayer.isMuted) {
                castPlayer.playerHandler.mute();
            }
            else {
                castPlayer.playerHandler.unMute();
            }
        }.bind(castPlayer));
        castPlayer.remotePlayerController.addEventListener(cast.framework.RemotePlayerEventType.VOLUME_LEVEL_CHANGED, function () {
            var newVolume = castPlayer.remotePlayer.volumeLevel * FULL_VOLUME_HEIGHT;
            var p = document.getElementById('audio_bg_level');
            p.style.height = newVolume + 'px';
            p.style.marginTop = -newVolume + 'px';
        }.bind(castPlayer));
        // castPlayer object will implement PlayerHandler callbacks with
        // remotePlayerController, and makes necessary UI updates specific
        // to remote playback
        var playerTarget = {};
        playerTarget.play = function () {
            if (castPlayer.remotePlayer.isPaused) {
                castPlayer.remotePlayerController.playOrPause();
            }
            var vi = document.getElementById('video_image');
            vi.style.display = 'block';
            var localPlayer = document.getElementById('video_element');
            localPlayer.style.display = 'none';
        }.bind(castPlayer);
        playerTarget.pause = function () {
            if (!castPlayer.remotePlayer.isPaused) {
                castPlayer.remotePlayerController.playOrPause();
            }
        }.bind(castPlayer);
        playerTarget.stop = function () {
            castPlayer.remotePlayerController.stop();
        }.bind(castPlayer);
        playerTarget.load = function (mediaIndex) {
            console.log('Loading...' + castPlayer.mediaContents[mediaIndex]['title']);
            var mediaInfo = new chrome.cast.media.MediaInfo(castPlayer.mediaContents[mediaIndex]['sources'][0], 'video/mp4');
            mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
            mediaInfo.metadata.metadataType = chrome.cast.media.MetadataType.GENERIC;
            mediaInfo.metadata.title = castPlayer.mediaContents[mediaIndex]['title'];
            mediaInfo.metadata.images = [
                { 'url': MEDIA_SOURCE_ROOT + castPlayer.mediaContents[mediaIndex]['thumb'] }
            ];
            var request = new chrome.cast.media.LoadRequest(mediaInfo);
            castSession.loadMedia(request).then(castPlayer.playerHandler.loaded.bind(castPlayer.playerHandler), function (errorCode) {
                castPlayer.playerState = PLAYER_STATE.ERROR;
                console.log('Remote media load error: ' +
                    CastPlayer.getErrorMessage(errorCode));
            }.bind(castPlayer));
        }.bind(castPlayer);
        playerTarget.getCurrentMediaTime = function () {
            return castPlayer.remotePlayer.currentTime;
        }.bind(castPlayer);
        playerTarget.getMediaDuration = function () {
            return castPlayer.remotePlayer.duration;
        }.bind(castPlayer);
        playerTarget.updateDisplayMessage = function () {
            document.getElementById('playerstate').style.display = 'block';
            document.getElementById('playerstatebg').style.display = 'block';
            document.getElementById('video_image_overlay').style.display = 'block';
            document.getElementById('playerstate').innerHTML =
                castPlayer.mediaContents[castPlayer.currentMediaIndex]['title'] + ' ' +
                    castPlayer.playerState + ' on ' + castSession.getCastDevice().friendlyName;
        }.bind(castPlayer);
        playerTarget.setVolume = function (volumeSliderPosition) {
            // Add resistance to avoid loud volume
            var currentVolume = castPlayer.remotePlayer.volumeLevel;
            var p = document.getElementById('audio_bg_level');
            if (volumeSliderPosition < FULL_VOLUME_HEIGHT) {
                var vScale = castPlayer.currentVolume * FULL_VOLUME_HEIGHT;
                if (volumeSliderPosition > vScale) {
                    volumeSliderPosition = vScale + (pos - vScale) / 2;
                }
                p.style.height = volumeSliderPosition + 'px';
                p.style.marginTop = -volumeSliderPosition + 'px';
                currentVolume = volumeSliderPosition / FULL_VOLUME_HEIGHT;
            }
            else {
                currentVolume = 1;
            }
            castPlayer.remotePlayer.volumeLevel = currentVolume;
            castPlayer.remotePlayerController.setVolumeLevel();
        }.bind(castPlayer);
        playerTarget.mute = function () {
            if (!castPlayer.remotePlayer.isMuted) {
                castPlayer.remotePlayerController.muteOrUnmute();
            }
        }.bind(castPlayer);
        playerTarget.unMute = function () {
            if (castPlayer.remotePlayer.isMuted) {
                castPlayer.remotePlayerController.muteOrUnmute();
            }
        }.bind(castPlayer);
        playerTarget.isMuted = function () {
            return castPlayer.remotePlayer.isMuted;
        }.bind(castPlayer);
        playerTarget.seekTo = function (time) {
            castPlayer.remotePlayer.currentTime = time;
            castPlayer.remotePlayerController.seek();
        }.bind(castPlayer);
        castPlayer.playerHandler.setTarget(playerTarget);
        // Setup remote player volume right on setup
        // The remote player may have had a volume set from previous playback
        if (castPlayer.remotePlayer.isMuted) {
            castPlayer.playerHandler.mute();
        }
        var currentVolume = castPlayer.remotePlayer.volumeLevel * FULL_VOLUME_HEIGHT;
        var p = document.getElementById('audio_bg_level');
        p.style.height = currentVolume + 'px';
        p.style.marginTop = -currentVolume + 'px';
        castPlayer.hideFullscreenButton();
        castPlayer.playerHandler.play();
    };
    /**
     * Callback when media is loaded in local player
     */
    CastPlayer.prototype.onMediaLoadedLocally = function () {
        var localPlayer = document.getElementById('video_element');
        localPlayer.currentTime = castPlayer.currentMediaTime;
        castPlayer.playerHandler.loaded();
    };
    /**
     * Select a media content
     * @param {number} mediaIndex A number for media index
     */
    CastPlayer.prototype.selectMedia = function (mediaIndex) {
        console.log('Media index selected: ' + mediaIndex);
        castPlayer.currentMediaIndex = mediaIndex;
        // Clear currentMediaInfo when playing content from the sender.
        castPlayer.playerHandler.currentMediaInfo = undefined;
        // Set video image
        var vi = document.getElementById('video_image');
        vi.src = MEDIA_SOURCE_ROOT + castPlayer.mediaContents[mediaIndex]['thumb'];
        // Reset progress bar
        var pi = document.getElementById('progress_indicator');
        pi.style.marginLeft = '0px';
        var progress = document.getElementById('progress');
        progress.style.width = '0px';
        var seekable_window = document.getElementById('seekable_window');
        var unseekable_overlay = document.getElementById('unseekable_overlay');
        seekable_window.style.width = PROGRESS_BAR_WIDTH;
        unseekable_overlay.style.width = '0px';
        // Stop timer and reset time displays
        castPlayer.stopProgressTimer();
        castPlayer.currentMediaTime = 0;
        castPlayer.playerHandler.setTimeString(document.getElementById('currentTime'), 0);
        castPlayer.playerHandler.setTimeString(document.getElementById('duration'), 0);
        castPlayer.playerState = PLAYER_STATE.IDLE;
        castPlayer.playerHandler.play();
    };
    /**
     * Media seek function
     * @param {Event} event An event object from seek
     */
    CastPlayer.prototype.seekMedia = function (event) {
        if (castPlayer.mediaDuration == null || (cast.framework.CastContext.getInstance().getCurrentSession() && !castPlayer.remotePlayer.canSeek)) {
            console.log('Error - Not seekable');
            return;
        }
        if (castPlayer.isLiveContent && !castPlayer.liveSeekableRange) {
            console.log('Live content has no seekable range.');
            return;
        }
        var position = parseInt(event.offsetX, 10);
        var pi = document.getElementById('progress_indicator');
        var progress = document.getElementById('progress');
        var seekTime = 0;
        var pp = 0;
        var pw = 0;
        if (event.currentTarget.id == 'progress_indicator') {
            seekTime = parseInt(castPlayer.currentMediaTime + castPlayer.mediaDuration * position /
                PROGRESS_BAR_WIDTH, 10);
            pp = parseInt(pi.style.marginLeft, 10) + position;
            pw = parseInt(progress.style.width, 10) + position;
        }
        else {
            seekTime = parseInt(position * castPlayer.mediaDuration / PROGRESS_BAR_WIDTH, 10);
            pp = position;
            pw = position;
        }
        if (castPlayer.playerState === PLAYER_STATE.PLAYING ||
            castPlayer.playerState === PLAYER_STATE.PAUSED) {
            castPlayer.currentMediaTime = seekTime;
            progress.style.width = pw + 'px';
            pi.style.marginLeft = pp + 'px';
        }
        if (castPlayer.isLiveContent) {
            seekTime += castPlayer.mediaInfo.metadata.sectionStartTimeInMedia;
        }
        castPlayer.playerHandler.seekTo(seekTime);
    };
    /**
     * Set current player volume
     * @param {Event} mouseEvent
     */
    CastPlayer.prototype.setVolume = function (mouseEvent) {
        var p = document.getElementById('audio_bg_level');
        var pos = 0;
        if (mouseEvent.currentTarget.id === 'audio_bg_track') {
            pos = FULL_VOLUME_HEIGHT - parseInt(mouseEvent.offsetY, 10);
        }
        else {
            pos = parseInt(p.clientHeight, 10) - parseInt(mouseEvent.offsetY, 10);
        }
        castPlayer.playerHandler.setVolume(pos);
    };
    /**
     * Starts the timer to increment the media progress bar
     */
    CastPlayer.prototype.startProgressTimer = function () {
        castPlayer.stopProgressTimer();
        // Start progress timer
        castPlayer.timer = setInterval(castPlayer.incrementMediaTimeHandler, TIMER_STEP);
    };
    /**
     * Stops the timer to increment the media progress bar
     */
    CastPlayer.prototype.stopProgressTimer = function () {
        if (castPlayer.timer) {
            clearInterval(castPlayer.timer);
            castPlayer.timer = null;
        }
    };
    /**
     * Increment media current time depending on remote or local playback
     */
    CastPlayer.prototype.incrementMediaTime = function () {
        // First sync with the current player's time
        castPlayer.currentMediaTime = castPlayer.playerHandler.getCurrentMediaTime();
        castPlayer.currentMediaDuration = castPlayer.playerHandler.getMediaDuration();
        if (castPlayer.playerState === PLAYER_STATE.PLAYING) {
            if (castPlayer.currentMediaTime < castPlayer.currentMediaDuration) {
                castPlayer.currentMediaTime += 1;
                castPlayer.updateProgressBarByTimer();
            }
            else {
                castPlayer.endPlayback();
            }
        }
    };
    /**
     * Update progress bar and currentTime based on timer
     */
    CastPlayer.prototype.updateProgressBarByTimer = function () {
        var p = document.getElementById('progress');
        if (isNaN(parseInt(p.style.width, 10))) {
            p.style.width = 0;
        }
        if (castPlayer.currentMediaDuration > 0) {
            var pp = Math.floor(PROGRESS_BAR_WIDTH * castPlayer.currentMediaTime / castPlayer.currentMediaDuration);
        }
        p.style.width = pp + 'px';
        var pi = document.getElementById('progress_indicator');
        pi.style.marginLeft = -21 - PROGRESS_BAR_WIDTH + pp + 'px';
        if (pp >= PROGRESS_BAR_WIDTH) {
            castPlayer.endPlayback();
        }
    };
    /**
     *  End playback. Called when media ends.
     */
    CastPlayer.prototype.endPlayback = function () {
        castPlayer.currentMediaTime = 0;
        castPlayer.stopProgressTimer();
        castPlayer.playerState = PLAYER_STATE.IDLE;
        castPlayer.playerHandler.updateDisplay();
        var play = document.getElementById('play');
        if (play && play.style && play.display)
            play.style.display = 'block';
        var pause = document.getElementById('pause');
        if (pause && pause.style && pause.style.display)
            pause.style.display = 'none';
    };
    /**
     * @param {?number} timestamp Linux timestamp
     * @return {?string} media time string. Null if time is invalid.
     */
    CastPlayer.prototype.getMediaTimeString = function (timestamp) {
        if (timestamp == undefined || timestamp == null) {
            return null;
        }
        var isNegative = false;
        if (timestamp < 0) {
            isNegative = true;
            timestamp *= -1;
        }
        var hours = Math.floor(timestamp / 3600);
        var minutes = Math.floor((timestamp - (hours * 3600)) / 60);
        var seconds = Math.floor(timestamp - (hours * 3600) - (minutes * 60));
        if (hours < 10)
            hours = '0' + hours;
        if (minutes < 10)
            minutes = '0' + minutes;
        if (seconds < 10)
            seconds = '0' + seconds;
        return (isNegative ? '-' : '') + hours + ':' + minutes + ':' + seconds;
    };
    /**
     * @param {number} timestamp Linux timestamp
     * @return {?string} ClockTime string. Null if time is invalid.
     */
    CastPlayer.prototype.getClockTimeString = function (timestamp) {
        if (!timestamp)
            return "0:00:00";
        var date = new Date(timestamp * 1000);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        // Hour '0' should be '12'
        hours = hours ? hours : 12;
        minutes = ('0' + minutes).slice(-2);
        seconds = ('0' + seconds).slice(-2);
        var clockTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
        return clockTime;
    };
    /**
     * Updates Ad markers in UI
     */
    CastPlayer.prototype.updateAdMarkers = function () {
        var castSession = cast.framework.CastContext.getInstance().getCurrentSession();
        if (!castSession)
            return;
        var media = castSession.getMediaSession();
        if (!media)
            return;
        var mediaInfo = media.media;
        if (!mediaInfo)
            return;
        var breaks = mediaInfo.breaks;
        var contentDuration = mediaInfo.duration;
        if (!breaks) {
            return;
        }
        for (var i = 0; i < breaks.length; i++) {
            var adBreak = breaks[i];
            // Server-side stitched Ads (embedded) are skipped when the position is beyond
            // the duration, so they shouldn't be shown with an ad marker on the UI.
            if (adBreak.position > contentDuration && adBreak.isEmbedded) {
                continue;
            }
            // Place marker if not already set in position
            if (!document.getElementById('ad' + adBreak.position)) {
                var div = document.getElementById('progress');
                div.innerHTML += '<div class="adMarker" id="ad' + adBreak.position +
                    '" style="margin-left: ' +
                    castPlayer.adPositionToMargin(adBreak.position, contentDuration) + 'px"></div>';
            }
        }
    };
    /**
     * Remove Ad markers in UI
     */
    CastPlayer.prototype.removeAdMarkers = function () {
        document.querySelectorAll('.adMarker').forEach(function (adMarker) {
            adMarker.remove();
        });
    };
    /**
     * Position of the ad marker from the margin
     */
    CastPlayer.prototype.adPositionToMargin = function (position, contentDuration) {
        // Post-roll
        if (position == -1) {
            return PROGRESS_BAR_WIDTH;
        }
        // Client stitched Ads (not embedded) beyond the duration, will play at the
        // end of the content.
        if (position > contentDuration) {
            return PROGRESS_BAR_WIDTH;
        }
        // Convert Ad position to margin
        return (PROGRESS_BAR_WIDTH * position) / contentDuration;
    };
    /**
     * Handle BREAK_CLIP_ID_CHANGED event
     */
    CastPlayer.prototype.onBreakClipIdChanged = function () {
        // Hide skip button when switching to a new breakClip
        var skip = document.getElementById('skip');
        if (skip && skip.style && skip.style.display)
            skip.style.display = 'none';
    };
    /**
     * Disable progress bar if playing a break.
     */
    CastPlayer.prototype.isPlayingBreak = function (isPlayingBreak) {
        castPlayer.enableProgressBar(!isPlayingBreak);
    };
    /**
     * Handle WHEN_SKIPPABLE_CHANGED event
     */
    CastPlayer.prototype.onWhenSkippableChanged = function (whenSkippable) {
        castPlayer.whenSkippable = whenSkippable;
    };
    /**
     * Handle CURRENT_BREAK_CLIP_TIME_CHANGED event
     */
    CastPlayer.prototype.onCurrentBreakClipTimeChanged = function (currentBreakClipTime) {
        var skip = document.getElementById('skip');
        // Unskippable
        if (castPlayer.whenSkippable == undefined || castPlayer.whenSkippable < 0) {
            // Hide skip button    
            if (skip && skip.style && skip.style.display)
                skip.style.display = 'none';
        }
        // Skippable
        else if (castPlayer.whenSkippable !== undefined || currentBreakClipTime >= castPlayer.whenSkippable) {
            // Show skip button    
            if (skip && skip.style && skip.style.display)
                skip.style.display = 'block';
        }
        // Not ready to be skipped
        else {
            // Hide skip button
            if (skip && skip.style && skip.style.display)
                skip.style.display = 'none';
        }
    };
    /**
     * Skip the current Ad
     */
    CastPlayer.prototype.skipAd = function () {
        castPlayer.remotePlayerController.skipAd();
    };
    /**
     * Enable/disable progress bar
     */
    CastPlayer.prototype.enableProgressBar = function (enable) {
        var progress = document.getElementById('progress');
        var progress_indicator = document.getElementById('progress_indicator');
        var seekable_window = document.getElementById('seekable_window');
        if (enable) {
            // Enable UI
            progress.style.backgroundImage = "url('./assets/imagefiles/timeline_bg_progress.png')";
            progress.style.cursor = "pointer";
            seekable_window.style.cursor = "pointer";
            progress_indicator.style.cursor = "pointer";
            progress_indicator.draggable = true;
            // Add listeners
            progress.addEventListener('click', castPlayer.seekMediaListener);
            seekable_window.addEventListener('click', castPlayer.seekMediaListener);
            progress_indicator.addEventListener('dragend', castPlayer.seekMediaListener);
        }
        else {
            // Disable UI
            progress.style.backgroundImage = "url('./assets/imagefiles/timeline_bg_buffer.png')";
            progress.style.cursor = "default";
            seekable_window.style.cursor = "default";
            progress_indicator.style.cursor = "default";
            progress_indicator.draggable = false;
            // Remove listeners
            progress.removeEventListener('click', castPlayer.seekMediaListener);
            seekable_window.removeEventListener('click', castPlayer.seekMediaListener);
            progress_indicator.removeEventListener('dragend', castPlayer.seekMediaListener);
        }
    };
    /**
     * Updates media duration text in UI
     */
    CastPlayer.prototype.updateMediaDuration = function () {
        document.getElementById('duration').innerHTML =
            CastPlayer.getDurationString(castPlayer.currentMediaDuration);
    };
    /**
     * @param {number} durationInSec
     * @return {string}
     */
    CastPlayer.getDurationString = function (durationInSec) {
        var durationString = '' + Math.floor(durationInSec % 60);
        var durationInMin = Math.floor(durationInSec / 60);
        if (durationInMin === 0) {
            return durationString;
        }
        durationString = (durationInMin % 60) + ':' + durationString;
        var durationInHour = Math.floor(durationInMin / 60);
        if (durationInHour === 0) {
            return durationString;
        }
        return durationInHour + ':' + durationString;
    };
    /**
     * Request full screen mode
     */
    CastPlayer.prototype.requestFullScreen = function () {
        // Supports most browsers and their versions
        var element = document.getElementById('video_element');
        var requestMethod = element['requestFullScreen'] || element['webkitRequestFullScreen'];
        if (requestMethod) {
            // Native full screen.
            requestMethod.call(element);
            console.log('Requested fullscreen');
        }
    };
    /**
     * Exit full screen mode
     */
    CastPlayer.prototype.cancelFullScreen = function () {
        // Supports most browsers and their versions.
        var requestMethod = document['cancelFullScreen'] || document['webkitCancelFullScreen'];
        if (requestMethod) {
            requestMethod.call(document);
        }
    };
    /**
     * Exit fullscreen mode by escape
     */
    CastPlayer.prototype.fullscreenChangeHandler = function () {
        castPlayer.fullscreen = !castPlayer.fullscreen;
    };
    /**
     * Show expand/collapse fullscreen button
     */
    CastPlayer.prototype.showFullscreenButton = function () {
        var fullscreen_expand = document.getElementById('fullscreen_expand');
        var fullscreen_collapse = document.getElementById('fullscreen_collapse');
        if (castPlayer.fullscreen) {
            if (fullscreen_expand && fullscreen_expand.style && fullscreen_expand.style.display)
                fullscreen_expand.style.display = 'none';
            if (fullscreen_collapse && fullscreen_collapse.style && fullscreen_collapse.style.display)
                fullscreen_collapse.style.display = 'block';
        }
        else {
            if (fullscreen_expand && fullscreen_expand.style && fullscreen_expand.style.display)
                fullscreen_expand.style.display = 'block';
            if (fullscreen_collapse && fullscreen_collapse.style && fullscreen_collapse.style.display)
                fullscreen_collapse.style.display = 'none';
        }
    };
    /**
     * Hide expand/collapse fullscreen button
     */
    CastPlayer.prototype.hideFullscreenButton = function () {
        var fullscreen_expand = document.getElementById('fullscreen_expand');
        var fullscreen_collapse = document.getElementById('fullscreen_collapse');
        if (fullscreen_expand && fullscreen_expand.style && fullscreen_expand.style.display)
            fullscreen_expand.style.display = 'none';
        if (fullscreen_collapse && fullscreen_collapse.style && fullscreen_collapse.style.display)
            fullscreen_collapse.style.display = 'none';
    };
    /**
     * Show the media control
     */
    CastPlayer.prototype.showMediaControl = function () {
        var media_control = document.getElementById('media_control');
        if (media_control && media_control.style && media_control.style.opacity)
            media_control.style.opacity = 0.7;
    };
    /**
     * Hide the media control
     */
    CastPlayer.prototype.hideMediaControl = function () {
        if (typeof cast !== 'undefined') {
            var context = cast.framework.CastContext.getInstance();
            if (context && context.getCurrentSession()) {
                // Do not hide controls during an active cast session.
                document.getElementById('media_control').style.opacity = 0.7;
            }
            else {
                document.getElementById('media_control').style.opacity = 0;
            }
        }
    };
    /**
     * Show the volume slider
     */
    CastPlayer.prototype.showVolumeSlider = function () {
        if (!castPlayer.playerHandler.isMuted()) {
            document.getElementById('audio_bg').style.opacity = 1;
            document.getElementById('audio_bg_track').style.opacity = 1;
            document.getElementById('audio_bg_level').style.opacity = 1;
            document.getElementById('audio_indicator').style.opacity = 1;
        }
    };
    /**
     * Hide the volume slider
     */
    CastPlayer.prototype.hideVolumeSlider = function () {
        document.getElementById('audio_bg').style.opacity = 0;
        document.getElementById('audio_bg_track').style.opacity = 0;
        document.getElementById('audio_bg_level').style.opacity = 0;
        document.getElementById('audio_indicator').style.opacity = 0;
    };
    /**
     * Reset the volume slider
     */
    CastPlayer.prototype.resetVolumeSlider = function () {
        var volumeTrackHeight = document.getElementById('audio_bg_track').clientHeight;
        var defaultVolumeSliderHeight = DEFAULT_VOLUME * volumeTrackHeight;
        document.getElementById('audio_bg_level').style.height =
            defaultVolumeSliderHeight + 'px';
        document.getElementById('audio_on').style.display = 'block';
        document.getElementById('audio_off').style.display = 'none';
    };
    /**
     * Initialize UI components and add event listeners
     */
    CastPlayer.prototype.initializeUI = function () {
        // Set initial values for title, subtitle, and description
        document.getElementById('media_title').innerHTML =
            castPlayer.mediaContents[0]['title'];
        document.getElementById('media_subtitle').innerHTML =
            castPlayer.mediaContents[castPlayer.currentMediaIndex]['subtitle'];
        document.getElementById('media_desc').innerHTML =
            castPlayer.mediaContents[castPlayer.currentMediaIndex]['description'];
        // Add event handlers to UI components
        document.getElementById('progress_bg').addEventListener('click', castPlayer.seekMedia.bind(castPlayer));
        document.getElementById('progress').addEventListener('click', castPlayer.seekMedia.bind(castPlayer));
        document.getElementById('progress_indicator').addEventListener('dragend', castPlayer.seekMedia.bind(castPlayer));
        document.getElementById('audio_on').addEventListener('click', castPlayer.playerHandler.mute.bind(castPlayer.playerHandler));
        document.getElementById('audio_off').addEventListener('click', castPlayer.playerHandler.unMute.bind(castPlayer.playerHandler));
        document.getElementById('audio_bg').addEventListener('mouseover', castPlayer.showVolumeSlider.bind(castPlayer));
        document.getElementById('audio_on').addEventListener('mouseover', castPlayer.showVolumeSlider.bind(castPlayer));
        document.getElementById('audio_bg_level').addEventListener('mouseover', castPlayer.showVolumeSlider.bind(castPlayer));
        document.getElementById('audio_bg_track').addEventListener('mouseover', castPlayer.showVolumeSlider.bind(castPlayer));
        document.getElementById('audio_bg_level').addEventListener('click', castPlayer.setVolume.bind(castPlayer));
        document.getElementById('audio_bg_track').addEventListener('click', castPlayer.setVolume.bind(castPlayer));
        document.getElementById('audio_bg').addEventListener('mouseout', castPlayer.hideVolumeSlider.bind(castPlayer));
        document.getElementById('audio_on').addEventListener('mouseout', castPlayer.hideVolumeSlider.bind(castPlayer));
        document.getElementById('main_video').addEventListener('mouseover', castPlayer.showMediaControl.bind(castPlayer));
        document.getElementById('main_video').addEventListener('mouseout', castPlayer.hideMediaControl.bind(castPlayer));
        document.getElementById('media_control').addEventListener('mouseover', castPlayer.showMediaControl.bind(castPlayer));
        document.getElementById('media_control').addEventListener('mouseout', castPlayer.hideMediaControl.bind(castPlayer));
        document.getElementById('fullscreen_expand').addEventListener('click', castPlayer.requestFullScreen.bind(castPlayer));
        document.getElementById('fullscreen_collapse').addEventListener('click', castPlayer.cancelFullScreen.bind(castPlayer));
        document.addEventListener('fullscreenchange', castPlayer.fullscreenChangeHandler.bind(castPlayer), false);
        document.addEventListener('webkitfullscreenchange', castPlayer.fullscreenChangeHandler.bind(castPlayer), false);
        // Enable play/pause buttons
        document.getElementById('play').addEventListener('click', castPlayer.playerHandler.play.bind(castPlayer.playerHandler));
        document.getElementById('pause').addEventListener('click', castPlayer.playerHandler.pause.bind(castPlayer.playerHandler));
        document.getElementById('progress_indicator').draggable = true;
    };
    /**
     * Add video thumbnails div's to UI for media JSON contents
     */
    CastPlayer.prototype.addVideoThumbs = function () {
        if (typeof castPlayer.mediaJSON !== 'undefined' && castPlayer.mediaJSON['categories'] && castPlayer.mediaJSON['categories'].length > 0) {
            castPlayer.mediaContents = castPlayer.mediaJSON['categories'][0]['videos'];
            var ni = document.getElementById('carousel');
            var newdiv = null;
            var divIdName = null;
            for (var i = 0; i < castPlayer.mediaContents.length; i++) {
                newdiv = document.createElement('div');
                divIdName = 'thumb' + i + 'Div';
                newdiv.setAttribute('id', divIdName);
                newdiv.setAttribute('class', 'thumb');
                newdiv.innerHTML =
                    '<img src="' + MEDIA_SOURCE_ROOT + castPlayer.mediaContents[i]['thumb'] +
                        '" class="thumbnail">';
                newdiv.addEventListener('click', castPlayer.selectMedia.bind(castPlayer, i));
                ni.appendChild(newdiv);
            }
        }
    };
    CastPlayer.prototype.addMediaContents = function () {
        if (typeof castPlayer.mediaJSON !== 'undefined' && castPlayer.mediaJSON['categories'] && castPlayer.mediaJSON['categories'].length > 0) {
            castPlayer.mediaContents = castPlayer.mediaJSON['categories'][0]['videos'];
            return castPlayer.mediaContents;
        }
        else {
            return null;
        }
    };
    /**
     * Makes human-readable message from chrome.cast.Error
     * @param {chrome.cast.Error} error
     * @return {string} error message
     */
    CastPlayer.getErrorMessage = function (error) {
        switch (error.code) {
            case chrome.cast.ErrorCode.API_NOT_INITIALIZED:
                return 'The API is not initialized.' +
                    (error.description ? ' :' + error.description : '');
            case chrome.cast.ErrorCode.CANCEL:
                return 'The operation was canceled by the user' +
                    (error.description ? ' :' + error.description : '');
            case chrome.cast.ErrorCode.CHANNEL_ERROR:
                return 'A channel to the receiver is not available.' +
                    (error.description ? ' :' + error.description : '');
            case chrome.cast.ErrorCode.EXTENSION_MISSING:
                return 'The Cast extension is not available.' +
                    (error.description ? ' :' + error.description : '');
            case chrome.cast.ErrorCode.INVALID_PARAMETER:
                return 'The parameters to the operation were not valid.' +
                    (error.description ? ' :' + error.description : '');
            case chrome.cast.ErrorCode.RECEIVER_UNAVAILABLE:
                return 'No receiver was compatible with the session request.' +
                    (error.description ? ' :' + error.description : '');
            case chrome.cast.ErrorCode.SESSION_ERROR:
                return 'A session could not be created, or a session was invalid.' +
                    (error.description ? ' :' + error.description : '');
            case chrome.cast.ErrorCode.TIMEOUT:
                return 'The operation timed out.' +
                    (error.description ? ' :' + error.description : '');
            default:
                return error;
        }
    };
    var castPlayer = new CastPlayer();
    window['__onGCastApiAvailable'] = function (isAvailable) {
        if (isAvailable) {
            castPlayer.initializeCastPlayer();
        }
    };
    window.CastPlayer = castPlayer;

    /**
     * Generated bundle index. Do not edit.
     */

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=thinkam.net-ng-cast.umd.js.map
