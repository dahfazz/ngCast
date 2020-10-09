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
            this.ngCastService.stop();
        };
        return NgCastComponent;
    }());
    exports.ɵa = __decorate([
        core.Component({
            selector: 'ng-cast',
            template: "<i *ngIf=\"!castingStatus.casting\" class=\"material-icons\" (click)=\"openSession()\">cast</i>\n<i *ngIf=\"castingStatus.casting\" class=\"material-icons\" (click)=\"closeSession()\">cast_connected</i>",
            styles: [""]
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

    'use strict';
    var mediaJSON$1 = {
        'categories': []
    };
    /** Cleaner UI for demo purposes. */
    var DEMO_MODE = false;
    /** @const {string} Media source root URL */
    var MEDIA_SOURCE_ROOT = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/';
    /**
     * Controls if Ads are enabled. Controlled by radio button.
     * @type {boolean}
     */
    var ENABLE_ADS = false;
    /**
     * Controls if Live stream is played. Controlled by radio button.
     * @type {boolean}
     */
    var ENABLE_LIVE = false;
    /**
     * Buffer to decide if the live indicator should be displayed to show that
     * playback is at the playback head.
     * @const {number}
     */
    var LIVE_INDICATOR_BUFFER = 50;
    /**
     * Width of progress bar in pixels.
     * @const {number}
     */
    var PROGRESS_BAR_WIDTH = 700;
    /**
     * Time in milliseconds for minimal progress update.
     * @const {number}
     */
    var TIMER_STEP = 1000;
    /**
     * Cast volume upon initial connection.
     * @const {number}
     */
    var DEFAULT_VOLUME = 0.5;
    /**
     * Height, in pixels, of volume bar.
     * @const {number}
     */
    var FULL_VOLUME_HEIGHT = 100;
    /** @enum {string} Constants of states for media for both local and remote playback */
    var PLAYER_STATE = {
        // No media is loaded into the player. For remote playback, maps to
        // the PlayerState.IDLE state.
        IDLE: 'IDLE',
        // Player is in PLAY mode but not actively playing content. For remote
        // playback, maps to the PlayerState.BUFFERING state.
        BUFFERING: 'BUFFERING',
        // The media is loaded but not playing.
        LOADED: 'LOADED',
        // The media is playing. For remote playback, maps to the PlayerState.PLAYING state.
        PLAYING: 'PLAYING',
        // The media is paused. For remote playback, maps to the PlayerState.PAUSED state.
        PAUSED: 'PAUSED'
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
        this.setupLocalPlayer();
        this.addVideoThumbs();
        this.initializeUI();
    };
    CastPlayer.prototype.initializeCastPlayer = function () {
        var options = {};
        // Set the receiver application ID to your own (created in the
        // Google Cast Developer Console), or optionally
        // use the chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
        options.receiverApplicationId = 'C0868879';
        // Auto join policy can be one of the following three:
        // ORIGIN_SCOPED - Auto connect from same appId and page origin
        // TAB_AND_ORIGIN_SCOPED - Auto connect from same appId, page origin, and tab
        // PAGE_SCOPED - No auto connect
        options.autoJoinPolicy = chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED;
        cast.framework.CastContext.getInstance().setOptions(options);
        this.remotePlayer = new cast.framework.RemotePlayer();
        this.remotePlayerController = new cast.framework.RemotePlayerController(this.remotePlayer);
        this.remotePlayerController.addEventListener(cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED, function (e) {
            this.switchPlayer(e.value);
        }.bind(this));
    };
    /**
     * Switch between the remote and local players.
     */
    CastPlayer.prototype.switchPlayer = function () {
        this.playerStateBeforeSwitch = this.playerState;
        this.stopProgressTimer();
        this.resetVolumeSlider();
        // Session is active
        if (cast && cast.framework && this.remotePlayer.isConnected) {
            // Pause local playback
            this.playerHandler.pause();
            this.setupRemotePlayer();
        }
        else {
            this.setupLocalPlayer();
        }
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
            if (castPlayer.playerState == PLAYER_STATE.IDLE ||
                !this.target.isMediaLoaded(castPlayer.currentMediaIndex)) {
                this.load(castPlayer.currentMediaIndex);
                return;
            }
            castPlayer.playerState = PLAYER_STATE.PLAYING;
            this.target.play();
            document.getElementById('play').style.display = 'none';
            document.getElementById('pause').style.display = 'block';
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
        this.updateDurationDisplay = function () {
            this.target.updateDurationDisplay();
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
        // Cleanup remote player UI
        var live_indicator = document.getElementById('live_indicator');
        if (live_indicator && live_indicator.style && live_indicator.style.display) {
            live_indicator.style.display = 'none';
        }
        this.removeAdMarkers();
        document.getElementById('skip').style.display = 'none';
        var localPlayer = document.getElementById('video_element');
        localPlayer.addEventListener('loadeddata', this.onMediaLoadedLocally.bind(this));
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
            localPlayer.stop();
        };
        playerTarget.load = function (mediaIndex) {
            localPlayer.src = this.mediaContents[mediaIndex]['sources'][0];
            localPlayer.load();
        }.bind(this);
        playerTarget.isMediaLoaded = function (mediaIndex) {
            if (!mediaIndex) {
                return (localPlayer.src !== null && localPlayer.src !== "");
            }
            else {
                return (localPlayer.src == this.mediaContents[mediaIndex]['sources'][0]);
            }
        }.bind(this);
        playerTarget.getCurrentMediaTime = function () {
            return localPlayer.currentTime;
        };
        playerTarget.getMediaDuration = function () {
            return localPlayer.duration;
        };
        playerTarget.updateDisplay = function () {
            // playerstate view
            document.getElementById('playerstate').style.display = 'none';
            document.getElementById('playerstatebg').style.display = 'none';
            document.getElementById('video_image_overlay').style.display = 'none';
            // media_info view
            document.getElementById('media_title').innerHTML =
                castPlayer.mediaContents[castPlayer.currentMediaIndex]['title'];
            document.getElementById('media_subtitle').innerHTML =
                castPlayer.mediaContents[castPlayer.currentMediaIndex]['subtitle'];
        };
        playerTarget.updateCurrentTimeDisplay = function () {
            // Increment for local playback
            this.currentMediaTime += 1;
            this.playerHandler.setTimeString(document.getElementById('currentTime'), this.currentMediaTime);
        }.bind(this);
        playerTarget.updateDurationDisplay = function () {
            this.playerHandler.setTimeString(document.getElementById('duration'), this.mediaDuration);
        }.bind(this);
        playerTarget.setTimeString = function (element, time) {
            var currentTimeString = this.getMediaTimeString(time);
            if (currentTimeString !== null) {
                element.style.display = '';
                element.innerHTML = currentTimeString;
            }
            else {
                element.style.display = 'none';
            }
        }.bind(this);
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
        this.playerHandler.setTarget(playerTarget);
        this.playerHandler.setVolume(DEFAULT_VOLUME * FULL_VOLUME_HEIGHT);
        this.showFullscreenButton();
        this.enableProgressBar(true);
        if (this.currentMediaTime > 0) {
            this.playerHandler.load();
            this.playerHandler.play();
        }
    };
    /**
     * Set the PlayerHandler target to use the remote player
     * Add event listeners for player changes which may occur outside sender app.
     */
    CastPlayer.prototype.setupRemotePlayer = function () {
        // Triggers when the media info or the player state changes
        this.remotePlayerController.addEventListener(cast.framework.RemotePlayerEventType.MEDIA_INFO_CHANGED, function (event) {
            var session = cast.framework.CastContext.getInstance().getCurrentSession();
            if (!session) {
                this.mediaInfo = null;
                this.isLiveContent = false;
                this.playerHandler.updateDisplay();
                return;
            }
            var media = session.getMediaSession();
            if (!media) {
                this.mediaInfo = null;
                this.isLiveContent = false;
                this.playerHandler.updateDisplay();
                return;
            }
            this.mediaInfo = media.media;
            if (this.mediaInfo) {
                this.isLiveContent = (this.mediaInfo.streamType ==
                    chrome.cast.media.StreamType.LIVE);
            }
            else {
                this.isLiveContent = false;
            }
            if (media.playerState == PLAYER_STATE.PLAYING && this.playerState !== PLAYER_STATE.PLAYING) {
                this.playerHandler.prepareToPlay();
            }
            this.removeAdMarkers();
            this.updateAdMarkers();
            this.playerHandler.updateDisplay();
        }.bind(this));
        this.remotePlayerController.addEventListener(cast.framework.RemotePlayerEventType.CAN_SEEK_CHANGED, function (event) {
            this.enableProgressBar(event.value);
        }.bind(this));
        this.remotePlayerController.addEventListener(cast.framework.RemotePlayerEventType.IS_PAUSED_CHANGED, function () {
            if (this.remotePlayer.isPaused) {
                this.playerHandler.pause();
            }
            else if (this.playerState !== PLAYER_STATE.PLAYING) {
                // If currently not playing, start to play.
                // This occurs if starting to play from local, but this check is
                // required if the state is changed remotely.
                this.playerHandler.play();
            }
        }.bind(this));
        this.remotePlayerController.addEventListener(cast.framework.RemotePlayerEventType.IS_MUTED_CHANGED, function () {
            if (this.remotePlayer.isMuted) {
                this.playerHandler.mute();
            }
            else {
                this.playerHandler.unMute();
            }
        }.bind(this));
        this.remotePlayerController.addEventListener(cast.framework.RemotePlayerEventType.VOLUME_LEVEL_CHANGED, function () {
            var newVolume = this.remotePlayer.volumeLevel * FULL_VOLUME_HEIGHT;
            var p = document.getElementById('audio_bg_level');
            p.style.height = newVolume + 'px';
            p.style.marginTop = -newVolume + 'px';
        }.bind(this));
        this.remotePlayerController.addEventListener(cast.framework.RemotePlayerEventType.IS_PLAYING_BREAK_CHANGED, function (event) {
            this.isPlayingBreak(event.value);
        }.bind(this));
        this.remotePlayerController.addEventListener(cast.framework.RemotePlayerEventType.WHEN_SKIPPABLE_CHANGED, function (event) {
            this.onWhenSkippableChanged(event.value);
        }.bind(this));
        this.remotePlayerController.addEventListener(cast.framework.RemotePlayerEventType.CURRENT_BREAK_CLIP_TIME_CHANGED, function (event) {
            this.onCurrentBreakClipTimeChanged(event.value);
        }.bind(this));
        this.remotePlayerController.addEventListener(cast.framework.RemotePlayerEventType.BREAK_CLIP_ID_CHANGED, function (event) {
            this.onBreakClipIdChanged(event.value);
        }.bind(this));
        this.remotePlayerController.addEventListener(cast.framework.RemotePlayerEventType.LIVE_SEEKABLE_RANGE_CHANGED, function (event) {
            console.log('LIVE_SEEKABLE_RANGE_CHANGED');
            this.liveSeekableRange = event.value;
        }.bind(this));
        // This object will implement PlayerHandler callbacks with
        // remotePlayerController, and makes necessary UI updates specific
        // to remote playback.
        var playerTarget = {};
        playerTarget.play = function () {
            if (this.remotePlayer.isPaused) {
                this.remotePlayerController.playOrPause();
            }
            var vi = document.getElementById('video_image');
            vi.style.display = '';
            var localPlayer = document.getElementById('video_element');
            localPlayer.style.display = 'none';
        }.bind(this);
        playerTarget.pause = function () {
            if (!this.remotePlayer.isPaused) {
                this.remotePlayerController.playOrPause();
            }
        }.bind(this);
        playerTarget.stop = function () {
            this.remotePlayerController.stop();
        }.bind(this);
        // Load request for local -> remote
        playerTarget.load = function (mediaIndex) {
            console.log('Loading...' + this.mediaContents[mediaIndex]['title']);
            var mediaInfo = new chrome.cast.media.MediaInfo(this.mediaContents[mediaIndex]['sources'][0], 'video/mp4');
            mediaInfo.streamType = chrome.cast.media.StreamType.BUFFERED;
            mediaInfo.metadata = new chrome.cast.media.TvShowMediaMetadata();
            mediaInfo.metadata.title = this.mediaContents[mediaIndex]['title'];
            mediaInfo.metadata.subtitle = this.mediaContents[mediaIndex]['subtitle'];
            mediaInfo.metadata.images = [{
                    'url': MEDIA_SOURCE_ROOT + this.mediaContents[mediaIndex]['thumb']
                }];
            var request = new chrome.cast.media.LoadRequest(mediaInfo);
            request.currentTime = this.currentMediaTime;
            if (ENABLE_ADS) {
                // Add sample breaks and breakClips.
                mediaInfo.breakClips = breakClipsJSON;
                mediaInfo.breaks = breaksJSON;
            }
            else if (ENABLE_LIVE) {
                // Change the streamType and add live specific metadata.
                mediaInfo.streamType = chrome.cast.media.StreamType.LIVE;
                // TODO: Set the metadata on the receiver side in your implementation.
                // startAbsoluteTime and sectionStartTimeInMedia will be set for you.
                // See https://developers.google.com/cast/docs/caf_receiver/live.
                // TODO: Start time, is a fake timestamp. Use correct values for your implementation.
                var currentTime = new Date();
                // Convert from milliseconds to seconds.
                currentTime = currentTime / 1000;
                var sectionStartAbsoluteTime = currentTime;
                // Duration should be -1 for live streams.
                mediaInfo.duration = -1;
                // TODO: Set on the receiver for your implementation.
                mediaInfo.startAbsoluteTime = currentTime;
                mediaInfo.metadata.sectionStartAbsoluteTime = sectionStartAbsoluteTime;
                // TODO: Set on the receiver for your implementation.
                mediaInfo.metadata.sectionStartTimeInMedia = 0;
                mediaInfo.metadata.sectionDuration = this.mediaContents[mediaIndex]['duration'];
                var item = new chrome.cast.media.QueueItem(mediaInfo);
                request.queueData = new chrome.cast.media.QueueData();
                request.queueData.items = [item];
                request.queueData.name = "Sample Queue for Live";
            }
            // Do not immediately start playing if the player was previously PAUSED.
            if (!this.playerStateBeforeSwitch || this.playerStateBeforeSwitch == PLAYER_STATE.PAUSED) {
                request.autoplay = false;
            }
            else {
                request.autoplay = true;
            }
            cast.framework.CastContext.getInstance().getCurrentSession().loadMedia(request).then(function () {
                console.log('Remote media loaded');
            }.bind(this), function (errorCode) {
                this.playerState = PLAYER_STATE.IDLE;
                console.log('Remote media load error: ' +
                    CastPlayer.getErrorMessage(errorCode));
                this.playerHandler.updateDisplay();
            }.bind(this));
        }.bind(this);
        playerTarget.isMediaLoaded = function (mediaIndex) {
            var session = cast.framework.CastContext.getInstance().getCurrentSession();
            if (!session)
                return false;
            var media = session.getMediaSession();
            if (!media)
                return false;
            if (media.playerState == PLAYER_STATE.IDLE) {
                return false;
            }
            // No need to verify local mediaIndex content.
            return true;
        }.bind(this);
        /**
         * @return {number?} Current media time for the content. Always returns
         *      media time even if in clock time (conversion done when displaying).
         */
        playerTarget.getCurrentMediaTime = function () {
            if (this.isLiveContent && this.mediaInfo.metadata &&
                this.mediaInfo.metadata.sectionStartTimeInMedia) {
                return this.remotePlayer.currentTime - this.mediaInfo.metadata.sectionStartTimeInMedia;
            }
            else {
                // VOD and live scenerios where live metadata is not provided.
                return this.remotePlayer.currentTime;
            }
        }.bind(this);
        /**
         * @return {number?} media time duration for the content. Always returns
         *      media time even if in clock time (conversion done when displaying).
         */
        playerTarget.getMediaDuration = function () {
            if (this.isLiveContent) {
                // Scenerios when live metadata is not provided.
                if (this.mediaInfo.metadata == undefined ||
                    this.mediaInfo.metadata.sectionDuration == undefined ||
                    this.mediaInfo.metadata.sectionStartTimeInMedia == undefined) {
                    return null;
                }
                return this.mediaInfo.metadata.sectionDuration;
            }
            else {
                return this.remotePlayer.duration;
            }
        }.bind(this);
        playerTarget.updateDisplay = function () {
            var castSession = cast.framework.CastContext.getInstance().getCurrentSession();
            if (castSession && castSession.getMediaSession() && castSession.getMediaSession().media) {
                var media = castSession.getMediaSession();
                var mediaInfo = media.media;
                // image placeholder for video view
                var vi = document.getElementById('video_image');
                if (mediaInfo.metadata && mediaInfo.metadata.images &&
                    mediaInfo.metadata.images.length > 0) {
                    vi.src = mediaInfo.metadata.images[0].url;
                }
                // playerstate view
                document.getElementById('playerstate').style.display = 'block';
                document.getElementById('playerstatebg').style.display = 'block';
                document.getElementById('video_image_overlay').style.display = 'block';
                var mediaTitle = '';
                var mediaEpisodeTitle = '';
                var mediaSubtitle = '';
                if (mediaInfo.metadata) {
                    mediaTitle = mediaInfo.metadata.title;
                    mediaEpisodeTitle = mediaInfo.metadata.episodeTitle;
                    // Append episode title if present
                    mediaTitle = mediaEpisodeTitle ? mediaTitle + ': ' + mediaEpisodeTitle : mediaTitle;
                    // Do not display mediaTitle if not defined.
                    mediaTitle = (mediaTitle) ? mediaTitle + ' ' : '';
                    mediaSubtitle = mediaInfo.metadata.subtitle;
                    mediaSubtitle = (mediaSubtitle) ? mediaSubtitle + ' ' : '';
                }
                if (DEMO_MODE) {
                    document.getElementById('playerstate').innerHTML =
                        (ENABLE_LIVE ? 'Live Content ' : 'Sample Video ') + media.playerState + ' on Chromecast';
                    // media_info view
                    document.getElementById('media_title').innerHTML = (ENABLE_LIVE ? 'Live Content' : 'Sample Video');
                    document.getElementById('media_subtitle').innerHTML = '';
                }
                else {
                    document.getElementById('playerstate').innerHTML =
                        mediaTitle + media.playerState + ' on ' +
                            castSession.getCastDevice().friendlyName;
                    // media_info view
                    document.getElementById('media_title').innerHTML = mediaTitle;
                    document.getElementById('media_subtitle').innerHTML = mediaSubtitle;
                }
                // live information
                if (mediaInfo.streamType == chrome.cast.media.StreamType.LIVE) {
                    this.liveSeekableRange = media.liveSeekableRange;
                    var live_indicator = document.getElementById('live_indicator');
                    live_indicator.style.display = 'block';
                    // Display indicator if current time is close to the end of
                    // the seekable range.
                    if (this.liveSeekableRange && (Math.abs(media.getEstimatedTime() - this.liveSeekableRange.end) < LIVE_INDICATOR_BUFFER)) {
                        live_indicator.src = "imagefiles/live_indicator_active.png";
                    }
                    else {
                        live_indicator.src = "imagefiles/live_indicator_inactive.png";
                    }
                }
                else {
                    document.getElementById('live_indicator').style.display = 'none';
                }
            }
            else {
                // playerstate view
                document.getElementById('playerstate').style.display = 'none';
                document.getElementById('playerstatebg').style.display = 'none';
                document.getElementById('video_image_overlay').style.display = 'none';
                // media_info view
                document.getElementById('media_title').innerHTML = "";
                document.getElementById('media_subtitle').innerHTML = "";
            }
        }.bind(this);
        playerTarget.updateCurrentTimeDisplay = function () {
            this.playerHandler.setTimeString(document.getElementById('currentTime'), this.playerHandler.getCurrentMediaTime());
        }.bind(this);
        playerTarget.updateDurationDisplay = function () {
            this.playerHandler.setTimeString(document.getElementById('duration'), this.playerHandler.getMediaDuration());
        }.bind(this);
        playerTarget.setTimeString = function (element, time) {
            var currentTimeString = this.getMediaTimeString(time);
            if (this.isLiveContent) {
                if (currentTimeString == null) {
                    element.style.display = 'none';
                    return;
                }
                // clock time
                if (this.mediaInfo.metadata && this.mediaInfo.metadata.sectionStartAbsoluteTime !== undefined) {
                    element.style.display = 'flex';
                    element.innerHTML = this.getClockTimeString(time + this.mediaInfo.metadata.sectionStartAbsoluteTime);
                }
                else {
                    // media time
                    element.style.display = 'flex';
                    element.innerHTML = currentTimeString;
                }
            }
            else {
                if (currentTimeString !== null) {
                    element.style.display = 'flex';
                    element.innerHTML = currentTimeString;
                }
                else {
                    element.style.display = 'none';
                }
            }
        }.bind(this);
        playerTarget.setVolume = function (volumeSliderPosition) {
            var currentVolume = this.remotePlayer.volumeLevel;
            var p = document.getElementById('audio_bg_level');
            if (volumeSliderPosition < FULL_VOLUME_HEIGHT) {
                p.style.height = volumeSliderPosition + 'px';
                p.style.marginTop = -volumeSliderPosition + 'px';
                currentVolume = volumeSliderPosition / FULL_VOLUME_HEIGHT;
            }
            else {
                currentVolume = 1;
            }
            this.remotePlayer.volumeLevel = currentVolume;
            this.remotePlayerController.setVolumeLevel();
        }.bind(this);
        playerTarget.mute = function () {
            if (!this.remotePlayer.isMuted) {
                this.remotePlayerController.muteOrUnmute();
            }
        }.bind(this);
        playerTarget.unMute = function () {
            if (this.remotePlayer.isMuted) {
                this.remotePlayerController.muteOrUnmute();
            }
        }.bind(this);
        playerTarget.isMuted = function () {
            return this.remotePlayer.isMuted;
        }.bind(this);
        playerTarget.seekTo = function (time) {
            this.remotePlayer.currentTime = time;
            this.remotePlayerController.seek();
        }.bind(this);
        this.playerHandler.setTarget(playerTarget);
        // Setup remote player properties on setup
        if (this.remotePlayer.isMuted) {
            this.playerHandler.mute();
        }
        this.enableProgressBar(this.remotePlayer.canSeek);
        // The remote player may have had a volume set from previous playback
        var currentVolume = this.remotePlayer.volumeLevel * FULL_VOLUME_HEIGHT;
        var p = document.getElementById('audio_bg_level');
        p.style.height = currentVolume + 'px';
        p.style.marginTop = -currentVolume + 'px';
        // Show media_control
        document.getElementById('media_control').style.opacity = 0.7;
        this.hideFullscreenButton();
        // If resuming a session, take the remote properties and continue the existing
        // playback. Otherwise, load local content.
        if (cast.framework.CastContext.getInstance().getCurrentSession().getSessionState() ==
            cast.framework.SessionState.SESSION_RESUMED) {
            console.log('Resuming session');
            this.playerHandler.prepareToPlay();
            // New media has been loaded so the previous ad markers should
            // be removed.
            this.removeAdMarkers();
            this.updateAdMarkers();
        }
        else {
            this.playerHandler.load();
        }
    };
    /**
     * Callback when media is loaded in local player
     */
    CastPlayer.prototype.onMediaLoadedLocally = function () {
        var localPlayer = document.getElementById('video_element');
        localPlayer.currentTime = this.currentMediaTime;
        this.playerHandler.prepareToPlay();
    };
    /**
     * Select a media content
     * @param {number} mediaIndex A number for media index
     */
    CastPlayer.prototype.selectMedia = function (mediaIndex) {
        console.log('Media index selected: ' + mediaIndex);
        this.currentMediaIndex = mediaIndex;
        // Clear currentMediaInfo when playing content from the sender.
        this.playerHandler.currentMediaInfo = undefined;
        // Set video image
        var vi = document.getElementById('video_image');
        vi.src = MEDIA_SOURCE_ROOT + this.mediaContents[mediaIndex]['thumb'];
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
        this.stopProgressTimer();
        this.currentMediaTime = 0;
        this.playerHandler.setTimeString(document.getElementById('currentTime'), 0);
        this.playerHandler.setTimeString(document.getElementById('duration'), 0);
        this.playerState = PLAYER_STATE.IDLE;
        this.playerHandler.play();
    };
    /**
     * Media seek function
     * @param {Event} event An event object from seek
     */
    CastPlayer.prototype.seekMedia = function (event) {
        if (this.mediaDuration == null || (cast.framework.CastContext.getInstance().getCurrentSession() && !this.remotePlayer.canSeek)) {
            console.log('Error - Not seekable');
            return;
        }
        if (this.isLiveContent && !this.liveSeekableRange) {
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
            seekTime = parseInt(this.currentMediaTime + this.mediaDuration * position /
                PROGRESS_BAR_WIDTH, 10);
            pp = parseInt(pi.style.marginLeft, 10) + position;
            pw = parseInt(progress.style.width, 10) + position;
        }
        else {
            seekTime = parseInt(position * this.mediaDuration / PROGRESS_BAR_WIDTH, 10);
            pp = position;
            pw = position;
        }
        if (this.playerState === PLAYER_STATE.PLAYING ||
            this.playerState === PLAYER_STATE.PAUSED) {
            this.currentMediaTime = seekTime;
            progress.style.width = pw + 'px';
            pi.style.marginLeft = pp + 'px';
        }
        if (this.isLiveContent) {
            seekTime += this.mediaInfo.metadata.sectionStartTimeInMedia;
        }
        this.playerHandler.seekTo(seekTime);
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
        this.playerHandler.setVolume(pos);
    };
    /**
     * Starts the timer to increment the media progress bar
     */
    CastPlayer.prototype.startProgressTimer = function () {
        this.stopProgressTimer();
        // Start progress timer
        this.timer = setInterval(this.incrementMediaTimeHandler, TIMER_STEP);
    };
    /**
     * Stops the timer to increment the media progress bar
     */
    CastPlayer.prototype.stopProgressTimer = function () {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    };
    /**
     * Increment media current time depending on remote or local playback
     */
    CastPlayer.prototype.incrementMediaTime = function () {
        // First sync with the current player's time
        this.currentMediaTime = this.playerHandler.getCurrentMediaTime();
        this.mediaDuration = this.playerHandler.getMediaDuration();
        this.playerHandler.updateDurationDisplay();
        if (this.mediaDuration == null || this.currentMediaTime < this.mediaDuration || this.isLiveContent) {
            this.playerHandler.updateCurrentTimeDisplay();
            this.updateProgressBarByTimer();
        }
        else if (this.mediaDuration > 0) {
            this.endPlayback();
        }
    };
    /**
     * Update progress bar and currentTime based on timer
     */
    CastPlayer.prototype.updateProgressBarByTimer = function () {
        var progressBar = document.getElementById('progress');
        var pi = document.getElementById('progress_indicator');
        // Live situation where the progress and duration is unknown.
        if (this.mediaDuration == null) {
            if (!this.isLiveContent) {
                console.log('Error - Duration is not defined for a VOD stream.');
            }
            progressBar.style.width = '0px';
            var skip = document.getElementById('skip');
            if (skip && skip.style && skip.style.display) {
                skip.style.display = 'none';
            }
            pi.style.display = 'none';
            var seekable_window_1 = document.getElementById('seekable_window');
            if (seekable_window_1 && seekable_window_1.style && seekable_window_1.style.width)
                seekable_window_1.style.width = '0px';
            var unseekable_overlay_1 = document.getElementById('unseekable_overlay');
            if (unseekable_overlay_1 && unseekable_overlay_1.style && unseekable_overlay_1.style.width)
                unseekable_overlay_1.style.width = '0px';
            return;
        }
        else {
            pi.style.display = '';
        }
        if (isNaN(parseInt(progressBar.style.width, 10))) {
            progressBar.style.width = '0px';
        }
        // Prevent indicator from exceeding the max width. Happens during
        // short media when each progress step is large
        var pp = Math.floor(PROGRESS_BAR_WIDTH * this.currentMediaTime / this.mediaDuration);
        if (pp > PROGRESS_BAR_WIDTH) {
            pp = PROGRESS_BAR_WIDTH;
        }
        else if (pp < 0) {
            pp = 0;
        }
        progressBar.style.width = pp + 'px';
        pi.style.marginLeft = pp + 'px';
        var seekable_window = document.getElementById('seekable_window');
        var unseekable_overlay = document.getElementById('unseekable_overlay');
        if (this.isLiveContent) {
            if (this.liveSeekableRange) {
                // Use the liveSeekableRange to draw the seekable and unseekable windows
                var seekableMediaPosition = Math.max(this.mediaInfo.metadata.sectionStartTimeInMedia, this.liveSeekableRange.end) -
                    this.mediaInfo.metadata.sectionStartTimeInMedia;
                var seekableWidth = Math.floor(PROGRESS_BAR_WIDTH * seekableMediaPosition / this.mediaDuration);
                if (seekableWidth > PROGRESS_BAR_WIDTH) {
                    seekableWidth = PROGRESS_BAR_WIDTH;
                }
                else if (seekableWidth < 0) {
                    seekableWidth = 0;
                }
                seekable_window.style.width = seekableWidth + 'px';
                var unseekableMediaPosition = Math.max(this.mediaInfo.metadata.sectionStartTimeInMedia, this.liveSeekableRange.start) -
                    this.mediaInfo.metadata.sectionStartTimeInMedia;
                var unseekableWidth = Math.floor(PROGRESS_BAR_WIDTH * unseekableMediaPosition / this.mediaDuration);
                if (unseekableWidth > PROGRESS_BAR_WIDTH) {
                    unseekableWidth = PROGRESS_BAR_WIDTH;
                }
                else if (unseekableWidth < 0) {
                    unseekableWidth = 0;
                }
                unseekable_overlay.style.width = unseekableWidth + 'px';
            }
            else {
                // Nothing is seekable if no liveSeekableRange
                seekable_window.style.width = '0px';
                unseekable_overlay.style.width = PROGRESS_BAR_WIDTH + 'px';
            }
        }
        else {
            // Default to everything seekable
            seekable_window.style.width = PROGRESS_BAR_WIDTH + 'px';
            unseekable_overlay.style.width = '0px';
        }
        if (pp >= PROGRESS_BAR_WIDTH && !this.isLiveContent) {
            this.endPlayback();
        }
    };
    /**
     *  End playback. Called when media ends.
     */
    CastPlayer.prototype.endPlayback = function () {
        this.currentMediaTime = 0;
        this.stopProgressTimer();
        this.playerState = PLAYER_STATE.IDLE;
        this.playerHandler.updateDisplay();
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
                    this.adPositionToMargin(adBreak.position, contentDuration) + 'px"></div>';
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
        this.enableProgressBar(!isPlayingBreak);
    };
    /**
     * Handle WHEN_SKIPPABLE_CHANGED event
     */
    CastPlayer.prototype.onWhenSkippableChanged = function (whenSkippable) {
        this.whenSkippable = whenSkippable;
    };
    /**
     * Handle CURRENT_BREAK_CLIP_TIME_CHANGED event
     */
    CastPlayer.prototype.onCurrentBreakClipTimeChanged = function (currentBreakClipTime) {
        var skip = document.getElementById('skip');
        // Unskippable
        if (this.whenSkippable == undefined || this.whenSkippable < 0) {
            // Hide skip button    
            if (skip && skip.style && skip.style.display)
                skip.style.display = 'none';
        }
        // Skippable
        else if (this.whenSkippable !== undefined || currentBreakClipTime >= this.whenSkippable) {
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
        this.remotePlayerController.skipAd();
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
            progress.style.backgroundImage = "url('./imagefiles/timeline_bg_progress.png')";
            progress.style.cursor = "pointer";
            seekable_window.style.cursor = "pointer";
            progress_indicator.style.cursor = "pointer";
            progress_indicator.draggable = true;
            // Add listeners
            progress.addEventListener('click', this.seekMediaListener);
            seekable_window.addEventListener('click', this.seekMediaListener);
            progress_indicator.addEventListener('dragend', this.seekMediaListener);
        }
        else {
            // Disable UI
            progress.style.backgroundImage = "url('./imagefiles/timeline_bg_buffer.png')";
            progress.style.cursor = "default";
            seekable_window.style.cursor = "default";
            progress_indicator.style.cursor = "default";
            progress_indicator.draggable = false;
            // Remove listeners
            progress.removeEventListener('click', this.seekMediaListener);
            seekable_window.removeEventListener('click', this.seekMediaListener);
            progress_indicator.removeEventListener('dragend', this.seekMediaListener);
        }
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
        this.fullscreen = !this.fullscreen;
    };
    /**
     * Show expand/collapse fullscreen button
     */
    CastPlayer.prototype.showFullscreenButton = function () {
        var fullscreen_expand = document.getElementById('fullscreen_expand');
        var fullscreen_collapse = document.getElementById('fullscreen_collapse');
        if (this.fullscreen) {
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
        if (media_control && media_control.style && media_control.opacity)
            media_control.style.opacity = 0.7;
    };
    /**
     * Hide the media control
     */
    CastPlayer.prototype.hideMediaControl = function () {
        var context = cast.framework.CastContext.getInstance();
        if (context && context.getCurrentSession()) {
            // Do not hide controls during an active cast session.
            document.getElementById('media_control').style.opacity = 0.7;
        }
        else {
            document.getElementById('media_control').style.opacity = 0;
        }
    };
    /**
     * Show the volume slider
     */
    CastPlayer.prototype.showVolumeSlider = function () {
        if (!this.playerHandler.isMuted()) {
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
        // Set initial values for title and subtitle.
        document.getElementById('media_title').innerHTML =
            this.mediaContents[0]['title'];
        document.getElementById('media_subtitle').innerHTML =
            this.mediaContents[this.currentMediaIndex]['subtitle'];
        document.getElementById('seekable_window').addEventListener('click', this.seekMediaListener);
        document.getElementById('progress').addEventListener('click', this.seekMediaListener);
        document.getElementById('progress_indicator').addEventListener('dragend', this.seekMediaListener);
        document.getElementById('skip').addEventListener('click', this.skipAd.bind(this));
        document.getElementById('audio_on').addEventListener('click', this.playerHandler.mute.bind(this.playerHandler));
        document.getElementById('audio_off').addEventListener('click', this.playerHandler.unMute.bind(this.playerHandler));
        document.getElementById('audio_bg').addEventListener('mouseover', this.showVolumeSlider.bind(this));
        document.getElementById('audio_on').addEventListener('mouseover', this.showVolumeSlider.bind(this));
        document.getElementById('audio_bg_level').addEventListener('mouseover', this.showVolumeSlider.bind(this));
        document.getElementById('audio_bg_track').addEventListener('mouseover', this.showVolumeSlider.bind(this));
        document.getElementById('audio_bg_level').addEventListener('click', this.setVolume.bind(this));
        document.getElementById('audio_bg_track').addEventListener('click', this.setVolume.bind(this));
        document.getElementById('audio_bg').addEventListener('mouseout', this.hideVolumeSlider.bind(this));
        document.getElementById('audio_on').addEventListener('mouseout', this.hideVolumeSlider.bind(this));
        document.getElementById('main_video').addEventListener('mouseover', this.showMediaControl.bind(this));
        document.getElementById('main_video').addEventListener('mouseout', this.hideMediaControl.bind(this));
        document.getElementById('media_control').addEventListener('mouseover', this.showMediaControl.bind(this));
        document.getElementById('media_control').addEventListener('mouseout', this.hideMediaControl.bind(this));
        document.getElementById('fullscreen_expand').addEventListener('click', this.requestFullScreen.bind(this));
        document.getElementById('fullscreen_collapse').addEventListener('click', this.cancelFullScreen.bind(this));
        document.addEventListener('fullscreenchange', this.fullscreenChangeHandler.bind(this), false);
        document.addEventListener('webkitfullscreenchange', this.fullscreenChangeHandler.bind(this), false);
        // Enable play/pause buttons
        document.getElementById('play').addEventListener('click', this.playerHandler.play.bind(this.playerHandler));
        document.getElementById('pause').addEventListener('click', this.playerHandler.pause.bind(this.playerHandler));
        document.getElementById('progress_indicator').draggable = true;
        // Set up feature radio buttons
        var noneRadio = document.getElementById('none');
        noneRadio.onclick = function () {
            ENABLE_LIVE = false;
            ENABLE_ADS = false;
            console.log("Features have been removed");
        };
        var adsRadio = document.getElementById('ads');
        adsRadio.onclick = function () {
            ENABLE_LIVE = false;
            ENABLE_ADS = true;
            console.log("Ads have been enabled");
        };
        var liveRadio = document.getElementById('live');
        liveRadio.onclick = function () {
            ENABLE_LIVE = true;
            ENABLE_ADS = false;
            console.log("Live has been enabled");
        };
        if (ENABLE_ADS) {
            if (ENABLE_LIVE) {
                console.error('Only one feature can be enabled at a time. Enabling ads.');
            }
            adsRadio.checked = true;
            console.log("Ads are enabled");
        }
        else if (ENABLE_LIVE) {
            liveRadio.checked = true;
            console.log("Live is enabled");
        }
        else {
            noneRadio.checked = true;
            console.log("No features are enabled");
        }
    };
    /**
     * Add video thumbnails div's to UI for media JSON contents
     */
    CastPlayer.prototype.addVideoThumbs = function () {
        this.mediaContents = mediaJSON$1['categories'][0]['videos'];
        var ni = document.getElementById('carousel');
        var newdiv = null;
        var divIdName = null;
        for (var i = 0; i < this.mediaContents.length; i++) {
            newdiv = document.createElement('div');
            divIdName = 'thumb' + i + 'Div';
            newdiv.setAttribute('id', divIdName);
            newdiv.setAttribute('class', 'thumb');
            newdiv.innerHTML =
                '<img src="' + MEDIA_SOURCE_ROOT + this.mediaContents[i]['thumb'] +
                    '" class="thumbnail">';
            newdiv.addEventListener('click', this.selectMedia.bind(this, i));
            ni.appendChild(newdiv);
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

    /**
     * Generated bundle index. Do not edit.
     */

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=thinkam.net-ng-cast.umd.js.map
