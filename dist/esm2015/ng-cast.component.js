import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let NgCastComponent = class NgCastComponent {
    constructor(ngCastService) {
        this.ngCastService = ngCastService;
        this.window = window;
    }
    ngOnInit() {
        let script = window['document'].createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1');
        window['document'].body.appendChild(script);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY2FzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdGhpbmtlci9kZXYvdGhpbmthbS9uZ0Nhc3QvIiwic291cmNlcyI6WyJuZy1jYXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQVdsRCxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBRTFCLFlBQ1UsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFHOUIsV0FBTSxHQUFRLE1BQU0sQ0FBQztJQUZ6QixDQUFDO0lBSUwsUUFBUTtRQUVOLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEQsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSw0RUFBNEUsQ0FBQyxDQUFDO1FBQ3pHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTVDLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLFVBQVUsV0FBZ0I7WUFDL0QsSUFBSSxXQUFXLEVBQUU7Z0JBQ2YsYUFBYSxDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFDbkM7UUFDSCxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDdEQsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM1QixDQUFDO0NBRUYsQ0FBQTtBQWpDWSxlQUFlO0lBUDNCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxTQUFTO1FBQ25CLHVQQUF1Qzs7S0FJeEMsQ0FBQztHQUNXLGVBQWUsQ0FpQzNCO1NBakNZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Nhc3RTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvbmctY2FzdC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctY2FzdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZy1jYXN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbXG4gICAgJy4vbmctY2FzdC5jb21wb25lbnQuc2NzcydcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ0Nhc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBjYXN0aW5nU3RhdHVzOiBhbnk7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdDYXN0U2VydmljZTogTmdDYXN0U2VydmljZVxuICApIHsgfVxuXG4gIHByaXZhdGUgd2luZG93OiBhbnkgPSB3aW5kb3c7XG5cbiAgbmdPbkluaXQoKSB7XG5cbiAgICBsZXQgc2NyaXB0ID0gd2luZG93Wydkb2N1bWVudCddLmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9qYXZhc2NyaXB0Jyk7XG4gICAgc2NyaXB0LnNldEF0dHJpYnV0ZSgnc3JjJywgJ2h0dHBzOi8vd3d3LmdzdGF0aWMuY29tL2N2L2pzL3NlbmRlci92MS9jYXN0X3NlbmRlci5qcz9sb2FkQ2FzdEZyYW1ld29yaz0xJyk7XG4gICAgd2luZG93Wydkb2N1bWVudCddLmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcblxuICAgIGxldCBuZ0Nhc3RTZXJ2aWNlID0gdGhpcy5uZ0Nhc3RTZXJ2aWNlO1xuICAgIHRoaXMud2luZG93WydfX29uR0Nhc3RBcGlBdmFpbGFibGUnXSA9IGZ1bmN0aW9uIChpc0F2YWlsYWJsZTogYW55KSB7XG4gICAgICBpZiAoaXNBdmFpbGFibGUpIHtcbiAgICAgICAgbmdDYXN0U2VydmljZS5pbml0aWFsaXplQ2FzdEFwaSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmNhc3RpbmdTdGF0dXMgPSB0aGlzLm5nQ2FzdFNlcnZpY2UuZ2V0U3RhdHVzKCk7XG4gIH1cblxuICBvcGVuU2Vzc2lvbigpIHtcbiAgICB0aGlzLm5nQ2FzdFNlcnZpY2UuZGlzY292ZXJEZXZpY2VzKCk7XG4gIH1cblxuICBjbG9zZVNlc3Npb24oKSB7XG4gICAgdGhpcy5uZ0Nhc3RTZXJ2aWNlLnN0b3AoKTtcbiAgfVxuXG59XG4iXX0=