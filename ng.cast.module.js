"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgCastModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var ng_cast_component_1 = require("./ng-cast.component");
var ng_cast_service_1 = require("./shared/ng-cast.service");
var NgCastModule = /** @class */ (function () {
    function NgCastModule() {
    }
    NgCastModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            exports: [ng_cast_component_1.NgCastComponent],
            providers: [ng_cast_service_1.NgCastService],
            declarations: [ng_cast_component_1.NgCastComponent]
        })
    ], NgCastModule);
    return NgCastModule;
}());
exports.NgCastModule = NgCastModule;
//# sourceMappingURL=ng.cast.module.js.map