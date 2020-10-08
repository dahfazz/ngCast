import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let window;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY2FzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdGhpbmtlci9kZXYvdGhpbmthbS9uZ0Nhc3QvIiwic291cmNlcyI6WyJuZy1jYXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUlsRCxJQUFJLE1BQVcsQ0FBQztBQVNoQixJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBRTFCLFlBQ1UsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7SUFDbEMsQ0FBQztJQUVMLFFBQVE7UUFFTixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsNEVBQTRFLENBQUMsQ0FBQztRQUN6RyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU1QyxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLFVBQVUsV0FBZ0I7WUFDMUQsSUFBSSxXQUFXLEVBQUU7Z0JBQ2YsYUFBYSxDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFDbkM7UUFDSCxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDdEQsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM1QixDQUFDO0NBRUYsQ0FBQTtBQS9CWSxlQUFlO0lBUDNCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxTQUFTO1FBQ25CLHVQQUF1Qzs7S0FJeEMsQ0FBQztHQUNXLGVBQWUsQ0ErQjNCO1NBL0JZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Nhc3RTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvbmctY2FzdC5zZXJ2aWNlJztcblxubGV0IHdpbmRvdzogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1jYXN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL25nLWNhc3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFtcbiAgICAnLi9uZy1jYXN0LmNvbXBvbmVudC5zY3NzJ1xuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5nQ2FzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGNhc3RpbmdTdGF0dXM6IGFueTtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ0Nhc3RTZXJ2aWNlOiBOZ0Nhc3RTZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG5cbiAgICBsZXQgc2NyaXB0ID0gd2luZG93Wydkb2N1bWVudCddLmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9qYXZhc2NyaXB0Jyk7XG4gICAgc2NyaXB0LnNldEF0dHJpYnV0ZSgnc3JjJywgJ2h0dHBzOi8vd3d3LmdzdGF0aWMuY29tL2N2L2pzL3NlbmRlci92MS9jYXN0X3NlbmRlci5qcz9sb2FkQ2FzdEZyYW1ld29yaz0xJyk7XG4gICAgd2luZG93Wydkb2N1bWVudCddLmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcblxuICAgIGxldCBuZ0Nhc3RTZXJ2aWNlID0gdGhpcy5uZ0Nhc3RTZXJ2aWNlO1xuICAgIHdpbmRvd1snX19vbkdDYXN0QXBpQXZhaWxhYmxlJ10gPSBmdW5jdGlvbiAoaXNBdmFpbGFibGU6IGFueSkge1xuICAgICAgaWYgKGlzQXZhaWxhYmxlKSB7XG4gICAgICAgIG5nQ2FzdFNlcnZpY2UuaW5pdGlhbGl6ZUNhc3RBcGkoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5jYXN0aW5nU3RhdHVzID0gdGhpcy5uZ0Nhc3RTZXJ2aWNlLmdldFN0YXR1cygpO1xuICB9XG5cbiAgb3BlblNlc3Npb24oKSB7XG4gICAgdGhpcy5uZ0Nhc3RTZXJ2aWNlLmRpc2NvdmVyRGV2aWNlcygpO1xuICB9XG5cbiAgY2xvc2VTZXNzaW9uKCkge1xuICAgIHRoaXMubmdDYXN0U2VydmljZS5zdG9wKCk7XG4gIH1cblxufVxuIl19