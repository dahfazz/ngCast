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
  constructor(
    private ngCastService: NgCastService
  ) { }

  ngOnInit() {

    let script = window['document'].createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1');
    window['document'].body.appendChild(script);

    let ngCastService = this.ngCastService;
    window['__onGCastApiAvailable'] = function (isAvailable: any) {
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
    this.ngCastService.stop();
  }

}
