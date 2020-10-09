import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let NgCastComponent = class NgCastComponent {
    constructor(ngCastService) {
        this.ngCastService = ngCastService;
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
        this.ngCastService.stop();
    }
};
NgCastComponent = tslib_1.__decorate([
    Component({
        selector: 'ng-cast',
        template: "<i *ngIf=\"!castingStatus.casting\" class=\"material-icons\" (click)=\"openSession()\">cast</i>\n<i *ngIf=\"castingStatus.casting\" class=\"material-icons\" (click)=\"closeSession()\">cast_connected</i>",
        styles: [""]
    })
], NgCastComponent);
export { NgCastComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY2FzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdGhpbmtlci9kZXYvdGhpbmthbS9uZ0Nhc3QvIiwic291cmNlcyI6WyJuZy1jYXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQVdsRCxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBSTFCLFlBQ1UsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7SUFDbEMsQ0FBQztJQUVMLFFBQVE7UUFDTixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsR0FBRyxVQUFVLFdBQW9CO1lBQ25FLElBQUksV0FBVyxFQUFFO2dCQUNmLGFBQWEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQ25DO1FBQ0gsQ0FBQyxDQUFDO1FBRUYsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3RELENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDNUIsQ0FBQztDQUVGLENBQUE7QUE3QlksZUFBZTtJQVAzQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsU0FBUztRQUNuQixzTkFBdUM7O0tBSXhDLENBQUM7R0FDVyxlQUFlLENBNkIzQjtTQTdCWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmdDYXN0U2VydmljZSB9IGZyb20gJy4vc2hhcmVkL25nLWNhc3Quc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLWNhc3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmctY2FzdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogW1xuICAgICcuL25nLWNhc3QuY29tcG9uZW50LnNjc3MnXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmdDYXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgY2FzdGluZ1N0YXR1czogYW55O1xuICB3aW5kb3c6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5nQ2FzdFNlcnZpY2U6IE5nQ2FzdFNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLndpbmRvdyA9IHdpbmRvdztcblxuICAgIGxldCBuZ0Nhc3RTZXJ2aWNlID0gdGhpcy5uZ0Nhc3RTZXJ2aWNlO1xuICAgIHRoaXMud2luZG93WydfX29uR0Nhc3RBcGlBdmFpbGFibGUnXSA9IGZ1bmN0aW9uIChpc0F2YWlsYWJsZTogYm9vbGVhbikge1xuICAgICAgaWYgKGlzQXZhaWxhYmxlKSB7XG4gICAgICAgIG5nQ2FzdFNlcnZpY2UuaW5pdGlhbGl6ZUNhc3RBcGkoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5jYXN0aW5nU3RhdHVzID0gdGhpcy5uZ0Nhc3RTZXJ2aWNlLmdldFN0YXR1cygpO1xuICB9XG5cbiAgb3BlblNlc3Npb24oKSB7XG4gICAgdGhpcy5uZ0Nhc3RTZXJ2aWNlLmRpc2NvdmVyRGV2aWNlcygpO1xuICB9XG5cbiAgY2xvc2VTZXNzaW9uKCkge1xuICAgIHRoaXMubmdDYXN0U2VydmljZS5zdG9wKCk7XG4gIH1cblxufVxuIl19