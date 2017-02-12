import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgCastComponent } from './ng-cast.component';
import { NgCastService } from './shared/ng-cast.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [NgCastComponent],
  providers: [NgCastService],
  declarations: [NgCastComponent]
})
export class NgCastModule { }
