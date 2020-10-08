import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let NgCastComponent = class NgCastComponent {
    constructor(ngCastService) {
        this.ngCastService = ngCastService;
    }
    ngOnInit() {
        let script = window['document'].createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1');
        window['document'].body.appendChild(script);
        let ngCastService = this.ngCastService;
        window['__onGCastApiAvailable'] = function (isAvailable) {
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
};
NgCastComponent = tslib_1.__decorate([
    Component({
        selector: 'ng-cast',
        template: "<i *ngIf=\"castingStatus && !castingStatus.casting\" class=\"material-icons\" (click)=\"openSession()\">cast</i>\n<i *ngIf=\"castingStatus && castingStatus.casting\" class=\"material-icons\" (click)=\"openSession()\">cast_connected</i>",
        styles: [""]
    })
], NgCastComponent);
export { NgCastComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY2FzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdGhpbmtlci9kZXYvdGhpbmthbS9uZ0Nhc3QvIiwic291cmNlcyI6WyJuZy1jYXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQVdsRCxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBRTFCLFlBQ1UsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7SUFDbEMsQ0FBQztJQUVMLFFBQVE7UUFFTixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsNEVBQTRFLENBQUMsQ0FBQztRQUN6RyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU1QyxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLFVBQVUsV0FBZ0I7WUFDMUQsSUFBSSxXQUFXLEVBQUU7Z0JBQ2YsYUFBYSxDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFDbkM7UUFDSCxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDdEQsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM1QixDQUFDO0NBRUYsQ0FBQTtBQS9CWSxlQUFlO0lBUDNCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxTQUFTO1FBQ25CLHVQQUF1Qzs7S0FJeEMsQ0FBQztHQUNXLGVBQWUsQ0ErQjNCO1NBL0JZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Nhc3RTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvbmctY2FzdC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctY2FzdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZy1jYXN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbXG4gICAgJy4vbmctY2FzdC5jb21wb25lbnQuc2NzcydcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ0Nhc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBjYXN0aW5nU3RhdHVzOiBhbnk7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdDYXN0U2VydmljZTogTmdDYXN0U2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuXG4gICAgbGV0IHNjcmlwdCA9IHdpbmRvd1snZG9jdW1lbnQnXS5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBzY3JpcHQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvamF2YXNjcmlwdCcpO1xuICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ3NyYycsICdodHRwczovL3d3dy5nc3RhdGljLmNvbS9jdi9qcy9zZW5kZXIvdjEvY2FzdF9zZW5kZXIuanM/bG9hZENhc3RGcmFtZXdvcms9MScpO1xuICAgIHdpbmRvd1snZG9jdW1lbnQnXS5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG5cbiAgICBsZXQgbmdDYXN0U2VydmljZSA9IHRoaXMubmdDYXN0U2VydmljZTtcbiAgICB3aW5kb3dbJ19fb25HQ2FzdEFwaUF2YWlsYWJsZSddID0gZnVuY3Rpb24gKGlzQXZhaWxhYmxlOiBhbnkpIHtcbiAgICAgIGlmIChpc0F2YWlsYWJsZSkge1xuICAgICAgICBuZ0Nhc3RTZXJ2aWNlLmluaXRpYWxpemVDYXN0QXBpKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuY2FzdGluZ1N0YXR1cyA9IHRoaXMubmdDYXN0U2VydmljZS5nZXRTdGF0dXMoKTtcbiAgfVxuXG4gIG9wZW5TZXNzaW9uKCkge1xuICAgIHRoaXMubmdDYXN0U2VydmljZS5kaXNjb3ZlckRldmljZXMoKTtcbiAgfVxuXG4gIGNsb3NlU2Vzc2lvbigpIHtcbiAgICB0aGlzLm5nQ2FzdFNlcnZpY2Uuc3RvcCgpO1xuICB9XG5cbn1cbiJdfQ==