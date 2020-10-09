"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgCastComponent = void 0;
var core_1 = require("@angular/core");
var NgCastComponent = /** @class */ (function () {
    function NgCastComponent(ngCastService) {
        this.ngCastService = ngCastService;
    }
    NgCastComponent.prototype.ngOnInit = function () {
        this.window = window;
        var ngCastService = this.ngCastService;
        this.window['__onGCastApiAvailable'] = function (isAvailable) {
            if (isAvailable) {
                ngCastService.initializeCastApi();
            }
        };
        this.castingStatus = this.ngCastService.getStatus();
    };
    NgCastComponent.prototype.openSession = function () {
        this.ngCastService.discoverDevices();
    };
    NgCastComponent.prototype.closeSession = function () {
        this.ngCastService.stop();
    };
    NgCastComponent = __decorate([
        core_1.Component({
            selector: 'ng-cast',
            templateUrl: './ng-cast.component.html',
            styleUrls: [
                './ng-cast.component.scss'
            ]
        })
    ], NgCastComponent);
    return NgCastComponent;
}());
exports.NgCastComponent = NgCastComponent;
//# sourceMappingURL=ng-cast.component.js.map