import { Component, Input, ViewChild } from '@angular/core';
import { NgCastService } from './shared/ng-cast.service';
import { VgDASH } from 'videogular2/compiled/src/streaming/vg-dash/vg-dash';
import { VgAPI } from 'videogular2/compiled/core';
import { ScheduleDto } from './dto/schedule-dto';
export class NgCastComponent {
    constructor(ngCastService) {
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
        this.api = new VgAPI();
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
    ngOnInit() {
        this.window = window;
        this.currentStream = this.streams[0];
        let ngCastService = this.ngCastService;
        this.window['__onGCastApiAvailable'] = function (isAvailable) {
            if (isAvailable) {
                ngCastService.initializeCastApi();
            }
        };
        this.castingStatus = this.ngCastService.getStatus();
    }
    ngAfterViewChecked() {
        setInterval(() => {
            this.getPaused();
        }, 500);
    }
    onPlayerReady(api) {
        this.api = api;
        this.api.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
    }
    setBitrate(option) {
        switch (this.currentStream.type) {
            case 'dash':
                this.vgDash.setBitrate(option);
                break;
        }
    }
    nextVideo() {
        this.currentIndex++;
        if (this.currentIndex === this.playlist.length) {
            this.currentIndex = 0;
        }
        this.video = this.playlist[this.currentIndex];
    }
    getPaused() {
        if (this.media && this.media.nativeElement) {
            this.paused = this.media.nativeElement.paused;
            return this.media.nativeElement.paused;
        }
        else {
            setTimeout(() => {
                return this.getPaused();
            }, 2000);
        }
    }
    pause() {
        this.media.nativeElement.pause();
        this.getPaused();
    }
    openSession() {
        this.ngCastService.discoverDevices();
    }
    closeSession() {
        this.ngCastService.discoverDevices();
    }
    tryAgain() {
        this.imageOffline = true;
        this.isHidden = true;
        console.log('loading...');
        setTimeout(() => {
            this.getVideos();
        }, 500);
    }
    getVideos() {
        if (this.playlist && this.playlist.length > 0) {
            this.imageOffline = false;
            this.video = this.playlist[this.currentIndex];
            this.getPosition(this.video);
        }
        else {
            this.video = new ScheduleDto();
            this.tryAgain();
        }
    }
    getPosition(result) {
        setTimeout(() => {
            let vid = document.getElementById('video_element');
            vid.load();
            const now = new Date();
            const currentTime = Math.abs(now.getTime() - new Date(this.video.actualStart).getTime());
            console.log('Temos no player: ' + result.url);
            console.log('Início em: ' + currentTime);
            this.video.url = result.url;
            vid['currentTime'] = currentTime / 1000;
            let promise = vid.play();
            if (promise !== undefined) {
                promise.then((_) => {
                    // Autoplay started!
                    console.log('Estamos ao vivo!');
                }).catch(() => {
                    // Autoplay was prevented.
                    // Show a "Play" button so that user can start playback.
                    this.play = true;
                });
            }
        }, 1000);
    }
    getMuted() {
        return this.media && this.media.nativeElement && this.media.nativeElement.muted || false;
    }
    getMaximized() {
        return this.api && this.api.fsAPI && this.api.fsAPI.isFullscreen && this.api.fsAPI.isFullscreen || false;
    }
    toggleSound() {
        this.media.nativeElement.muted = !this.media.nativeElement.muted;
    }
    toggleMaximize() {
        this.api.fsAPI.toggleFullscreen(this.media);
    }
    showVideoControls() {
        this.isHidden = false;
        this.isShow = true;
    }
    hideVideoControls() {
        this.isHidden = true;
        this.isShow = false;
    }
}
NgCastComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-cast',
                template: "<div *ngIf=\"!imageOffline && !premium\">\n    <div id=\"main_video\">\n        <vg-player *ngIf=\"!imageOffline\" [style.height.px]=\"815\" (onPlayerReady)=\"onPlayerReady($event)\"\n            (mousemove)=\"showVideoControls()\" (mouseleave)=\"hideVideoControls()\" (mousestop)=\"hideVideoControls()\">\n            <vg-overlay-play></vg-overlay-play>\n            <video muted autoplay #media [vgMedia]=\"media\" [vgDash]=\"video.url\" crossorigin id=\"video_element\">\n            </video>\n            <div id=\"media_control\" class=\"video-controls\">\n                <google-cast-launcher id=\"castbutton\"></google-cast-launcher>\n                <div id=\"audio_bg\"></div>\n                <div id=\"audio_bg_track\"></div>\n                <div id=\"audio_indicator\"></div>\n                <div id=\"audio_bg_level\"></div>\n                <div id=\"audio_on\"></div>\n                <div id=\"audio_off\"></div>\n            </div>\n            <div *ngIf=\"!imageOffline\" class=\"video-controls\" [ngClass]=\"{\n                  'hidden': isHidden,\n                  'show': isShow\n              }\" id=\"video-controls\">\n                <div class=\"video-progress\">\n                    <progress id=\"progress-bar\" value=\"100\" min=\"0\"></progress>\n                    <input class=\"seek\" id=\"seek\" value=\"99.5\" min=\"0\" type=\"range\" step=\"1\">\n                    <div class=\"seek-tooltip\" id=\"seek-tooltip\">AGORA</div>\n                </div>\n                <div class=\"buttons\">\n                    <button *ngIf=\"!paused\" type=\"button\" class=\"video-control video-control-paused\" (click)=\"pause()\">\n                        <i class=\"pi pi-pause\"></i>\n                    </button>\n                    <button *ngIf=\"paused\" type=\"button\" class=\"video-control video-control-paused\" (click)=\"tryAgain()\">\n                        <i class=\"pi pi-caret-right\"></i>\n                    </button>\n                    <button type=\"button\" class=\"video-control video-control-maximized\" (click)=\"toggleMaximize()\">\n                        <i *ngIf=\"getMaximized()\" class=\"pi pi-window-minimize\"></i>\n                        <i *ngIf=\"!getMaximized()\" class=\"pi pi-window-maximize\"></i>\n                    </button>\n                </div>\n            </div>\n        </vg-player>\n        <img width=\"100%\" *ngIf=\"imageOffline\" [src]=\"appBaseUrl + '/assets/common/images/tv-offline.jpg'\"\n            alt=\"TV Offline\" />\n    </div>\n</div>\n\n<div *ngIf=\"!imageOffline && premium\" id=\"main_video\">\n    <div class=\"imageSub\">\n        <!-- Put Your Image Width -->\n        <div class=\"blackbg\" id=\"playerstatebg\">IDLE</div>\n        <div class=label id=\"playerstate\">IDLE</div>\n        <img [src]=\"videoImage\" id=\"video_image\">\n        <div id=\"video_image_overlay\"></div>\n        <video id=\"video_element\">\n        </video>\n    </div>\n\n    <div id=\"media_control\">\n        <div id=\"play\"></div>\n        <div id=\"pause\"></div>\n        <div id=\"progress_bg\"></div>\n        <div id=\"progress\"></div>\n        <div id=\"progress_indicator\"></div>\n        <div id=\"fullscreen_expand\"></div>\n        <div id=\"fullscreen_collapse\"></div>\n        <google-cast-launcher id=\"castbutton\"></google-cast-launcher>\n        <div id=\"audio_bg\"></div>\n        <div id=\"audio_bg_track\"></div>\n        <div id=\"audio_indicator\"></div>\n        <div id=\"audio_bg_level\"></div>\n        <div id=\"audio_on\"></div>\n        <div id=\"audio_off\"></div>\n        <div id=\"duration\">00:00:00</div>\n    </div>\n</div>\n<div *ngIf=\"!imageOffline\" id=\"media_info\">\n    <div id=\"media_title\">\n    </div>\n    <div id=\"media_subtitle\">\n    </div>\n    <div id=\"media_desc\">\n        <div id=\"duration\">00:00:00</div>\n        <div id=\"progress_bg\"></div>\n        <div id=\"progress\"></div>\n        <div id=\"progress_indicator\"></div>\n    </div>\n</div>\n\n<div *ngIf=\"!imageOffline\" id=\"carousel\">\n</div>\n\n<img width=\"100%\" *ngIf=\"imageOffline\" [src]=\"srcImageOffline\" alt=\"TV Offline\" />",
                styles: ["#main_video{background-color:#272c34;margin:0 auto;z-index:-1}#main_video vg-scrub-bar-current-time .background{background-color:red}#main_video .hidden{display:none}#main_video .show{display:block}#main_video .video-controls{background:rgba(0,0,0,.5);bottom:0;height:50px;left:0;position:absolute;right:0;transition:all .2s ease}#main_video .video-controls.hide{opacity:0;pointer-events:none}#main_video .video-progress{align-items:right;height:8.4px;position:relative}#main_video .video-progress #seek-tooltip{position:absolute}@media screen and (-webkit-min-device-pixel-ratio:0){#main_video .video-progress input[type=range]{-webkit-appearance:none;background-color:var(--youtube-red);overflow:hidden}#main_video .video-progress input[type=range]::-webkit-slider-runnable-track{-webkit-appearance:none;color:var(--youtube-red);height:10px;margin-top:-1px}#main_video .video-progress input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;background:var(--youtube-red);cursor:ew-resize;height:10px;width:10px}}#main_video .video-progress input[type=range]{background-color:var(--youtube-red)}#main_video .video-progress input[type=range]::-moz-range-progress,#main_video .video-progress input[type=range]::-moz-range-track{background-color:var(--youtube-red)}#main_video .video-progress input[type=range]::-ms-fill-lower,#main_video .video-progress input[type=range]::-ms-fill-upper{background-color:var(--youtube-red)}#main_video progress{-moz-appearance:none;-webkit-appearance:none;appearance:none;border-radius:2px;height:.5vh;pointer-events:none;position:absolute;top:0;width:100%}#main_video .buttons .video-control{align-items:center;background:none;border:2px solid #fff;border-radius:16px;color:#fff;display:flex;height:32px;justify-content:center;width:32px}#main_video .buttons .video-control i{color:#fff;line-height:16px}#main_video .buttons .video-control-paused{bottom:8px;left:1vw;position:absolute;z-index:1000}#main_video .buttons .video-control-muted{bottom:8px;position:absolute;right:5vw;z-index:1000}#main_video .buttons .video-control-maximized{bottom:8px;position:absolute;right:1vw;z-index:1000}#main_video progress::-webkit-progress-bar{background-color:var(--youtube-red);border-radius:2px}#main_video progress::-webkit-progress-value{background:#fff;border-radius:2px}#main_video progress::-moz-progress-bar{background:#fff;border:1px solid #fff}#main_video .seek{cursor:pointer;height:.5vh;margin:0;position:absolute;top:0;width:100%}#main_video .seek-tooltip{background-color:var(--youtube-red);color:#fff;content:attr(data-title);display:block;font-size:12px;font-weight:700;margin-left:5vw;padding:3px;position:absolute;top:10px}.playlist-item li{color:#fff}.kt-content.kt-grid__item.kt-grid__item--fluid.kt-grid.kt-grid--hor{background-color:#272c34}#kt_header_menu_wrapper{display:none}.kt-header__bottom{display:none!important}.player-wrapper{margin:auto;max-width:500px}.player-wrapper video{width:100%}ul{padding:0}ul li.playlist-item{background:#673ab7;cursor:pointer;list-style:none;margin-bottom:2px;padding:10px}ul li.playlist-item.selected{background-color:#ccc}body{background-color:#f2f2f2;font-family:Roboto,OpenSans,Verdana,Georgia,Serif}#msg{-webkit-transition:opacity 0 2s;color:#fff;display:none;font-size:90%;font-weight:400;margin-left:200px;transition:opacity 0 2s}#top_header_bar{background-image:url(/assets/imagefiles/header_bg-top.png);background-repeat:repeat-x;height:10px;margin:0;width:100%}#top_header{background-image:url(/assets/imagefiles/header_bg.png);height:71px;z-index:1000}#footer,#top_header{background-repeat:repeat-x;float:left;margin:0;width:100%}#footer{background-image:url(/assets/imagefiles/footer_bg.png);height:81px}#copyright{width:300px}#copyright,#footer_content{color:#fff;float:left;font-size:13px;margin:10px}#footer_content{width:400px}#footer_content_link{color:#fff}#footer_language{color:#fff;float:right;font-size:13px;margin:10px;width:200px}#logo{background-image:url(/assets/imagefiles/logo.png);float:left;height:71px;margin:10px 25px 0;width:201px}.header_tab{-moz-transition:all .6s ease-in-out;-o-transition:all .6s ease-in-out;-webkit-transition:all .6s ease-in-out;float:left;font-family:Roboto,OpenSans;font-size:20px;font-weight:700;height:31px;margin-top:10px;padding:20px}#title_text{text-align:center;width:100%}#main_video{float:left;width:100%}#video_image{height:536px;margin-bottom:0;margin-right:auto;margin-top:20px;width:100%}#video_image_overlay{background:linear-gradient(0deg,rgba(0,0,0,.9),transparent 72%,transparent);display:none;height:540px;margin-bottom:0;margin-right:0;margin-top:0;position:absolute;width:100%;z-index:0}#media_info{background-color:#dde0e5;clear:both;color:#000;display:block;float:left;height:116px;margin-top:10px;opacity:.9;padding:10px;width:100%}#media_title{font-size:30px;font-weight:700;margin:0 10px 0 0}#media_subtitle,#media_title{float:left;font-family:Roboto,Open Sans,Verdana,Georgia,Serif;padding:0}#media_subtitle{font-size:18px;margin:13px 0 0 30px}#media_desc{float:left;font-size:12px;margin:5px}#media_control,#media_desc{font-family:Roboto,Open Sans,Verdana,Georgia,Serif;width:100%}#media_control{-webkit-transition:opacity 1s;background-color:#000;height:60px;margin-bottom:8px;opacity:.7;padding:0;position:absolute;transition:opacity 1s;z-index:1000}#media_control:hover{opacity:.7}#play{background-image:url(/assets/imagefiles/play.png);float:left;height:40px;margin:10px 20px 10px 10px;width:65px}#play:hover{background-image:url(/assets/imagefiles/play-hover.png)}#play:press{background-image:url(/assets/imagefiles/play-press.png)}#pause{background-image:url(/assets/imagefiles/pause.png);display:none;float:left;height:40px;margin:10px 20px 10px 10px;width:65px}#pause:hover{background-image:url(/assets/imagefiles/pause-hover.png)}.button{font-family:Roboto,Open Sans,Verdana,Georgia,Serif;font-size:100%;margin:5px}.volume{margin-left:8px;width:60px}#muteText{margin-left:3px;width:30px}.muteButton{font-family:Roboto,Open Sans,Verdana,Georgia,Serif;font-size:110%}.imageIcon{padding:3px 0 0;width:25px}#media_desc{pointer-events:none}#progress{background-color:#27e7b9;cursor:pointer;float:left;height:10px;margin:20px 0 10px -620px;width:1px;z-index:10}#progress_indicator{background-color:var(--youtube-red);cursor:pointer;float:left;height:18px;margin:16px 0 10px -620px;width:6px;z-index:1000}#progress_bg{background-color:#fff;background-repeat:repeat-x;cursor:pointer;float:left;height:10px;margin:20px 20px 10px 0;width:600px}#castbutton{background-color:#000;border:none;float:right;height:32px;margin:15px 6px 14px 0;opacity:.7;outline:none;position:absolute;right:110px;width:40px}#castbutton:hover{--connected-color:#fff;--disconnected-color:#fff}#audio_off{background-image:url(/assets/imagefiles/audio_off.png);display:none}#audio_off,#audio_on{float:right;height:32px;margin:15px 4px 10px 0;position:absolute;right:60px;width:32px}#audio_on{background-image:url(/assets/imagefiles/audio_on.png);display:block}#audio_bg{background-image:url(/assets/imagefiles/audio_bg.png);height:124px;margin:-115px 8px -10px 0;opacity:.1;width:41px;z-index:10}#audio_bg,#audio_bg_track{display:block;float:right;position:absolute;right:60px}#audio_bg_track{background-image:url(/assets/imagefiles/audio_bg_track.png);height:100px;margin:-100px 20px -30px 0;opacity:0;width:16px;z-index:1000}#audio_indicator{background-image:url(/assets/imagefiles/audio_indicator.png);display:none;height:5px}#audio_bg_level,#audio_indicator{float:right;margin:-50px 20px -30px 0;opacity:0;position:absolute;right:60px;width:16px;z-index:1000}#audio_bg_level{background-image:url(/assets/imagefiles/audio_bg_level.png);display:block;height:50px}#fullscreen_expand{background-image:url(/assets/imagefiles/fullscreen_expand.png);display:block}#fullscreen_collapse,#fullscreen_expand{cursor:pointer;float:right;height:32px;margin:10px 20px 10px 0;width:32px}#fullscreen_collapse{background-image:url(/assets/imagefiles/fullscreen_collapse.png);display:none}#duration{color:#fff;display:block;float:right;height:32px;margin:18px 15px 10px;width:60px}div.imageSub{position:relative}div.imageSub img{z-index:1}div.imageSub div{bottom:0;left:0;padding:0;position:absolute;right:0}div.imageSub div.blackbg{-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)\";background-color:#000;color:#000;filter:alpha(opacity=50);opacity:.5;z-index:2000}div.imageSub div.blackbg,div.imageSub div.label{bottom:60px;display:none;font-size:120%;height:30px;left:300px;padding:10px;width:400px}div.imageSub div.label{color:#fff;z-index:3000}#carousel{margin:20px 10px 10px 40px;width:990px}.thumb{cursor:pointer;float:left;margin:10px 10px 10px 0}.thumbnail{height:127px;margin-right:10px;width:225px}.vertical{-webkit-transform:rotate(90deg)}"]
            },] }
];
NgCastComponent.ctorParameters = () => [
    { type: NgCastService }
];
NgCastComponent.propDecorators = {
    vgDash: [{ type: ViewChild, args: [VgDASH, { static: false },] }],
    media: [{ type: ViewChild, args: ['media', { static: false },] }],
    videoImage: [{ type: Input }],
    imageOffline: [{ type: Input }],
    premium: [{ type: Input }],
    srcImageOffline: [{ type: Input }],
    currentStream: [{ type: Input }],
    isDebug: [{ type: Input }],
    paused: [{ type: Input }],
    streams: [{ type: Input }],
    playlist: [{ type: Input }],
    play: [{ type: Input }],
    isHidden: [{ type: Input }],
    isShow: [{ type: Input }],
    currentIndex: [{ type: Input }],
    video: [{ type: Input }],
    appBaseUrl: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY2FzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdGhpbmtlci9kZXYvdGhpbmthbS9uZ0Nhc3QvIiwic291cmNlcyI6WyJuZy1jYXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxTQUFTLEVBQWdDLE1BQU0sZUFBZSxDQUFDO0FBRWxHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUV6RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFFNUUsT0FBTyxFQUFFLEtBQUssRUFBaUIsTUFBTSwyQkFBMkIsQ0FBQztBQUVqRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFpQmpELE1BQU0sT0FBTyxlQUFlO0lBMEMxQixZQUNVLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBcEM3QixlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsb0JBQWUsR0FBRyxFQUFFLENBQUM7UUFFckIsa0JBQWEsR0FBaUI7WUFDckMsSUFBSSxFQUFFLE1BQU07WUFDWixLQUFLLEVBQUUseUJBQXlCO1lBQ2hDLE1BQU0sRUFBRSwyREFBMkQ7U0FDcEUsQ0FBQztRQUVGLFFBQUcsR0FBVSxJQUFJLEtBQUssRUFBRSxDQUFDO1FBRWhCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFJaEIsWUFBTyxHQUFtQjtZQUNqQztnQkFDRSxJQUFJLEVBQUUsTUFBTTtnQkFDWixLQUFLLEVBQUUseUJBQXlCO2dCQUNoQyxNQUFNLEVBQUUsMkRBQTJEO2FBQ3BFO1NBQ0YsQ0FBQztRQUVPLGFBQVEsR0FBdUIsRUFBRSxDQUFDO1FBRWxDLFNBQUksR0FBRyxLQUFLLENBQUM7UUFDYixhQUFRLEdBQUcsS0FBSyxDQUFDO1FB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LEtBQUssQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxpQkFBaUI7UUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQzs7O1lBbk1GLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsU0FBUztnQkFDbkIscWxJQUF1Qzs7YUFJeEM7OztZQXRCUSxhQUFhOzs7cUJBd0JuQixTQUFTLFNBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtvQkFDbkMsU0FBUyxTQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7eUJBS3BDLEtBQUs7MkJBQ0wsS0FBSztzQkFDTCxLQUFLOzhCQUNMLEtBQUs7NEJBRUwsS0FBSztzQkFRTCxLQUFLO3FCQUVMLEtBQUs7c0JBRUwsS0FBSzt1QkFRTCxLQUFLO21CQUVMLEtBQUs7dUJBQ0wsS0FBSztxQkFDTCxLQUFLOzJCQUVMLEtBQUs7b0JBQ0wsS0FBSzt5QkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIEFmdGVyVmlld0NoZWNrZWQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmdDYXN0U2VydmljZSB9IGZyb20gJy4vc2hhcmVkL25nLWNhc3Quc2VydmljZSc7XG5cbmltcG9ydCB7IFZnREFTSCB9IGZyb20gJ3ZpZGVvZ3VsYXIyL2NvbXBpbGVkL3NyYy9zdHJlYW1pbmcvdmctZGFzaC92Zy1kYXNoJztcbmltcG9ydCB7IElEUk1MaWNlbnNlU2VydmVyIH0gZnJvbSAndmlkZW9ndWxhcjIvY29tcGlsZWQvc3JjL3N0cmVhbWluZy9zdHJlYW1pbmcnO1xuaW1wb3J0IHsgVmdBUEksIEJpdHJhdGVPcHRpb24gfSBmcm9tICd2aWRlb2d1bGFyMi9jb21waWxlZC9jb3JlJztcblxuaW1wb3J0IHsgU2NoZWR1bGVEdG8gfSBmcm9tICcuL2R0by9zY2hlZHVsZS1kdG8nO1xuXG5leHBvcnQgaW50ZXJmYWNlIElNZWRpYVN0cmVhbSB7XG4gIHR5cGU6ICd2b2QnIHwgJ2Rhc2gnO1xuICBzb3VyY2U6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcbiAgdG9rZW4/OiBzdHJpbmc7XG4gIGxpY2Vuc2VTZXJ2ZXJzPzogSURSTUxpY2Vuc2VTZXJ2ZXI7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLWNhc3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmctY2FzdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogW1xuICAgICcuL25nLWNhc3QuY29tcG9uZW50LnNjc3MnXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmdDYXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdDaGVja2VkIHtcbiAgQFZpZXdDaGlsZChWZ0RBU0gsIHsgc3RhdGljOiBmYWxzZSB9KSB2Z0Rhc2ghOiBWZ0RBU0g7XG4gIEBWaWV3Q2hpbGQoJ21lZGlhJywgeyBzdGF0aWM6IGZhbHNlIH0pIG1lZGlhITogRWxlbWVudFJlZjxIVE1MVmlkZW9FbGVtZW50PjtcblxuICBjYXN0aW5nU3RhdHVzOiBhbnk7XG4gIHdpbmRvdzogYW55O1xuXG4gIEBJbnB1dCgpIHZpZGVvSW1hZ2UgPSAnJztcbiAgQElucHV0KCkgaW1hZ2VPZmZsaW5lID0gZmFsc2U7XG4gIEBJbnB1dCgpIHByZW1pdW0gPSBmYWxzZTtcbiAgQElucHV0KCkgc3JjSW1hZ2VPZmZsaW5lID0gJyc7XG5cbiAgQElucHV0KCkgY3VycmVudFN0cmVhbTogSU1lZGlhU3RyZWFtID0ge1xuICAgIHR5cGU6ICdkYXNoJyxcbiAgICBsYWJlbDogJ0RBU0g6IE1lZGlhIFN0cmVhbSB0ZXN0JyxcbiAgICBzb3VyY2U6ICdodHRwOi8vbGl2ZXNpbS5kYXNoaWYub3JnL2xpdmVzaW0vdGVzdHBpY18ycy9NYW5pZmVzdC5tcGQnXG4gIH07XG5cbiAgYXBpOiBWZ0FQSSA9IG5ldyBWZ0FQSSgpO1xuXG4gIEBJbnB1dCgpIGlzRGVidWcgPSBmYWxzZTtcblxuICBASW5wdXQoKSBwYXVzZWQhOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHN0cmVhbXM6IElNZWRpYVN0cmVhbVtdID0gW1xuICAgIHtcbiAgICAgIHR5cGU6ICdkYXNoJyxcbiAgICAgIGxhYmVsOiAnREFTSDogTWVkaWEgU3RyZWFtIHRlc3QnLFxuICAgICAgc291cmNlOiAnaHR0cDovL2xpdmVzaW0uZGFzaGlmLm9yZy9saXZlc2ltL3Rlc3RwaWNfMnMvTWFuaWZlc3QubXBkJ1xuICAgIH1cbiAgXTtcblxuICBASW5wdXQoKSBwbGF5bGlzdDogQXJyYXk8U2NoZWR1bGVEdG8+ID0gW107XG5cbiAgQElucHV0KCkgcGxheSA9IGZhbHNlO1xuICBASW5wdXQoKSBpc0hpZGRlbiA9IGZhbHNlO1xuICBASW5wdXQoKSBpc1Nob3cgPSB0cnVlO1xuXG4gIEBJbnB1dCgpIGN1cnJlbnRJbmRleCA9IDA7XG4gIEBJbnB1dCgpIHZpZGVvOiBTY2hlZHVsZUR0byA9IG5ldyBTY2hlZHVsZUR0bygpO1xuICBASW5wdXQoKSBhcHBCYXNlVXJsOiBTdHJpbmcgPSAnJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5nQ2FzdFNlcnZpY2U6IE5nQ2FzdFNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLndpbmRvdyA9IHdpbmRvdztcbiAgICB0aGlzLmN1cnJlbnRTdHJlYW0gPSB0aGlzLnN0cmVhbXNbMF07XG5cbiAgICBsZXQgbmdDYXN0U2VydmljZSA9IHRoaXMubmdDYXN0U2VydmljZTtcbiAgICB0aGlzLndpbmRvd1snX19vbkdDYXN0QXBpQXZhaWxhYmxlJ10gPSBmdW5jdGlvbiAoaXNBdmFpbGFibGU6IGJvb2xlYW4pIHtcbiAgICAgIGlmIChpc0F2YWlsYWJsZSkge1xuICAgICAgICBuZ0Nhc3RTZXJ2aWNlLmluaXRpYWxpemVDYXN0QXBpKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuY2FzdGluZ1N0YXR1cyA9IHRoaXMubmdDYXN0U2VydmljZS5nZXRTdGF0dXMoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHsgXG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgdGhpcy5nZXRQYXVzZWQoKTtcbiAgICB9LCA1MDApO1xuICB9XG5cbiAgb25QbGF5ZXJSZWFkeShhcGk6IFZnQVBJKSB7XG4gICAgdGhpcy5hcGkgPSBhcGk7XG5cbiAgICB0aGlzLmFwaS5nZXREZWZhdWx0TWVkaWEoKS5zdWJzY3JpcHRpb25zLmVuZGVkLnN1YnNjcmliZSh0aGlzLm5leHRWaWRlby5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHNldEJpdHJhdGUob3B0aW9uOiBCaXRyYXRlT3B0aW9uKSB7XG4gICAgc3dpdGNoICh0aGlzLmN1cnJlbnRTdHJlYW0udHlwZSkge1xuICAgICAgY2FzZSAnZGFzaCc6XG4gICAgICAgIHRoaXMudmdEYXNoLnNldEJpdHJhdGUob3B0aW9uKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgbmV4dFZpZGVvKCkge1xuICAgIHRoaXMuY3VycmVudEluZGV4Kys7XG5cbiAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPT09IHRoaXMucGxheWxpc3QubGVuZ3RoKSB7XG4gICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IDA7XG4gICAgfVxuXG4gICAgdGhpcy52aWRlbyA9IHRoaXMucGxheWxpc3RbdGhpcy5jdXJyZW50SW5kZXhdO1xuICB9XG5cbiAgZ2V0UGF1c2VkKCkge1xuICAgIGlmICh0aGlzLm1lZGlhICYmIHRoaXMubWVkaWEubmF0aXZlRWxlbWVudCkge1xuICAgICAgdGhpcy5wYXVzZWQgPSB0aGlzLm1lZGlhLm5hdGl2ZUVsZW1lbnQucGF1c2VkO1xuICAgICAgcmV0dXJuIHRoaXMubWVkaWEubmF0aXZlRWxlbWVudC5wYXVzZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXVzZWQoKTtcbiAgICAgIH0sIDIwMDApO1xuICAgIH1cbiAgfVxuXG4gIHBhdXNlKCk6IHZvaWQge1xuICAgIHRoaXMubWVkaWEubmF0aXZlRWxlbWVudC5wYXVzZSgpO1xuICAgIHRoaXMuZ2V0UGF1c2VkKCk7XG4gIH1cblxuICBvcGVuU2Vzc2lvbigpIHtcbiAgICB0aGlzLm5nQ2FzdFNlcnZpY2UuZGlzY292ZXJEZXZpY2VzKCk7XG4gIH1cblxuICBjbG9zZVNlc3Npb24oKSB7XG4gICAgdGhpcy5uZ0Nhc3RTZXJ2aWNlLmRpc2NvdmVyRGV2aWNlcygpO1xuICB9XG5cbiAgdHJ5QWdhaW4oKSB7XG4gICAgdGhpcy5pbWFnZU9mZmxpbmUgPSB0cnVlO1xuICAgIHRoaXMuaXNIaWRkZW4gPSB0cnVlO1xuICAgIGNvbnNvbGUubG9nKCdsb2FkaW5nLi4uJyk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZ2V0VmlkZW9zKCk7XG4gICAgfSwgNTAwKTtcbiAgfVxuXG4gIGdldFZpZGVvcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wbGF5bGlzdCAmJiB0aGlzLnBsYXlsaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuaW1hZ2VPZmZsaW5lID0gZmFsc2U7XG4gICAgICB0aGlzLnZpZGVvID0gdGhpcy5wbGF5bGlzdFt0aGlzLmN1cnJlbnRJbmRleF07XG5cbiAgICAgIHRoaXMuZ2V0UG9zaXRpb24odGhpcy52aWRlbyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmlkZW8gPSBuZXcgU2NoZWR1bGVEdG8oKTtcbiAgICAgIHRoaXMudHJ5QWdhaW4oKTtcbiAgICB9XG4gIH1cblxuICBnZXRQb3NpdGlvbihyZXN1bHQ6IFNjaGVkdWxlRHRvKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBsZXQgdmlkOiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlkZW9fZWxlbWVudCcpO1xuICAgICAgdmlkLmxvYWQoKTtcblxuICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gTWF0aC5hYnMobm93LmdldFRpbWUoKSAtIG5ldyBEYXRlKHRoaXMudmlkZW8uYWN0dWFsU3RhcnQpLmdldFRpbWUoKSk7XG5cbiAgICAgIGNvbnNvbGUubG9nKCdUZW1vcyBubyBwbGF5ZXI6ICcgKyByZXN1bHQudXJsKTtcbiAgICAgIGNvbnNvbGUubG9nKCdJbsOtY2lvIGVtOiAnICsgY3VycmVudFRpbWUpO1xuXG4gICAgICB0aGlzLnZpZGVvLnVybCA9IHJlc3VsdC51cmw7XG4gICAgICB2aWRbJ2N1cnJlbnRUaW1lJ10gPSBjdXJyZW50VGltZSAvIDEwMDA7XG5cbiAgICAgIGxldCBwcm9taXNlID0gdmlkLnBsYXkoKTtcbiAgICAgIGlmIChwcm9taXNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcHJvbWlzZS50aGVuKChfOiBhbnkpID0+IHtcbiAgICAgICAgICAvLyBBdXRvcGxheSBzdGFydGVkIVxuICAgICAgICAgIGNvbnNvbGUubG9nKCdFc3RhbW9zIGFvIHZpdm8hJyk7XG4gICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAvLyBBdXRvcGxheSB3YXMgcHJldmVudGVkLlxuICAgICAgICAgIC8vIFNob3cgYSBcIlBsYXlcIiBidXR0b24gc28gdGhhdCB1c2VyIGNhbiBzdGFydCBwbGF5YmFjay5cbiAgICAgICAgICB0aGlzLnBsYXkgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCAxMDAwKTtcbiAgfVxuXG4gIGdldE11dGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm1lZGlhICYmIHRoaXMubWVkaWEubmF0aXZlRWxlbWVudCAmJiB0aGlzLm1lZGlhLm5hdGl2ZUVsZW1lbnQubXV0ZWQgfHwgZmFsc2U7XG4gIH1cblxuICBnZXRNYXhpbWl6ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpICYmIHRoaXMuYXBpLmZzQVBJICYmIHRoaXMuYXBpLmZzQVBJLmlzRnVsbHNjcmVlbiAmJiB0aGlzLmFwaS5mc0FQSS5pc0Z1bGxzY3JlZW4gfHwgZmFsc2U7XG4gIH1cblxuICB0b2dnbGVTb3VuZCgpOiB2b2lkIHtcbiAgICB0aGlzLm1lZGlhLm5hdGl2ZUVsZW1lbnQubXV0ZWQgPSAhdGhpcy5tZWRpYS5uYXRpdmVFbGVtZW50Lm11dGVkO1xuICB9XG5cbiAgdG9nZ2xlTWF4aW1pemUoKTogdm9pZCB7XG4gICAgdGhpcy5hcGkuZnNBUEkudG9nZ2xlRnVsbHNjcmVlbih0aGlzLm1lZGlhKTtcbiAgfVxuXG4gIHNob3dWaWRlb0NvbnRyb2xzKCk6IHZvaWQge1xuICAgIHRoaXMuaXNIaWRkZW4gPSBmYWxzZTtcbiAgICB0aGlzLmlzU2hvdyA9IHRydWU7XG4gIH1cblxuICBoaWRlVmlkZW9Db250cm9scygpOiB2b2lkIHtcbiAgICB0aGlzLmlzSGlkZGVuID0gdHJ1ZTtcbiAgICB0aGlzLmlzU2hvdyA9IGZhbHNlO1xuICB9XG59XG4iXX0=