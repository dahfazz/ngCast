import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgCastComponent } from './ng-cast.component';
import { NgCastService } from './shared/ng-cast.service';

import { VgCoreModule } from 'videogular2/compiled/core';
import { VgControlsModule } from 'videogular2/compiled/controls';
import { VgStreamingModule } from 'videogular2/compiled/streaming';
import { VgBufferingModule } from 'videogular2/compiled/buffering';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    VgCoreModule,
    VgControlsModule,
    VgStreamingModule,
    VgBufferingModule,
    VgOverlayPlayModule,
  ],
  exports: [NgCastComponent],
  providers: [NgCastService],
  declarations: [NgCastComponent]
})
export class NgCastModule { }
