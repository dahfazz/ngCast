import { Component, OnInit } from '@angular/core';

import { NgCastService } from './shared/ng-cast.service';

@Component({
  selector: 'ng-cast',
  templateUrl: './ng-cast.component.html',
  styleUrls: [
    './ng-cast.component.scss'
  ]
})
export class NgCastComponent implements OnInit {
  castingStatus: any;
  window: any;

  constructor(
    private ngCastService: NgCastService
  ) { }

  ngOnInit() {
    this.window = window;

    let ngCastService = this.ngCastService;
    this.window['__onGCastApiAvailable'] = function (isAvailable: boolean) {
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
    this.ngCastService.discoverDevices();
  }

}
