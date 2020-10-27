import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';

import { NgCastService } from './shared/ng-cast.service';

import { VgDASH } from 'videogular2/compiled/src/streaming/vg-dash/vg-dash';
import { IDRMLicenseServer } from 'videogular2/compiled/src/streaming/streaming';
import { VgAPI, BitrateOption } from 'videogular2/compiled/core';

import { ScheduleDto } from './dto/schedule-dto';

export interface IMediaStream {
  type: 'vod' | 'dash';
  source: string;
  label: string;
  token?: string;
  licenseServers?: IDRMLicenseServer;
}

@Component({
  selector: 'ng-cast',
  templateUrl: './ng-cast.component.html',
  styleUrls: [
    './ng-cast.component.scss'
  ]
})
export class NgCastComponent implements OnInit {
  @ViewChild(VgDASH, { static: false }) vgDash!: VgDASH;
  @ViewChild('media', { static: false }) media!: ElementRef<HTMLVideoElement>;

  castingStatus: any;
  window: any;

  @Input() videoImage = '';
  @Input() imageOffline = false;
  @Input() premium = false;
  @Input() srcImageOffline = '';

  @Input() currentStream: IMediaStream = {
    type: 'dash',
    label: 'DASH: Media Stream test',
    source: 'http://livesim.dashif.org/livesim/testpic_2s/Manifest.mpd'
  };

  api: VgAPI = new VgAPI();

  @Input() isDebug = false;

  @Input() paused = false;

  @Input() streams: IMediaStream[] = [
    {
      type: 'dash',
      label: 'DASH: Media Stream test',
      source: 'http://livesim.dashif.org/livesim/testpic_2s/Manifest.mpd'
    }
  ];

  @Input() playlist: Array<ScheduleDto> = [];

  @Input() play = false;
  @Input() isHidden = false;
  @Input() isShow = true;

  @Input() currentIndex = 0;
  @Input() video: ScheduleDto = new ScheduleDto();
  @Input() appBaseUrl: String = '';

  constructor(
    private ngCastService: NgCastService
  ) { }

  ngOnInit() {
    this.window = window;
    this.currentStream = this.streams[0];

    let ngCastService = this.ngCastService;
    this.window['__onGCastApiAvailable'] = function (isAvailable: boolean) {
      if (isAvailable) {
        ngCastService.initializeCastApi();
      }
    };

    this.castingStatus = this.ngCastService.getStatus();
  }

  onPlayerReady(api: VgAPI) {
    this.api = api;

    this.api.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }

  setBitrate(option: BitrateOption) {
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
    } else {
      setTimeout(() => {
        return this.getPaused();
      }, 2000);
    }
  }

  pause(): void {
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

  getVideos(): void {
    if (this.playlist && this.playlist.length > 0) {
      this.imageOffline = false;
      this.video = this.playlist[this.currentIndex];

      this.getPosition(this.video);
    } else {
      this.video = new ScheduleDto();
      this.tryAgain();
    }
  }

  getPosition(result: ScheduleDto) {
    setTimeout(() => {
      let vid: any = document.getElementById('video_element');
      vid.load();

      const now = new Date();
      const currentTime = Math.abs(now.getTime() - new Date(this.video.actualStart).getTime());

      console.log('Temos no player: ' + result.url);
      console.log('Início em: ' + currentTime);

      this.video.url = result.url;
      vid['currentTime'] = currentTime / 1000;

      let promise = vid.play();
      if (promise !== undefined) {
        promise.then((_: any) => {
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

  getMuted(): boolean {
    return this.media && this.media.nativeElement && this.media.nativeElement.muted || false;
  }

  getMaximized(): boolean {
    return this.api && this.api.fsAPI && this.api.fsAPI.isFullscreen && this.api.fsAPI.isFullscreen || false;
  }

  toggleSound(): void {
    this.media.nativeElement.muted = !this.media.nativeElement.muted;
  }

  toggleMaximize(): void {
    this.api.fsAPI.toggleFullscreen(this.media);
  }

  showVideoControls(): void {
    this.isHidden = false;
    this.isShow = true;
  }

  hideVideoControls(): void {
    this.isHidden = true;
    this.isShow = false;
  }
}
