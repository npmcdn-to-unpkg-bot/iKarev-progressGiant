System.register(['angular2/core', '../../../services/days/days.service', '../../../services/targets/targets.service', './calendar-doing.component'], function(exports_1, context_1) {
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
    var core_1, days_service_1, targets_service_1, calendar_doing_component_1;
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
            },
            function (calendar_doing_component_1_1) {
                calendar_doing_component_1 = calendar_doing_component_1_1;
            }],
        execute: function() {
            ;
            template = "\n    <table class=\"table day-edited-{{data.done}}\">\n        <thead>\n            <tr>\n                <td class=\"ta-center\"><h3>Routine</h3></td>\n                <td class=\"ta-center\"><h3>Ideal time</h3></td>\n                <td class=\"ta-center\"><h3>Today time</h3></td>\n                <td class=\"ta-center\"><h3>Targets</h3></td>\n            </tr>\n        </thead>\n        <tbody>\n            <tr *ngFor=\"#r of idealRoutine; #i = index\">\n                <td>{{r.doing}}</td>\n                <td class=\"ta-center\">{{r.time}}</td>\n                <td>\n                    <input *ngIf=\"data.done\" disabled class=\"ta-center\" [(ngModel)]=\"todayRoutine[i].time\" type=\"number\" value=\"\" />\n                    <input *ngIf=\"!data.done\" class=\"ta-center\" (change)=\"onTimeChanged()\" [(ngModel)]=\"todayRoutine[i].time\" type=\"number\" value=\"\" />\n                </td>\n                <td *ngIf=\"i == 0\" [attr.rowspan]=\"idealRoutine.length\">\n                    <div *ngIf=\"mainTarget.length > 0\">\n                        <h4 class=\"ta-center\">Main Target</h4>\n                        <div class=\"ta-center\" *ngFor=\"#doing of mainTarget; #i = index\">\n                            <doing (doingChanged)=\"onTimeChanged()\" [doing]=\"doing\" [data]=data></doing>\n                        </div>   \n                    </div>\n                    <div *ngIf=\"impAndUrgTargets.length > 0\">\n                        <h4 class=\"ta-center\">Urgent & Important</h4>\n                        <div  class=\"ta-center\" *ngFor=\"#doing of impAndUrgTargets; #i = index\">\n                            <doing (doingChanged)=\"onTimeChanged()\" [doing]=\"doing\" [data]=data></doing>\n                        </div>   \n                    </div>\n                    <div *ngIf=\"urgTargets.length > 0\">                     \n                        <h4 class=\"ta-center\">Urgent</h4>\n                        <div  class=\"ta-center\" *ngFor=\"#doing of urgTargets; #i = index\"> \n                            <doing (doingChanged)=\"onTimeChanged()\" [doing]=\"doing\" [data]=data></doing>\n                        </div>\n                    </div>\n                    <div *ngIf=\"impTargets.length > 0\">\n                        <h4 class=\"ta-center\">Important</h4>\n                        <div  class=\"ta-center\" *ngFor=\"#doing of impTargets; #i = index\">\n                            <doing (doingChanged)=\"onTimeChanged()\" [doing]=\"doing\" [data]=data></doing>\n                        </div>  \n                    </div>\n                    <div *ngIf=\"nonimpAndNonurgTargets.length > 0\">\n                        <h4 class=\"ta-center\">Why?</h4>\n                        <div  class=\"ta-center\" *ngFor=\"#doing of nonimpAndNonurgTargets; #i = index\">  \n                            <doing (doingChanged)=\"onTimeChanged()\" [doing]=\"doing\" [data]=data></doing>\n                        </div>  \n                    </div>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n    <button (click)=\"onCloseDay()\" class=\"day__edited_back btn btn-default\">Back</button>\n    <button class=\"btn btn-success\" (click)=\"onSaveDay(data)\">Save changes</button>\n    <div class=\"btn cur-def\" *ngIf=\"!data.done\">So far you've logged {{fullTime.count}} hours</div>\n    <div class=\"btn day-edited-toomuch cur-def\" *ngIf=\"fullTime.toomuch\">It's too much! 24 is a max!</div>\n";
            styles = ".toomuchtime{border: 1.81px solid rgba(190,0,0,1);} .disabled{height:auto;} .day-edited-toomuch{color: #cc3333;font-weight: 500;}";
            calendarSheduleComponent = (function () {
                function calendarSheduleComponent(_daysService, _lifetargetService) {
                    this._daysService = _daysService;
                    this._lifetargetService = _lifetargetService;
                    this.mainTarget = [];
                    this.impAndUrgTargets = [];
                    this.urgTargets = [];
                    this.impTargets = [];
                    this.nonimpAndNonurgTargets = [];
                    this.fullTime = {
                        count: 0,
                        toomuch: false
                    };
                    this.closeDay = new core_1.EventEmitter();
                    this.saveDay = new core_1.EventEmitter();
                    this.lifeTarget = this._lifetargetService.getTargets();
                    this.idealRoutine = this._daysService.getIdealRoutine();
                }
                calendarSheduleComponent.prototype.ngOnInit = function () {
                };
                calendarSheduleComponent.prototype.ngOnChanges = function () {
                    this.mainTarget = [];
                    this.impAndUrgTargets = [];
                    this.urgTargets = [];
                    this.impTargets = [];
                    this.nonimpAndNonurgTargets = [];
                    var doings = this.data.doings;
                    for (var i in doings) {
                        if (doings[i].main == true) {
                            this.mainTarget.push(doings[i]);
                        }
                        else if (doings[i].urgent == true) {
                            if (doings[i].important == true)
                                this.impAndUrgTargets.push(doings[i]);
                            else {
                                this.urgTargets.push(doings[i]);
                            }
                        }
                        else {
                            if (doings[i].important == true) {
                                this.impTargets.push(doings[i]);
                            }
                            else {
                                this.nonimpAndNonurgTargets.push(doings[i]);
                            }
                        }
                    }
                    this.todayRoutine = this.data.routine[0].doing ? this.data.routine : this.idealRoutine
                        .map(function (global) {
                        return {
                            doing: global.doing,
                            time: global.time
                        };
                    });
                    this.onTimeChanged();
                };
                calendarSheduleComponent.prototype.onCloseDay = function () {
                    this.closeDay.emit(false);
                };
                calendarSheduleComponent.prototype.onTimeChanged = function () {
                    var c = this.data.doings;
                    var i = this.todayRoutine;
                    this.fullTime.count = 0;
                    for (var cur in c)
                        this.fullTime.count += c[cur].time;
                    for (var cur in i)
                        this.fullTime.count += i[cur].time;
                    if (this.fullTime.count > 24) {
                        this.fullTime.toomuch = true;
                    }
                    else {
                        this.fullTime.toomuch = false;
                    }
                };
                calendarSheduleComponent.prototype.onSaveDay = function (day) {
                    if (!this.fullTime.toomuch) {
                        var targets = [this.mainTarget, this.impAndUrgTargets, this.urgTargets, this.impTargets, this.nonimpAndNonurgTargets];
                        for (var t in targets) {
                            for (var c in targets[t]) {
                                this.lifeTarget.globalTargets[targets[t][c].global].time += targets[t][c].time;
                            }
                        }
                        this._lifetargetService.updateLifeTarget(this.lifeTarget);
                        day.done = true;
                        day.routine = this.todayRoutine;
                        this.saveDay.emit(day);
                        var ir = this.idealRoutine;
                        var tr = this.todayRoutine;
                        for (var i in ir) {
                            this.idealRoutine[i].fullTime += tr[i].time;
                            this.idealRoutine[i].fullDays += 1;
                        }
                        this._daysService.updateIdealRoutine(this.idealRoutine);
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], calendarSheduleComponent.prototype, "data", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], calendarSheduleComponent.prototype, "closeDay", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], calendarSheduleComponent.prototype, "saveDay", void 0);
                calendarSheduleComponent = __decorate([
                    core_1.Component({
                        selector: 'shedule',
                        template: template,
                        styles: [styles],
                        providers: [targets_service_1.LifetargetService, days_service_1.DaysService],
                        directives: [calendar_doing_component_1.calendarDoingComponent]
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