import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let NgCastComponent = class NgCastComponent {
    constructor(ngCastService) {
        this.ngCastService = ngCastService;
    }
    ngOnInit() {
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
        template: '<google-cast-launcher id="castbutton"></google-cast-launcher>',
        styles: [""]
    })
], NgCastComponent);
export { NgCastComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY2FzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdGhpbmtlci9kZXYvdGhpbmthbS9uZ0Nhc3QvIiwic291cmNlcyI6WyJuZy1jYXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQVdsRCxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBRTFCLFlBQ1UsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7SUFDbEMsQ0FBQztJQUVMLFFBQVE7SUFFUixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzVCLENBQUM7Q0FFRixDQUFBO0FBbEJZLGVBQWU7SUFQM0IsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFNBQVM7UUFDbkIsUUFBUSxFQUFFLCtEQUErRDs7S0FJMUUsQ0FBQztHQUNXLGVBQWUsQ0FrQjNCO1NBbEJZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Nhc3RTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvbmctY2FzdC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctY2FzdCcsXG4gIHRlbXBsYXRlOiAnPGdvb2dsZS1jYXN0LWxhdW5jaGVyIGlkPVwiY2FzdGJ1dHRvblwiPjwvZ29vZ2xlLWNhc3QtbGF1bmNoZXI+JyxcbiAgc3R5bGVVcmxzOiBbXG4gICAgJy4vbmctY2FzdC5jb21wb25lbnQuc2NzcydcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ0Nhc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBjYXN0aW5nU3RhdHVzOiBhbnk7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdDYXN0U2VydmljZTogTmdDYXN0U2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuXG4gIH1cblxuICBvcGVuU2Vzc2lvbigpIHtcbiAgICB0aGlzLm5nQ2FzdFNlcnZpY2UuZGlzY292ZXJEZXZpY2VzKCk7XG4gIH1cblxuICBjbG9zZVNlc3Npb24oKSB7XG4gICAgdGhpcy5uZ0Nhc3RTZXJ2aWNlLnN0b3AoKTtcbiAgfVxuXG59XG4iXX0=