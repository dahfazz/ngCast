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
        this.paused = false;
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
                template: "<div *ngIf=\"!imageOffline && !premium\">\n  <div\n      id=\"video-container\">\n      <vg-player\n          *ngIf=\"!imageOffline\"\n          [style.height.px]=\"815\"\n          (onPlayerReady)=\"onPlayerReady($event)\"\n          (mousemove)=\"showVideoControls()\"\n          (mouseleave)=\"hideVideoControls()\"\n          (mousestop)=\"hideVideoControls()\">\n          <vg-overlay-play></vg-overlay-play>\n          <video muted autoplay #media [vgMedia]=\"media\" [vgDash]=\"video.url\" crossorigin id=\"myVideo\">\n          </video>\n          <div\n              *ngIf=\"!imageOffline\"\n              class=\"video-controls\"\n              [ngClass]=\"{\n                  'hidden': isHidden,\n                  'show': isShow\n              }\"\n              id=\"video-controls\">\n              <div class=\"video-progress\">\n                  <progress id=\"progress-bar\" value=\"100\" min=\"0\"></progress>\n                  <input class=\"seek\" id=\"seek\" value=\"99.5\" min=\"0\" type=\"range\" step=\"1\">\n                  <div class=\"seek-tooltip\" id=\"seek-tooltip\">AGORA</div>\n              </div>\n              <div class=\"buttons\">\n                  <button *ngIf=\"!getPaused()\" type=\"button\" class=\"video-control video-control-paused\" (click)=\"pause()\">\n                      <i class=\"pi pi-pause\"></i>\n                  </button>\n                  <button *ngIf=\"getPaused()\" type=\"button\" class=\"video-control video-control-paused\" (click)=\"tryAgain()\">\n                      <i class=\"pi pi-caret-right\"></i>\n                  </button>\n                  <button type=\"button\" class=\"video-control video-control-muted\" (click)=\"toggleSound()\">\n                      <i *ngIf=\"getMuted()\" class=\"pi pi-volume-off\"></i>\n                      <i *ngIf=\"!getMuted()\" class=\"pi pi-volume-up\"></i>\n                  </button>\n                  <button type=\"button\" class=\"video-control video-control-maximized\" (click)=\"toggleMaximize()\">\n                      <i *ngIf=\"getMaximized()\" class=\"pi pi-window-minimize\"></i>\n                      <i *ngIf=\"!getMaximized()\" class=\"pi pi-window-maximize\"></i>\n                  </button>\n              </div>\n          </div>\n      </vg-player>\n      <img width=\"100%\" *ngIf=\"imageOffline\" [src]=\"appBaseUrl + '/assets/common/images/tv-offline.jpg'\"\n      alt=\"TV Offline\" />\n  </div>\n</div>\n\n<div *ngIf=\"!imageOffline && premium\" id=\"main_video\">\n  <div class=\"imageSub\"> <!-- Put Your Image Width -->\n     <div class=\"blackbg\" id=\"playerstatebg\">IDLE</div>\n     <div class=label id=\"playerstate\">IDLE</div>\n     <img [src]=\"videoImage\" id=\"video_image\">\n     <div id=\"video_image_overlay\"></div>\n     <video id=\"video_element\">\n     </video>\n  </div>\n\n  <div id=\"media_control\">\n     <div id=\"play\"></div>\n     <div id=\"pause\"></div>\n     <div id=\"progress_bg\"></div>\n     <div id=\"progress\"></div>\n     <div id=\"progress_indicator\"></div>\n     <div id=\"fullscreen_expand\"></div>\n     <div id=\"fullscreen_collapse\"></div>\n     <google-cast-launcher id=\"castbutton\"></google-cast-launcher>\n     <div id=\"audio_bg\"></div>\n     <div id=\"audio_bg_track\"></div>\n     <div id=\"audio_indicator\"></div>\n     <div id=\"audio_bg_level\"></div>\n     <div id=\"audio_on\"></div>\n     <div id=\"audio_off\"></div>\n     <div id=\"duration\">00:00:00</div>\n  </div>\n</div>\n<div *ngIf=\"!imageOffline\" id=\"media_info\">\n  <div id=\"media_title\">\n  </div>\n  <div id=\"media_subtitle\">\n  </div>\n  <div id=\"media_desc\">\n  </div>\n</div>\n\n<div *ngIf=\"!imageOffline\" id=\"carousel\">\n</div>\n\n<img \n  width=\"100%\" \n  *ngIf=\"imageOffline\" \n  [src]=\"srcImageOffline\"\n  alt=\"TV Offline\"\n/>\n",
                styles: ["#video-container{background-color:#272c34;margin:0 auto;z-index:-1}#video-container vg-scrub-bar-current-time .background{background-color:red}#video-container .hidden{display:none}#video-container .show{display:block}#video-container .video-controls{background:rgba(0,0,0,.5);bottom:0;height:45px;left:0;position:absolute;right:0;transition:all .2s ease}#video-container .video-controls.hide{opacity:0;pointer-events:none}#video-container .video-progress{align-items:right;height:8.4px;position:relative}#video-container .video-progress #seek-tooltip{position:absolute}@media screen and (-webkit-min-device-pixel-ratio:0){#video-container .video-progress input[type=range]{-webkit-appearance:none;background-color:var(--youtube-red);overflow:hidden}#video-container .video-progress input[type=range]::-webkit-slider-runnable-track{-webkit-appearance:none;color:var(--youtube-red);height:10px;margin-top:-1px}#video-container .video-progress input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;background:var(--youtube-red);cursor:ew-resize;height:10px;width:10px}}#video-container .video-progress input[type=range]{background-color:var(--youtube-red)}#video-container .video-progress input[type=range]::-moz-range-progress,#video-container .video-progress input[type=range]::-moz-range-track{background-color:var(--youtube-red)}#video-container .video-progress input[type=range]::-ms-fill-lower,#video-container .video-progress input[type=range]::-ms-fill-upper{background-color:var(--youtube-red)}#video-container progress{-moz-appearance:none;-webkit-appearance:none;appearance:none;border-radius:2px;height:.5vh;pointer-events:none;position:absolute;top:0;width:100%}#video-container .buttons .video-control{align-items:center;background:none;border:2px solid #fff;border-radius:16px;color:#fff;display:flex;height:32px;justify-content:center;width:32px}#video-container .buttons .video-control i{color:#fff;line-height:16px}#video-container .buttons .video-control-paused{bottom:8px;left:1vw;position:absolute;z-index:1000}#video-container .buttons .video-control-muted{bottom:8px;position:absolute;right:5vw;z-index:1000}#video-container .buttons .video-control-maximized{bottom:8px;position:absolute;right:1vw;z-index:1000}#video-container progress::-webkit-progress-bar{background-color:var(--youtube-red);border-radius:2px}#video-container progress::-webkit-progress-value{background:#fff;border-radius:2px}#video-container progress::-moz-progress-bar{background:#fff;border:1px solid #fff}#video-container .seek{cursor:pointer;height:.5vh;margin:0;position:absolute;top:0;width:100%}#video-container .seek-tooltip{background-color:var(--youtube-red);color:#fff;content:attr(data-title);display:block;font-size:12px;font-weight:700;margin-left:5vw;padding:3px;position:absolute;top:10px}.playlist-item li{color:#fff}.kt-content.kt-grid__item.kt-grid__item--fluid.kt-grid.kt-grid--hor{background-color:#272c34}#kt_header_menu_wrapper{display:none}.kt-header__bottom{display:none!important}.player-wrapper{margin:auto;max-width:500px}.player-wrapper video{width:100%}ul{padding:0}ul li.playlist-item{background:#673ab7;cursor:pointer;list-style:none;margin-bottom:2px;padding:10px}ul li.playlist-item.selected{background-color:#ccc}body{background-color:#f2f2f2;font-family:Roboto,OpenSans,Verdana,Georgia,Serif}#msg{-webkit-transition:opacity 0 2s;color:#fff;display:none;font-size:90%;font-weight:400;margin-left:200px;transition:opacity 0 2s}#top_header_bar{background-image:url(/assets/imagefiles/header_bg-top.png);background-repeat:repeat-x;height:10px;margin:0;width:100%}#top_header{background-image:url(/assets/imagefiles/header_bg.png);height:71px;z-index:1000}#footer,#top_header{background-repeat:repeat-x;float:left;margin:0;width:100%}#footer{background-image:url(/assets/imagefiles/footer_bg.png);height:81px}#copyright{width:300px}#copyright,#footer_content{color:#fff;float:left;font-size:13px;margin:10px}#footer_content{width:400px}#footer_content_link{color:#fff}#footer_language{color:#fff;float:right;font-size:13px;margin:10px;width:200px}#logo{background-image:url(/assets/imagefiles/logo.png);float:left;height:71px;margin:10px 25px 0;width:201px}.header_tab{-moz-transition:all .6s ease-in-out;-o-transition:all .6s ease-in-out;-webkit-transition:all .6s ease-in-out;float:left;font-family:Roboto,OpenSans;font-size:20px;font-weight:700;height:31px;margin-top:10px;padding:20px}#title_text{text-align:center;width:100%}#main_video{float:left;width:100%}#video_image{height:536px;margin-bottom:0;margin-right:auto;margin-top:20px;width:100%}#video_image_overlay{background:linear-gradient(0deg,rgba(0,0,0,.9),transparent 72%,transparent);margin-right:0;margin-top:0;position:absolute;z-index:0}#video_element,#video_image_overlay{display:none;height:540px;margin-bottom:0;width:100%}#video_element{background-color:#000;margin-right:auto;margin-top:20px}#media_info{background-color:#dde0e5;clear:both;color:#000;display:block;float:left;height:116px;margin-top:10px;opacity:.9;padding:10px;width:100%}#media_title{font-size:30px;font-weight:700;margin:0 10px 0 0}#media_subtitle,#media_title{float:left;font-family:Roboto,Open Sans,Verdana,Georgia,Serif;padding:0}#media_subtitle{font-size:18px;margin:13px 0 0 30px}#media_desc{float:left;font-size:12px;margin:5px}#media_control,#media_desc{font-family:Roboto,Open Sans,Verdana,Georgia,Serif;width:100%}#media_control{-webkit-transition:opacity 1s;background-color:#000;height:60px;opacity:.7;padding:0;position:absolute;top:595px;transition:opacity 1s;z-index:1000}#media_control:hover{opacity:.7}#play{background-image:url(/assets/imagefiles/play.png);float:left;height:40px;margin:10px 20px 10px 10px;width:65px}#play:hover{background-image:url(/assets/imagefiles/play-hover.png)}#play:press{background-image:url(/assets/imagefiles/play-press.png)}#pause{background-image:url(/assets/imagefiles/pause.png);display:none;float:left;height:40px;margin:10px 20px 10px 10px;width:65px}#pause:hover{background-image:url(/assets/imagefiles/pause-hover.png)}.button{font-family:Roboto,Open Sans,Verdana,Georgia,Serif;font-size:100%;margin:5px}.volume{margin-left:8px;width:60px}#muteText{margin-left:3px;width:30px}.muteButton{font-family:Roboto,Open Sans,Verdana,Georgia,Serif;font-size:110%}.imageIcon{padding:3px 0 0;width:25px}#progress{background-image:url(/assets/imagefiles/timeline_bg_progress.png);width:1px;z-index:10}#progress,#progress_indicator{background-repeat:repeat-x;cursor:pointer;float:left;height:36px;margin:20px 0 10px -620px}#progress_indicator{background-image:url(/assets/imagefiles/timeline_indicator.png);width:6px;z-index:1000}#progress_bg{background-image:url(/assets/imagefiles/timeline_bg_track.png);background-repeat:repeat-x;cursor:pointer;float:left;height:36px;margin:20px 20px 10px 0;width:600px}#castbutton{background-color:#000;border:none;float:right;height:32px;margin:10px 6px 14px 0;opacity:.7;outline:none;width:40px}#castbutton:hover{--connected-color:#fff;--disconnected-color:#fff}#audio_off{background-image:url(/assets/imagefiles/audio_off.png);display:none}#audio_off,#audio_on{float:right;height:32px;margin:10px 4px 10px 0;width:32px}#audio_on{background-image:url(/assets/imagefiles/audio_on.png);display:block}#audio_bg{background-image:url(/assets/imagefiles/audio_bg.png);height:124px;margin:-115px 8px -10px 0;opacity:.1;width:41px;z-index:10}#audio_bg,#audio_bg_track{display:block;float:right;position:relative}#audio_bg_track{background-image:url(/assets/imagefiles/audio_bg_track.png);height:100px;margin:-100px 20px -30px 0;opacity:0;width:16px;z-index:1000}#audio_indicator{background-image:url(/assets/imagefiles/audio_indicator.png);display:none;height:5px}#audio_bg_level,#audio_indicator{float:right;margin:-50px 20px -30px 0;opacity:0;position:relative;width:16px;z-index:1000}#audio_bg_level{background-image:url(/assets/imagefiles/audio_bg_level.png);display:block;height:50px}#fullscreen_expand{background-image:url(/assets/imagefiles/fullscreen_expand.png);display:block}#fullscreen_collapse,#fullscreen_expand{cursor:pointer;float:right;height:32px;margin:10px 20px 10px 0;width:32px}#fullscreen_collapse{background-image:url(/assets/imagefiles/fullscreen_collapse.png);display:none}#duration{color:#fff;display:block;float:right;height:32px;margin:18px 15px 10px;width:60px}div.imageSub{position:relative}div.imageSub img{z-index:1}div.imageSub div{bottom:0;left:0;padding:0;position:absolute;right:0}div.imageSub div.blackbg{-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)\";background-color:#000;color:#000;filter:alpha(opacity=50);opacity:.5;z-index:2000}div.imageSub div.blackbg,div.imageSub div.label{bottom:60px;display:none;font-size:120%;height:30px;left:300px;padding:10px;width:400px}div.imageSub div.label{color:#fff;z-index:3000}#carousel{margin:20px 10px 10px 40px;width:990px}.thumb{cursor:pointer;float:left;margin:10px 10px 10px 0}.thumbnail{height:127px;margin-right:10px;width:225px}.vertical{-webkit-transform:rotate(90deg)}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY2FzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdGhpbmtlci9kZXYvdGhpbmthbS9uZ0Nhc3QvIiwic291cmNlcyI6WyJuZy1jYXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxTQUFTLEVBQWMsTUFBTSxlQUFlLENBQUM7QUFFaEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXpELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUU1RSxPQUFPLEVBQUUsS0FBSyxFQUFpQixNQUFNLDJCQUEyQixDQUFDO0FBRWpFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQWlCakQsTUFBTSxPQUFPLGVBQWU7SUEwQzFCLFlBQ1UsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFwQzdCLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixvQkFBZSxHQUFHLEVBQUUsQ0FBQztRQUVyQixrQkFBYSxHQUFpQjtZQUNyQyxJQUFJLEVBQUUsTUFBTTtZQUNaLEtBQUssRUFBRSx5QkFBeUI7WUFDaEMsTUFBTSxFQUFFLDJEQUEyRDtTQUNwRSxDQUFDO1FBRUYsUUFBRyxHQUFVLElBQUksS0FBSyxFQUFFLENBQUM7UUFFaEIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUVoQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRWYsWUFBTyxHQUFtQjtZQUNqQztnQkFDRSxJQUFJLEVBQUUsTUFBTTtnQkFDWixLQUFLLEVBQUUseUJBQXlCO2dCQUNoQyxNQUFNLEVBQUUsMkRBQTJEO2FBQ3BFO1NBQ0YsQ0FBQztRQUVPLGFBQVEsR0FBdUIsRUFBRSxDQUFDO1FBRWxDLFNBQUksR0FBRyxLQUFLLENBQUM7UUFD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Q0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxpQkFBaUI7UUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDOzs7WUE3TEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxTQUFTO2dCQUNuQiw0d0hBQXVDOzthQUl4Qzs7O1lBdEJRLGFBQWE7OztxQkF3Qm5CLFNBQVMsU0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO29CQUNuQyxTQUFTLFNBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTt5QkFLcEMsS0FBSzsyQkFDTCxLQUFLO3NCQUNMLEtBQUs7OEJBQ0wsS0FBSzs0QkFFTCxLQUFLO3NCQVFMLEtBQUs7cUJBRUwsS0FBSztzQkFFTCxLQUFLO3VCQVFMLEtBQUs7bUJBRUwsS0FBSzt1QkFDTCxLQUFLO3FCQUNMLEtBQUs7MkJBRUwsS0FBSztvQkFDTCxLQUFLO3lCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Nhc3RTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvbmctY2FzdC5zZXJ2aWNlJztcblxuaW1wb3J0IHsgVmdEQVNIIH0gZnJvbSAndmlkZW9ndWxhcjIvY29tcGlsZWQvc3JjL3N0cmVhbWluZy92Zy1kYXNoL3ZnLWRhc2gnO1xuaW1wb3J0IHsgSURSTUxpY2Vuc2VTZXJ2ZXIgfSBmcm9tICd2aWRlb2d1bGFyMi9jb21waWxlZC9zcmMvc3RyZWFtaW5nL3N0cmVhbWluZyc7XG5pbXBvcnQgeyBWZ0FQSSwgQml0cmF0ZU9wdGlvbiB9IGZyb20gJ3ZpZGVvZ3VsYXIyL2NvbXBpbGVkL2NvcmUnO1xuXG5pbXBvcnQgeyBTY2hlZHVsZUR0byB9IGZyb20gJy4vZHRvL3NjaGVkdWxlLWR0byc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1lZGlhU3RyZWFtIHtcbiAgdHlwZTogJ3ZvZCcgfCAnZGFzaCc7XG4gIHNvdXJjZTogc3RyaW5nO1xuICBsYWJlbDogc3RyaW5nO1xuICB0b2tlbj86IHN0cmluZztcbiAgbGljZW5zZVNlcnZlcnM/OiBJRFJNTGljZW5zZVNlcnZlcjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctY2FzdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZy1jYXN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbXG4gICAgJy4vbmctY2FzdC5jb21wb25lbnQuc2NzcydcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ0Nhc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAVmlld0NoaWxkKFZnREFTSCwgeyBzdGF0aWM6IGZhbHNlIH0pIHZnRGFzaCE6IFZnREFTSDtcbiAgQFZpZXdDaGlsZCgnbWVkaWEnLCB7IHN0YXRpYzogZmFsc2UgfSkgbWVkaWEhOiBFbGVtZW50UmVmPEhUTUxWaWRlb0VsZW1lbnQ+O1xuXG4gIGNhc3RpbmdTdGF0dXM6IGFueTtcbiAgd2luZG93OiBhbnk7XG5cbiAgQElucHV0KCkgdmlkZW9JbWFnZSA9ICcnO1xuICBASW5wdXQoKSBpbWFnZU9mZmxpbmUgPSBmYWxzZTtcbiAgQElucHV0KCkgcHJlbWl1bSA9IGZhbHNlO1xuICBASW5wdXQoKSBzcmNJbWFnZU9mZmxpbmUgPSAnJztcblxuICBASW5wdXQoKSBjdXJyZW50U3RyZWFtOiBJTWVkaWFTdHJlYW0gPSB7XG4gICAgdHlwZTogJ2Rhc2gnLFxuICAgIGxhYmVsOiAnREFTSDogTWVkaWEgU3RyZWFtIHRlc3QnLFxuICAgIHNvdXJjZTogJ2h0dHA6Ly9saXZlc2ltLmRhc2hpZi5vcmcvbGl2ZXNpbS90ZXN0cGljXzJzL01hbmlmZXN0Lm1wZCdcbiAgfTtcblxuICBhcGk6IFZnQVBJID0gbmV3IFZnQVBJKCk7XG5cbiAgQElucHV0KCkgaXNEZWJ1ZyA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIHBhdXNlZCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIHN0cmVhbXM6IElNZWRpYVN0cmVhbVtdID0gW1xuICAgIHtcbiAgICAgIHR5cGU6ICdkYXNoJyxcbiAgICAgIGxhYmVsOiAnREFTSDogTWVkaWEgU3RyZWFtIHRlc3QnLFxuICAgICAgc291cmNlOiAnaHR0cDovL2xpdmVzaW0uZGFzaGlmLm9yZy9saXZlc2ltL3Rlc3RwaWNfMnMvTWFuaWZlc3QubXBkJ1xuICAgIH1cbiAgXTtcblxuICBASW5wdXQoKSBwbGF5bGlzdDogQXJyYXk8U2NoZWR1bGVEdG8+ID0gW107XG5cbiAgQElucHV0KCkgcGxheSA9IGZhbHNlO1xuICBASW5wdXQoKSBpc0hpZGRlbiA9IGZhbHNlO1xuICBASW5wdXQoKSBpc1Nob3cgPSB0cnVlO1xuXG4gIEBJbnB1dCgpIGN1cnJlbnRJbmRleCA9IDA7XG4gIEBJbnB1dCgpIHZpZGVvOiBTY2hlZHVsZUR0byA9IG5ldyBTY2hlZHVsZUR0bygpO1xuICBASW5wdXQoKSBhcHBCYXNlVXJsOiBTdHJpbmcgPSAnJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5nQ2FzdFNlcnZpY2U6IE5nQ2FzdFNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLndpbmRvdyA9IHdpbmRvdztcbiAgICB0aGlzLmN1cnJlbnRTdHJlYW0gPSB0aGlzLnN0cmVhbXNbMF07XG5cbiAgICBsZXQgbmdDYXN0U2VydmljZSA9IHRoaXMubmdDYXN0U2VydmljZTtcbiAgICB0aGlzLndpbmRvd1snX19vbkdDYXN0QXBpQXZhaWxhYmxlJ10gPSBmdW5jdGlvbiAoaXNBdmFpbGFibGU6IGJvb2xlYW4pIHtcbiAgICAgIGlmIChpc0F2YWlsYWJsZSkge1xuICAgICAgICBuZ0Nhc3RTZXJ2aWNlLmluaXRpYWxpemVDYXN0QXBpKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuY2FzdGluZ1N0YXR1cyA9IHRoaXMubmdDYXN0U2VydmljZS5nZXRTdGF0dXMoKTtcbiAgfVxuXG4gIG9uUGxheWVyUmVhZHkoYXBpOiBWZ0FQSSkge1xuICAgIHRoaXMuYXBpID0gYXBpO1xuXG4gICAgdGhpcy5hcGkuZ2V0RGVmYXVsdE1lZGlhKCkuc3Vic2NyaXB0aW9ucy5lbmRlZC5zdWJzY3JpYmUodGhpcy5uZXh0VmlkZW8uYmluZCh0aGlzKSk7XG4gIH1cblxuICBzZXRCaXRyYXRlKG9wdGlvbjogQml0cmF0ZU9wdGlvbikge1xuICAgIHN3aXRjaCAodGhpcy5jdXJyZW50U3RyZWFtLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2Rhc2gnOlxuICAgICAgICB0aGlzLnZnRGFzaC5zZXRCaXRyYXRlKG9wdGlvbik7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIG5leHRWaWRlbygpIHtcbiAgICB0aGlzLmN1cnJlbnRJbmRleCsrO1xuXG4gICAgaWYgKHRoaXMuY3VycmVudEluZGV4ID09PSB0aGlzLnBsYXlsaXN0Lmxlbmd0aCkge1xuICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSAwO1xuICAgIH1cblxuICAgIHRoaXMudmlkZW8gPSB0aGlzLnBsYXlsaXN0W3RoaXMuY3VycmVudEluZGV4XTtcbiAgfVxuXG4gIGdldFBhdXNlZCgpIHtcbiAgICBpZiAodGhpcy5tZWRpYSAmJiB0aGlzLm1lZGlhLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHRoaXMucGF1c2VkID0gdGhpcy5tZWRpYS5uYXRpdmVFbGVtZW50LnBhdXNlZDtcbiAgICAgIHJldHVybiB0aGlzLm1lZGlhLm5hdGl2ZUVsZW1lbnQucGF1c2VkO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGF1c2VkKCk7XG4gICAgICB9LCAyMDAwKTtcbiAgICB9XG4gIH1cblxuICBwYXVzZSgpOiB2b2lkIHtcbiAgICB0aGlzLm1lZGlhLm5hdGl2ZUVsZW1lbnQucGF1c2UoKTtcbiAgICB0aGlzLmdldFBhdXNlZCgpO1xuICB9XG5cbiAgb3BlblNlc3Npb24oKSB7XG4gICAgdGhpcy5uZ0Nhc3RTZXJ2aWNlLmRpc2NvdmVyRGV2aWNlcygpO1xuICB9XG5cbiAgY2xvc2VTZXNzaW9uKCkge1xuICAgIHRoaXMubmdDYXN0U2VydmljZS5kaXNjb3ZlckRldmljZXMoKTtcbiAgfVxuXG4gIHRyeUFnYWluKCkge1xuICAgIHRoaXMuaW1hZ2VPZmZsaW5lID0gdHJ1ZTtcbiAgICB0aGlzLmlzSGlkZGVuID0gdHJ1ZTtcbiAgICBjb25zb2xlLmxvZygnbG9hZGluZy4uLicpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmdldFZpZGVvcygpO1xuICAgIH0sIDUwMCk7XG4gIH1cblxuICBnZXRWaWRlb3MoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGxheWxpc3QgJiYgdGhpcy5wbGF5bGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmltYWdlT2ZmbGluZSA9IGZhbHNlO1xuICAgICAgdGhpcy52aWRlbyA9IHRoaXMucGxheWxpc3RbdGhpcy5jdXJyZW50SW5kZXhdO1xuXG4gICAgICB0aGlzLmdldFBvc2l0aW9uKHRoaXMudmlkZW8pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZpZGVvID0gbmV3IFNjaGVkdWxlRHRvKCk7XG4gICAgICB0aGlzLnRyeUFnYWluKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0UG9zaXRpb24ocmVzdWx0OiBTY2hlZHVsZUR0bykge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgbGV0IHZpZDogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvX2VsZW1lbnQnKTtcbiAgICAgIHZpZC5sb2FkKCk7XG5cbiAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICBjb25zdCBjdXJyZW50VGltZSA9IE1hdGguYWJzKG5vdy5nZXRUaW1lKCkgLSBuZXcgRGF0ZSh0aGlzLnZpZGVvLmFjdHVhbFN0YXJ0KS5nZXRUaW1lKCkpO1xuXG4gICAgICBjb25zb2xlLmxvZygnVGVtb3Mgbm8gcGxheWVyOiAnICsgcmVzdWx0LnVybCk7XG4gICAgICBjb25zb2xlLmxvZygnSW7DrWNpbyBlbTogJyArIGN1cnJlbnRUaW1lKTtcblxuICAgICAgdGhpcy52aWRlby51cmwgPSByZXN1bHQudXJsO1xuICAgICAgdmlkWydjdXJyZW50VGltZSddID0gY3VycmVudFRpbWUgLyAxMDAwO1xuXG4gICAgICBsZXQgcHJvbWlzZSA9IHZpZC5wbGF5KCk7XG4gICAgICBpZiAocHJvbWlzZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHByb21pc2UudGhlbigoXzogYW55KSA9PiB7XG4gICAgICAgICAgLy8gQXV0b3BsYXkgc3RhcnRlZCFcbiAgICAgICAgICBjb25zb2xlLmxvZygnRXN0YW1vcyBhbyB2aXZvIScpO1xuICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgLy8gQXV0b3BsYXkgd2FzIHByZXZlbnRlZC5cbiAgICAgICAgICAvLyBTaG93IGEgXCJQbGF5XCIgYnV0dG9uIHNvIHRoYXQgdXNlciBjYW4gc3RhcnQgcGxheWJhY2suXG4gICAgICAgICAgdGhpcy5wbGF5ID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSwgMTAwMCk7XG4gIH1cblxuICBnZXRNdXRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tZWRpYSAmJiB0aGlzLm1lZGlhLm5hdGl2ZUVsZW1lbnQgJiYgdGhpcy5tZWRpYS5uYXRpdmVFbGVtZW50Lm11dGVkIHx8IGZhbHNlO1xuICB9XG5cbiAgZ2V0TWF4aW1pemVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmFwaSAmJiB0aGlzLmFwaS5mc0FQSSAmJiB0aGlzLmFwaS5mc0FQSS5pc0Z1bGxzY3JlZW4gJiYgdGhpcy5hcGkuZnNBUEkuaXNGdWxsc2NyZWVuIHx8IGZhbHNlO1xuICB9XG5cbiAgdG9nZ2xlU291bmQoKTogdm9pZCB7XG4gICAgdGhpcy5tZWRpYS5uYXRpdmVFbGVtZW50Lm11dGVkID0gIXRoaXMubWVkaWEubmF0aXZlRWxlbWVudC5tdXRlZDtcbiAgfVxuXG4gIHRvZ2dsZU1heGltaXplKCk6IHZvaWQge1xuICAgIHRoaXMuYXBpLmZzQVBJLnRvZ2dsZUZ1bGxzY3JlZW4odGhpcy5tZWRpYSk7XG4gIH1cblxuICBzaG93VmlkZW9Db250cm9scygpOiB2b2lkIHtcbiAgICB0aGlzLmlzSGlkZGVuID0gZmFsc2U7XG4gICAgdGhpcy5pc1Nob3cgPSB0cnVlO1xuICB9XG5cbiAgaGlkZVZpZGVvQ29udHJvbHMoKTogdm9pZCB7XG4gICAgdGhpcy5pc0hpZGRlbiA9IHRydWU7XG4gICAgdGhpcy5pc1Nob3cgPSBmYWxzZTtcbiAgfVxufVxuIl19