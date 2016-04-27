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
    var template, calendarDoingComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            template = "\n    <label class=\"calendar__routine_label\">{{doing.description}}</label>\n    <input type=\"checkbox\" *ngIf=\"!data.done\" [(ngModel)]=\"doing.done\" />\n    <input type=\"number\" *ngIf=\"!data.done\" (change)=\"onTimeChanged()\" [(ngModel)]=\"doing.time\" />\n    <input type=\"checkbox\" *ngIf=\"data.done\" disabled [(ngModel)]=\"doing.done\" />\n    <input type=\"number\" *ngIf=\"data.done\" disabled [(ngModel)]=\"doing.time\" />";
            calendarDoingComponent = (function () {
                function calendarDoingComponent() {
                    this.doingChanged = new core_1.EventEmitter();
                }
                calendarDoingComponent.prototype.ngOnInit = function () {
                };
                calendarDoingComponent.prototype.onTimeChanged = function (obj) {
                    this.doingChanged.emit(obj);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], calendarDoingComponent.prototype, "data", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], calendarDoingComponent.prototype, "doing", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], calendarDoingComponent.prototype, "doingChanged", void 0);
                calendarDoingComponent = __decorate([
                    core_1.Component({
                        selector: 'doing',
                        template: template
                    }), 
                    __metadata('design:paramtypes', [])
                ], calendarDoingComponent);
                return calendarDoingComponent;
            }());
            exports_1("calendarDoingComponent", calendarDoingComponent);
        }
    }
});
//# sourceMappingURL=calendar-doing.component.js.map