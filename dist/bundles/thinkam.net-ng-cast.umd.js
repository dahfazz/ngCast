(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs'), require('videogular2/compiled/src/streaming/vg-dash/vg-dash'), require('videogular2/compiled/core'), require('videogular2/compiled/controls'), require('videogular2/compiled/streaming'), require('videogular2/compiled/buffering'), require('videogular2/compiled/overlay-play')) :
    typeof define === 'function' && define.amd ? define('@thinkam.net/ng-cast', ['exports', '@angular/core', '@angular/common', 'rxjs', 'videogular2/compiled/src/streaming/vg-dash/vg-dash', 'videogular2/compiled/core', 'videogular2/compiled/controls', 'videogular2/compiled/streaming', 'videogular2/compiled/buffering', 'videogular2/compiled/overlay-play'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.thinkam = global.thinkam || {}, global.thinkam.net = global.thinkam.net || {}, global.thinkam.net['ng-cast'] = {}), global.ng.core, global.ng.common, global.rxjs, global.VgDASH, global.VgCoreModule, global.VgControlsModule, global.VgStreamingModule, global.VgBufferingModule, global.VgOverlayPlayModule));
}(this, (function (exports, core, common, rxjs, vgDash, core$1, controls, streaming, buffering, overlayPlay) { 'use strict';

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
    NgCastService.decorators = [
        { type: core.Injectable }
    ];
    NgCastService.ctorParameters = function () { return []; };

    var ScheduleDto = /** @class */ (function () {
        function ScheduleDto(data) {
            if (data) {
                for (var property in data) {
                    if (data.hasOwnProperty(property)) {
                        this[property] = data[property];
                    }
                }
            }
        }
        ScheduleDto.fromJS = function (data) {
            data = typeof data === 'object' ? data : {};
            var result = new ScheduleDto();
            result.init(data);
            return result;
        };
        ScheduleDto.prototype.init = function (data) {
            if (data) {
                this.id = data['id'];
                this.tenant = data['tenant'];
                this.name = data['name'];
                this.description = data['description'];
                this.url = data['url'];
                this.duration = data['duration'];
                this.actualStart = data['actualStart'];
                this.realEnd = data['realEnd'];
                this.isActive = data['isActive'];
            }
        };
        ScheduleDto.prototype.toJSON = function (data) {
            data = typeof data === 'object' ? data : {};
            data['id'] = this.id;
            data['tenant'] = this.tenant;
            data['name'] = this.name;
            data['description'] = this.description;
            data['url'] = this.url;
            data['duration'] = this.duration;
            data['actualStart'] = this.actualStart;
            data['realEnd'] = this.realEnd;
            data['isActive'] = this.isActive;
            return data;
        };
        return ScheduleDto;
    }());

    var NgCastComponent = /** @class */ (function () {
        function NgCastComponent(ngCastService) {
            this.ngCastService = ngCastService;
            this.videoImage = '';
            this.imageOffline = false;
            this.premium = false;
            this.srcImageOffline = '';
            this.currentStream = {
                type: 'dash',
                label: 'DASH: Media Stream test',
                source: 'http://livesim.dashif.org/livesim/testpic_2s/Manifest.mpd'
            };
            this.api = new core$1.VgAPI();
            this.isDebug = false;
            this.streams = [
                {
                    type: 'dash',
                    label: 'DASH: Media Stream test',
                    source: 'http://livesim.dashif.org/livesim/testpic_2s/Manifest.mpd'
                }
            ];
            this.playlist = [];
            this.play = false;
            this.isHidden = false;
            this.isShow = true;
            this.currentIndex = 0;
            this.video = new ScheduleDto();
            this.appBaseUrl = '';
        }
        NgCastComponent.prototype.ngOnInit = function () {
            this.window = window;
            this.currentStream = this.streams[0];
            var ngCastService = this.ngCastService;
            this.window['__onGCastApiAvailable'] = function (isAvailable) {
                if (isAvailable) {
                    ngCastService.initializeCastApi();
                }
            };
            this.castingStatus = this.ngCastService.getStatus();
        };
        NgCastComponent.prototype.ngAfterViewChecked = function () {
            var _this = this;
            setInterval(function () {
                _this.getPaused();
            }, 500);
        };
        NgCastComponent.prototype.onPlayerReady = function (api) {
            this.api = api;
            this.api.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
        };
        NgCastComponent.prototype.setBitrate = function (option) {
            switch (this.currentStream.type) {
                case 'dash':
                    this.vgDash.setBitrate(option);
                    break;
            }
        };
        NgCastComponent.prototype.nextVideo = function () {
            this.currentIndex++;
            if (this.currentIndex === this.playlist.length) {
                this.currentIndex = 0;
            }
            this.video = this.playlist[this.currentIndex];
        };
        NgCastComponent.prototype.getPaused = function () {
            var _this = this;
            if (this.media && this.media.nativeElement) {
                this.paused = this.media.nativeElement.paused;
                return this.media.nativeElement.paused;
            }
            else {
                setTimeout(function () {
                    return _this.getPaused();
                }, 2000);
            }
        };
        NgCastComponent.prototype.pause = function () {
            this.media.nativeElement.pause();
            this.getPaused();
        };
        NgCastComponent.prototype.openSession = function () {
            this.ngCastService.discoverDevices();
        };
        NgCastComponent.prototype.closeSession = function () {
            this.ngCastService.discoverDevices();
        };
        NgCastComponent.prototype.tryAgain = function () {
            var _this = this;
            this.imageOffline = true;
            this.isHidden = true;
            console.log('loading...');
            setTimeout(function () {
                _this.getVideos();
            }, 500);
        };
        NgCastComponent.prototype.getVideos = function () {
            if (this.playlist && this.playlist.length > 0) {
                this.imageOffline = false;
                this.video = this.playlist[this.currentIndex];
                this.getPosition(this.video);
            }
            else {
                this.video = new ScheduleDto();
                this.tryAgain();
            }
        };
        NgCastComponent.prototype.getPosition = function (result) {
            var _this = this;
            setTimeout(function () {
                var vid = document.getElementById('video_element');
                vid.load();
                var now = new Date();
                var currentTime = Math.abs(now.getTime() - new Date(_this.video.actualStart).getTime());
                console.log('Temos no player: ' + result.url);
                console.log('Início em: ' + currentTime);
                _this.video.url = result.url;
                vid['currentTime'] = currentTime / 1000;
                var promise = vid.play();
                if (promise !== undefined) {
                    promise.then(function (_) {
                        // Autoplay started!
                        console.log('Estamos ao vivo!');
                    }).catch(function () {
                        // Autoplay was prevented.
                        // Show a "Play" button so that user can start playback.
                        _this.play = true;
                    });
                }
            }, 1000);
        };
        NgCastComponent.prototype.getMuted = function () {
            return this.media && this.media.nativeElement && this.media.nativeElement.muted || false;
        };
        NgCastComponent.prototype.getMaximized = function () {
            return this.api && this.api.fsAPI && this.api.fsAPI.isFullscreen && this.api.fsAPI.isFullscreen || false;
        };
        NgCastComponent.prototype.toggleSound = function () {
            this.media.nativeElement.muted = !this.media.nativeElement.muted;
        };
        NgCastComponent.prototype.toggleMaximize = function () {
            this.api.fsAPI.toggleFullscreen(this.media);
        };
        NgCastComponent.prototype.showVideoControls = function () {
            this.isHidden = false;
            this.isShow = true;
        };
        NgCastComponent.prototype.hideVideoControls = function () {
            this.isHidden = true;
            this.isShow = false;
        };
        return NgCastComponent;
    }());
    NgCastComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ng-cast',
                    template: "<div *ngIf=\"!imageOffline && !premium\">\n    <div id=\"main_video\">\n        <vg-player *ngIf=\"!imageOffline\" [style.height.px]=\"815\" (onPlayerReady)=\"onPlayerReady($event)\"\n            (mousemove)=\"showVideoControls()\" (mouseleave)=\"hideVideoControls()\" (mousestop)=\"hideVideoControls()\">\n            <vg-overlay-play></vg-overlay-play>\n            <video muted autoplay #media [vgMedia]=\"media\" [vgDash]=\"video.url\" crossorigin id=\"video_element\">\n            </video>\n            <div id=\"media_control\" class=\"video-controls\">\n                <google-cast-launcher id=\"castbutton\"></google-cast-launcher>\n                <div id=\"audio_bg\"></div>\n                <div id=\"audio_bg_track\"></div>\n                <div id=\"audio_indicator\"></div>\n                <div id=\"audio_bg_level\"></div>\n                <div id=\"audio_on\"></div>\n                <div id=\"audio_off\"></div>\n            </div>\n            <div *ngIf=\"!imageOffline\" class=\"video-controls\" [ngClass]=\"{\n                  'hidden': isHidden,\n                  'show': isShow\n              }\" id=\"video-controls\">\n                <div class=\"video-progress\">\n                    <progress id=\"progress-bar\" value=\"100\" min=\"0\"></progress>\n                    <input class=\"seek\" id=\"seek\" value=\"99.5\" min=\"0\" type=\"range\" step=\"1\">\n                    <div class=\"seek-tooltip\" id=\"seek-tooltip\">AGORA</div>\n                </div>\n                <div class=\"buttons\">\n                    <button *ngIf=\"!paused\" type=\"button\" class=\"video-control video-control-paused\" (click)=\"pause()\">\n                        <i class=\"pi pi-pause\"></i>\n                    </button>\n                    <button *ngIf=\"paused\" type=\"button\" class=\"video-control video-control-paused\" (click)=\"tryAgain()\">\n                        <i class=\"pi pi-caret-right\"></i>\n                    </button>\n                    <button type=\"button\" class=\"video-control video-control-maximized\" (click)=\"toggleMaximize()\">\n                        <i *ngIf=\"getMaximized()\" class=\"pi pi-window-minimize\"></i>\n                        <i *ngIf=\"!getMaximized()\" class=\"pi pi-window-maximize\"></i>\n                    </button>\n                </div>\n            </div>\n        </vg-player>\n        <img width=\"100%\" *ngIf=\"imageOffline\" [src]=\"appBaseUrl + '/assets/common/images/tv-offline.jpg'\"\n            alt=\"TV Offline\" />\n    </div>\n</div>\n\n<div *ngIf=\"!imageOffline && premium\" id=\"main_video\">\n    <div class=\"imageSub\">\n        <!-- Put Your Image Width -->\n        <div class=\"blackbg\" id=\"playerstatebg\">IDLE</div>\n        <div class=label id=\"playerstate\">IDLE</div>\n        <img [src]=\"videoImage\" id=\"video_image\">\n        <div id=\"video_image_overlay\"></div>\n        <video id=\"video_element\">\n        </video>\n    </div>\n\n    <div id=\"media_control\">\n        <div id=\"play\"></div>\n        <div id=\"pause\"></div>\n        <div id=\"progress_bg\"></div>\n        <div id=\"progress\"></div>\n        <div id=\"progress_indicator\"></div>\n        <div id=\"fullscreen_expand\"></div>\n        <div id=\"fullscreen_collapse\"></div>\n        <google-cast-launcher id=\"castbutton\"></google-cast-launcher>\n        <div id=\"audio_bg\"></div>\n        <div id=\"audio_bg_track\"></div>\n        <div id=\"audio_indicator\"></div>\n        <div id=\"audio_bg_level\"></div>\n        <div id=\"audio_on\"></div>\n        <div id=\"audio_off\"></div>\n        <div id=\"duration\">00:00:00</div>\n    </div>\n</div>\n<div *ngIf=\"!imageOffline\" id=\"media_info\">\n    <div id=\"media_title\">\n    </div>\n    <div id=\"media_subtitle\">\n    </div>\n    <div id=\"media_desc\">\n        <div id=\"duration\">00:00:00</div>\n        <div id=\"progress_bg\"></div>\n        <div id=\"progress\"></div>\n        <div id=\"progress_indicator\"></div>\n    </div>\n</div>\n\n<div *ngIf=\"!imageOffline\" id=\"carousel\">\n</div>\n\n<img width=\"100%\" *ngIf=\"imageOffline\" [src]=\"srcImageOffline\" alt=\"TV Offline\" />",
                    styles: ["#main_video{background-color:#272c34;margin:0 auto;z-index:-1}#main_video vg-scrub-bar-current-time .background{background-color:red}#main_video .hidden{display:none}#main_video .show{display:block}#main_video .video-controls{background:rgba(0,0,0,.5);bottom:0;height:50px;left:0;position:absolute;right:0;transition:all .2s ease}#main_video .video-controls.hide{opacity:0;pointer-events:none}#main_video .video-progress{align-items:right;height:8.4px;position:relative}#main_video .video-progress #seek-tooltip{position:absolute}@media screen and (-webkit-min-device-pixel-ratio:0){#main_video .video-progress input[type=range]{-webkit-appearance:none;background-color:var(--youtube-red);overflow:hidden}#main_video .video-progress input[type=range]::-webkit-slider-runnable-track{-webkit-appearance:none;color:var(--youtube-red);height:10px;margin-top:-1px}#main_video .video-progress input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;background:var(--youtube-red);cursor:ew-resize;height:10px;width:10px}}#main_video .video-progress input[type=range]{background-color:var(--youtube-red)}#main_video .video-progress input[type=range]::-moz-range-progress,#main_video .video-progress input[type=range]::-moz-range-track{background-color:var(--youtube-red)}#main_video .video-progress input[type=range]::-ms-fill-lower,#main_video .video-progress input[type=range]::-ms-fill-upper{background-color:var(--youtube-red)}#main_video progress{-moz-appearance:none;-webkit-appearance:none;appearance:none;border-radius:2px;height:.5vh;pointer-events:none;position:absolute;top:0;width:100%}#main_video .buttons .video-control{align-items:center;background:none;border:2px solid #fff;border-radius:16px;color:#fff;display:flex;height:32px;justify-content:center;width:32px}#main_video .buttons .video-control i{color:#fff;line-height:16px}#main_video .buttons .video-control-paused{bottom:8px;left:1vw;position:absolute;z-index:1000}#main_video .buttons .video-control-muted{bottom:8px;position:absolute;right:5vw;z-index:1000}#main_video .buttons .video-control-maximized{bottom:8px;position:absolute;right:1vw;z-index:1000}#main_video progress::-webkit-progress-bar{background-color:var(--youtube-red);border-radius:2px}#main_video progress::-webkit-progress-value{background:#fff;border-radius:2px}#main_video progress::-moz-progress-bar{background:#fff;border:1px solid #fff}#main_video .seek{cursor:pointer;height:.5vh;margin:0;position:absolute;top:0;width:100%}#main_video .seek-tooltip{background-color:var(--youtube-red);color:#fff;content:attr(data-title);display:block;font-size:12px;font-weight:700;margin-left:5vw;padding:3px;position:absolute;top:10px}.playlist-item li{color:#fff}.kt-content.kt-grid__item.kt-grid__item--fluid.kt-grid.kt-grid--hor{background-color:#272c34}#kt_header_menu_wrapper{display:none}.kt-header__bottom{display:none!important}.player-wrapper{margin:auto;max-width:500px}.player-wrapper video{width:100%}ul{padding:0}ul li.playlist-item{background:#673ab7;cursor:pointer;list-style:none;margin-bottom:2px;padding:10px}ul li.playlist-item.selected{background-color:#ccc}body{background-color:#f2f2f2;font-family:Roboto,OpenSans,Verdana,Georgia,Serif}#msg{-webkit-transition:opacity 0 2s;color:#fff;display:none;font-size:90%;font-weight:400;margin-left:200px;transition:opacity 0 2s}#top_header_bar{background-image:url(/assets/imagefiles/header_bg-top.png);background-repeat:repeat-x;height:10px;margin:0;width:100%}#top_header{background-image:url(/assets/imagefiles/header_bg.png);height:71px;z-index:1000}#footer,#top_header{background-repeat:repeat-x;float:left;margin:0;width:100%}#footer{background-image:url(/assets/imagefiles/footer_bg.png);height:81px}#copyright{width:300px}#copyright,#footer_content{color:#fff;float:left;font-size:13px;margin:10px}#footer_content{width:400px}#footer_content_link{color:#fff}#footer_language{color:#fff;float:right;font-size:13px;margin:10px;width:200px}#logo{background-image:url(/assets/imagefiles/logo.png);float:left;height:71px;margin:10px 25px 0;width:201px}.header_tab{-moz-transition:all .6s ease-in-out;-o-transition:all .6s ease-in-out;-webkit-transition:all .6s ease-in-out;float:left;font-family:Roboto,OpenSans;font-size:20px;font-weight:700;height:31px;margin-top:10px;padding:20px}#title_text{text-align:center;width:100%}#main_video{float:left;width:100%}#video_image{height:536px;margin-bottom:0;margin-right:auto;margin-top:20px;width:100%}#video_image_overlay{background:linear-gradient(0deg,rgba(0,0,0,.9),transparent 72%,transparent);display:none;height:540px;margin-bottom:0;margin-right:0;margin-top:0;position:absolute;width:100%;z-index:0}#media_info{background-color:#dde0e5;clear:both;color:#000;display:block;float:left;height:116px;margin-top:10px;opacity:.9;padding:10px;width:100%}#media_title{font-size:30px;font-weight:700;margin:0 10px 0 0}#media_subtitle,#media_title{float:left;font-family:Roboto,Open Sans,Verdana,Georgia,Serif;padding:0}#media_subtitle{font-size:18px;margin:13px 0 0 30px}#media_desc{float:left;font-size:12px;margin:5px}#media_control,#media_desc{font-family:Roboto,Open Sans,Verdana,Georgia,Serif;width:100%}#media_control{-webkit-transition:opacity 1s;background-color:#000;height:60px;margin-bottom:8px;opacity:.7;padding:0;position:absolute;transition:opacity 1s;z-index:1000}#media_control:hover{opacity:.7}#play{background-image:url(/assets/imagefiles/play.png);float:left;height:40px;margin:10px 20px 10px 10px;width:65px}#play:hover{background-image:url(/assets/imagefiles/play-hover.png)}#play:press{background-image:url(/assets/imagefiles/play-press.png)}#pause{background-image:url(/assets/imagefiles/pause.png);display:none;float:left;height:40px;margin:10px 20px 10px 10px;width:65px}#pause:hover{background-image:url(/assets/imagefiles/pause-hover.png)}.button{font-family:Roboto,Open Sans,Verdana,Georgia,Serif;font-size:100%;margin:5px}.volume{margin-left:8px;width:60px}#muteText{margin-left:3px;width:30px}.muteButton{font-family:Roboto,Open Sans,Verdana,Georgia,Serif;font-size:110%}.imageIcon{padding:3px 0 0;width:25px}#media_desc{pointer-events:none}#progress{background-color:#27e7b9;cursor:pointer;float:left;height:10px;margin:20px 0 10px -620px;width:1px;z-index:10}#progress_indicator{background-color:var(--youtube-red);cursor:pointer;float:left;height:18px;margin:16px 0 10px -620px;width:6px;z-index:1000}#progress_bg{background-color:#fff;background-repeat:repeat-x;cursor:pointer;float:left;height:10px;margin:20px 20px 10px 0;width:600px}#castbutton{background-color:#000;border:none;float:right;height:32px;margin:15px 6px 14px 0;opacity:.7;outline:none;position:absolute;right:110px;width:40px}#castbutton:hover{--connected-color:#fff;--disconnected-color:#fff}#audio_off{background-image:url(/assets/imagefiles/audio_off.png);display:none}#audio_off,#audio_on{float:right;height:32px;margin:15px 4px 10px 0;position:absolute;right:60px;width:32px}#audio_on{background-image:url(/assets/imagefiles/audio_on.png);display:block}#audio_bg{background-image:url(/assets/imagefiles/audio_bg.png);height:124px;margin:-115px 8px -10px 0;opacity:.1;width:41px;z-index:10}#audio_bg,#audio_bg_track{display:block;float:right;position:absolute;right:60px}#audio_bg_track{background-image:url(/assets/imagefiles/audio_bg_track.png);height:100px;margin:-100px 20px -30px 0;opacity:0;width:16px;z-index:1000}#audio_indicator{background-image:url(/assets/imagefiles/audio_indicator.png);display:none;height:5px}#audio_bg_level,#audio_indicator{float:right;margin:-50px 20px -30px 0;opacity:0;position:absolute;right:60px;width:16px;z-index:1000}#audio_bg_level{background-image:url(/assets/imagefiles/audio_bg_level.png);display:block;height:50px}#fullscreen_expand{background-image:url(/assets/imagefiles/fullscreen_expand.png);display:block}#fullscreen_collapse,#fullscreen_expand{cursor:pointer;float:right;height:32px;margin:10px 20px 10px 0;width:32px}#fullscreen_collapse{background-image:url(/assets/imagefiles/fullscreen_collapse.png);display:none}#duration{color:#fff;display:block;float:right;height:32px;margin:18px 15px 10px;width:60px}div.imageSub{position:relative}div.imageSub img{z-index:1}div.imageSub div{bottom:0;left:0;padding:0;position:absolute;right:0}div.imageSub div.blackbg{-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)\";background-color:#000;color:#000;filter:alpha(opacity=50);opacity:.5;z-index:2000}div.imageSub div.blackbg,div.imageSub div.label{bottom:60px;display:none;font-size:120%;height:30px;left:300px;padding:10px;width:400px}div.imageSub div.label{color:#fff;z-index:3000}#carousel{margin:20px 10px 10px 40px;width:990px}.thumb{cursor:pointer;float:left;margin:10px 10px 10px 0}.thumbnail{height:127px;margin-right:10px;width:225px}.vertical{-webkit-transform:rotate(90deg)}"]
                },] }
    ];
    NgCastComponent.ctorParameters = function () { return [
        { type: NgCastService }
    ]; };
    NgCastComponent.propDecorators = {
        vgDash: [{ type: core.ViewChild, args: [vgDash.VgDASH, { static: false },] }],
        media: [{ type: core.ViewChild, args: ['media', { static: false },] }],
        videoImage: [{ type: core.Input }],
        imageOffline: [{ type: core.Input }],
        premium: [{ type: core.Input }],
        srcImageOffline: [{ type: core.Input }],
        currentStream: [{ type: core.Input }],
        isDebug: [{ type: core.Input }],
        paused: [{ type: core.Input }],
        streams: [{ type: core.Input }],
        playlist: [{ type: core.Input }],
        play: [{ type: core.Input }],
        isHidden: [{ type: core.Input }],
        isShow: [{ type: core.Input }],
        currentIndex: [{ type: core.Input }],
        video: [{ type: core.Input }],
        appBaseUrl: [{ type: core.Input }]
    };

    var NgCastModule = /** @class */ (function () {
        function NgCastModule() {
        }
        return NgCastModule;
    }());
    NgCastModule.decorators = [
        { type: core.NgModule, args: [{
                    schemas: [core.CUSTOM_ELEMENTS_SCHEMA],
                    imports: [
                        common.CommonModule,
                        core$1.VgCoreModule,
                        controls.VgControlsModule,
                        streaming.VgStreamingModule,
                        buffering.VgBufferingModule,
                        overlayPlay.VgOverlayPlayModule,
                    ],
                    exports: [NgCastComponent],
                    providers: [NgCastService],
                    declarations: [NgCastComponent]
                },] }
    ];

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
            var play = document.getElementById('play');
            if (play && play.style && play.style.display)
                play.style.display = 'none';
            var pause = document.getElementById('pause');
            if (pause && pause.style && pause.style.display)
                pause.style.display = 'block';
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
        // document.getElementById('media_desc').innerHTML =
        //   castPlayer.mediaContents[castPlayer.currentMediaIndex]['description'];
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
        var fullscreen_expand = document.getElementById('fullscreen_expand');
        if (fullscreen_expand) {
            fullscreen_expand.addEventListener('click', castPlayer.requestFullScreen.bind(castPlayer));
        }
        var fullscreen_collapse = document.getElementById('fullscreen_collapse');
        if (fullscreen_collapse) {
            fullscreen_collapse.addEventListener('click', castPlayer.cancelFullScreen.bind(castPlayer));
        }
        document.addEventListener('fullscreenchange', castPlayer.fullscreenChangeHandler.bind(castPlayer), false);
        document.addEventListener('webkitfullscreenchange', castPlayer.fullscreenChangeHandler.bind(castPlayer), false);
        // Enable play/pause buttons
        // document.getElementById('play').addEventListener(
        //   'click', castPlayer.playerHandler.play.bind(castPlayer.playerHandler));
        // document.getElementById('pause').addEventListener(
        //   'click', castPlayer.playerHandler.pause.bind(castPlayer.playerHandler));
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

    exports.NgCastModule = NgCastModule;
    exports.NgCastService = NgCastService;
    exports.ɵa = NgCastComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=thinkam.net-ng-cast.umd.js.map
