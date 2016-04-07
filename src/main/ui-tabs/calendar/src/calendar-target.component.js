System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var template, calendarTargetComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            template = "\n    <div class=\"calendar__current_form-select-global-block\" *ngFor=\"#global of data.globalTargets; #iGlob = index\">\n        <p class=\"calendar__current_form-select-global-button\" (click)=\"onShowSwitch($event, global)\">{{global.target}}</p>\n        <div class=\"calendar__current_form-select-global-content disabled p-abs\" *ngIf=\"global.show\">\n            <div class=\"calendar__current_form-select-long-block\" *ngFor=\"#long of global.longTargets; #iLong = index\">\n                <p class=\"calendar__current_form-select-long-button\" (click)=\"onShowSwitch($event, long)\">{{long.target}}</p>\n                <div class=\"calendar__current_form-select-long-content disabled p-abs\" *ngIf=\"long.show\">\n                    <div class=\"calendar__current_form-select-short-block\" *ngFor=\"#short of long.shortTargets; #iShort = index\">\n                        <p class=\"calendar__current_form-select-short-button\" (click)=\"onSelectShortTarget({global:iGlob,long:iLong,short:iShort,content:short})\">{{short.target}}</p>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>";
            calendarTargetComponent = (function () {
                function calendarTargetComponent() {
                    this.selectedTarget = new core_1.EventEmitter();
                }
                calendarTargetComponent.prototype.onShowSwitch = function (event, block) {
                    if (block.show) {
                        event.target.classList.remove("activating");
                        setTimeout(function () {
                            block.show = !block.show;
                        }, 350);
                    }
                    else {
                        block.show = !block.show;
                        setTimeout(function () {
                            event.target.classList.add("activating");
                        });
                    }
                };
                calendarTargetComponent.prototype.onSelectShortTarget = function (obj) {
                    this.selectedTarget.emit(obj);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], calendarTargetComponent.prototype, "data", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], calendarTargetComponent.prototype, "selectedTarget", void 0);
                calendarTargetComponent = __decorate([
                    core_1.Component({
                        selector: 'select-target',
                        template: template
                    }), 
                    __metadata('design:paramtypes', [])
                ], calendarTargetComponent);
                return calendarTargetComponent;
            }());
            exports_1("calendarTargetComponent", calendarTargetComponent);
        }
    }
});
//# sourceMappingURL=calendar-target.component.js.map