import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let NgCastComponent = class NgCastComponent {
    constructor(ngCastService) {
        this.ngCastService = ngCastService;
        this.videoImage = '';
        this.imageOffline = false;
        this.srcImageOffline = '';
    }
    ngOnInit() {
        this.window = window;
        let ngCastService = this.ngCastService;
        this.window['__onGCastApiAvailable'] = function (isAvailable) {
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
};
tslib_1.__decorate([
    Input()
], NgCastComponent.prototype, "videoImage", void 0);
tslib_1.__decorate([
    Input()
], NgCastComponent.prototype, "imageOffline", void 0);
tslib_1.__decorate([
    Input()
], NgCastComponent.prototype, "srcImageOffline", void 0);
NgCastComponent = tslib_1.__decorate([
    Component({
        selector: 'ng-cast',
        template: "<div *ngIf=\"!imageOffline\" id=\"main_video\">\n  <div class=\"imageSub\"> <!-- Put Your Image Width -->\n     <div class=\"blackbg\" id=\"playerstatebg\">IDLE</div>\n     <div class=label id=\"playerstate\">IDLE</div>\n     <img [src]=\"videoImage\" id=\"video_image\">\n     <div id=\"video_image_overlay\"></div>\n     <video id=\"video_element\">\n     </video>\n  </div>\n\n  <div id=\"media_control\">\n     <div id=\"play\"></div>\n     <div id=\"pause\"></div>\n     <div id=\"progress_bg\"></div>\n     <div id=\"progress\"></div>\n     <div id=\"progress_indicator\"></div>\n     <div id=\"fullscreen_expand\"></div>\n     <div id=\"fullscreen_collapse\"></div>\n     <google-cast-launcher id=\"castbutton\"></google-cast-launcher>\n     <div id=\"audio_bg\"></div>\n     <div id=\"audio_bg_track\"></div>\n     <div id=\"audio_indicator\"></div>\n     <div id=\"audio_bg_level\"></div>\n     <div id=\"audio_on\"></div>\n     <div id=\"audio_off\"></div>\n     <div id=\"duration\">00:00:00</div>\n  </div>\n</div>\n<div *ngIf=\"!imageOffline\" id=\"media_info\">\n  <div id=\"media_title\">\n  </div>\n  <div id=\"media_subtitle\">\n  </div>\n  <div id=\"media_desc\">\n  </div>\n</div>\n\n<div *ngIf=\"!imageOffline\" id=\"carousel\">\n</div>\n\n<img \n  width=\"100%\" \n  *ngIf=\"imageOffline\" \n  [src]=\"srcImageOffline\"\n  alt=\"TV Offline\"\n/>\n",
        styles: [""]
    })
], NgCastComponent);
export { NgCastComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY2FzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdGhpbmtlci9kZXYvdGhpbmthbS9uZ0Nhc3QvIiwic291cmNlcyI6WyJuZy1jYXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFXekQsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQVExQixZQUNVLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBTDdCLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsb0JBQWUsR0FBRyxFQUFFLENBQUM7SUFJMUIsQ0FBQztJQUVMLFFBQVE7UUFDTixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsR0FBRyxVQUFVLFdBQW9CO1lBQ25FLElBQUksV0FBVyxFQUFFO2dCQUNmLGFBQWEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQ25DO1FBQ0gsQ0FBQyxDQUFDO1FBRUYsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3RELENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDdkMsQ0FBQztDQUVGLENBQUE7QUE3QlU7SUFBUixLQUFLLEVBQUU7bURBQWlCO0FBQ2hCO0lBQVIsS0FBSyxFQUFFO3FEQUFzQjtBQUNyQjtJQUFSLEtBQUssRUFBRTt3REFBc0I7QUFObkIsZUFBZTtJQVAzQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsU0FBUztRQUNuQixvMkNBQXVDOztLQUl4QyxDQUFDO0dBQ1csZUFBZSxDQWlDM0I7U0FqQ1ksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Nhc3RTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvbmctY2FzdC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctY2FzdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZy1jYXN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbXG4gICAgJy4vbmctY2FzdC5jb21wb25lbnQuc2NzcydcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ0Nhc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBjYXN0aW5nU3RhdHVzOiBhbnk7XG4gIHdpbmRvdzogYW55O1xuXG4gIEBJbnB1dCgpIHZpZGVvSW1hZ2UgPSAnJztcbiAgQElucHV0KCkgaW1hZ2VPZmZsaW5lID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNyY0ltYWdlT2ZmbGluZSA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdDYXN0U2VydmljZTogTmdDYXN0U2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMud2luZG93ID0gd2luZG93O1xuXG4gICAgbGV0IG5nQ2FzdFNlcnZpY2UgPSB0aGlzLm5nQ2FzdFNlcnZpY2U7XG4gICAgdGhpcy53aW5kb3dbJ19fb25HQ2FzdEFwaUF2YWlsYWJsZSddID0gZnVuY3Rpb24gKGlzQXZhaWxhYmxlOiBib29sZWFuKSB7XG4gICAgICBpZiAoaXNBdmFpbGFibGUpIHtcbiAgICAgICAgbmdDYXN0U2VydmljZS5pbml0aWFsaXplQ2FzdEFwaSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmNhc3RpbmdTdGF0dXMgPSB0aGlzLm5nQ2FzdFNlcnZpY2UuZ2V0U3RhdHVzKCk7XG4gIH1cblxuICBvcGVuU2Vzc2lvbigpIHtcbiAgICB0aGlzLm5nQ2FzdFNlcnZpY2UuZGlzY292ZXJEZXZpY2VzKCk7XG4gIH1cblxuICBjbG9zZVNlc3Npb24oKSB7XG4gICAgdGhpcy5uZ0Nhc3RTZXJ2aWNlLmRpc2NvdmVyRGV2aWNlcygpO1xuICB9XG5cbn1cbiJdfQ==