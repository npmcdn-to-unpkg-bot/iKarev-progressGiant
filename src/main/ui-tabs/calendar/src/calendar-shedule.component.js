System.register(['angular2/core', '../../../services/days/days.service', '../../../services/targets/targets.service'], function(exports_1, context_1) {
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
    var core_1, days_service_1, targets_service_1;
    var template, styles, calendarSheduleComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (days_service_1_1) {
                days_service_1 = days_service_1_1;
            },
            function (targets_service_1_1) {
                targets_service_1 = targets_service_1_1;
            }],
        execute: function() {
            template = "\n    <table class=\"table\">\n        <thead>\n            <tr>\n                <td class=\"ta-center\"><h3>Routine</h3></td>\n                <td class=\"ta-center\"><h3>Ideal time</h3></td>\n                <td class=\"ta-center\"><h3>Today time</h3></td>\n                <td class=\"ta-center\"><h3>Targets</h3></td>\n            </tr>\n        </thead>\n        <tbody>\n            <tr *ngFor=\"#r of idealRoutine; #i = index\">\n                <td>{{r.doing}}</td>\n                <td class=\"ta-center\">{{r.time}}</td>\n                <td><input  class=\"ta-center\" [(ngModel)]=\"todayRoutine[i].time\" type=\"number\" value=\"\" /></td>\n                <td *ngIf=\"i == 0\" [attr.rowspan]=\"idealRoutine.length\">\n                    <div  class=\"ta-center\" *ngFor=\"#doing of data.doings\">\n                        <label class=\"calendar__routine_label\">{{doing.description}}</label><input type=\"checkbox\" [(ngModel)]=\"doing.done\" />\n                    </div>    \n                </td>\n            </tr>\n        </tbody>\n    </table>\n    <div class=\"btn btn-success\" (click)=\"onSaveDay(data)\">Save changes</div>\n";
            styles = "";
            calendarSheduleComponent = (function () {
                function calendarSheduleComponent(_daysService, _lifetargetService) {
                    this._daysService = _daysService;
                    this._lifetargetService = _lifetargetService;
                    this.todayRoutine = [];
                    this.lifeTarget = this._lifetargetService.getTargets();
                    this.idealRoutine = this._daysService.getIdealRoutine();
                    this.todayRoutine = this.idealRoutine
                        .map(function (global) {
                        return {
                            doing: global.doing,
                            time: ''
                        };
                    });
                }
                calendarSheduleComponent.prototype.ngOnChanges = function () {
                    this.todayRoutine = this.idealRoutine
                        .map(function (global) {
                        return {
                            doing: global.doing,
                            time: ''
                        };
                    });
                };
                calendarSheduleComponent.prototype.onSaveDay = function () {
                    var ir = this.idealRoutine;
                    var tr = this.todayRoutine;
                    for (var i in ir) {
                        this.idealRoutine[i].fullTime += tr[i].time;
                    }
                    this._daysService.updateIdealRoutine(this.idealRoutine);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], calendarSheduleComponent.prototype, "data", void 0);
                calendarSheduleComponent = __decorate([
                    core_1.Component({
                        selector: 'shedule',
                        template: template,
                        providers: [targets_service_1.LifetargetService, days_service_1.DaysService]
                    }), 
                    __metadata('design:paramtypes', [days_service_1.DaysService, targets_service_1.LifetargetService])
                ], calendarSheduleComponent);
                return calendarSheduleComponent;
            }());
            exports_1("calendarSheduleComponent", calendarSheduleComponent);
        }
    }
});
//# sourceMappingURL=calendar-shedule.component.js.map