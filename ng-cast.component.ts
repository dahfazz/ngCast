import { Component, OnInit } from '@angular/core';

import { NgCastService } from './shared/ng-cast.service';

@Component({
  selector: 'ng-cast',
  template: '<google-cast-launcher id="castbutton"></google-cast-launcher>',
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

  }

  openSession() {
    this.ngCastService.discoverDevices();
  }

  closeSession() {
    this.ngCastService.stop();
  }

}
