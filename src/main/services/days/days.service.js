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
    var DAYS, MONTH, WEEK, IDEAL_ROUTINE, DaysService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            exports_1("DAYS", DAYS = []);
            exports_1("MONTH", MONTH = { days: [], weeks: [], doings: [] });
            exports_1("WEEK", WEEK = [{ doings: [{ description: '', important: true, urgent: true, global: 0, target: '', time: 0 }] }]);
            exports_1("IDEAL_ROUTINE", IDEAL_ROUTINE = []);
            DaysService = (function () {
                function DaysService() {
                    this.days = DAYS;
                    this.month = MONTH;
                    this.idealRoutine = IDEAL_ROUTINE;
                }
                DaysService.prototype.getMonth = function () {
                    if (window.localStorage["weeks"] != undefined && window.localStorage["weeks"]) {
                        this.month.weeks = JSON.parse(window.localStorage["weeks"]);
                    }
                    else {
                        this.month.weeks = [{ doings: [{ description: '', important: true, urgent: true, global: 0, target: '', time: 0 }] }, { doings: [{ description: '', important: true, urgent: true, global: 0, target: '', time: 0 }] }, { doings: [{ description: '', important: true, urgent: true, global: 0, target: '', time: 0 }] }, { doings: [{ description: '', important: true, urgent: true, global: 0, target: '', time: 0 }] }, { doings: [{ description: '', important: true, urgent: true, global: 0, target: '', time: 0 }] }];
                    }
                    if (window.localStorage["doings"] != undefined && window.localStorage["doings"]) {
                        this.month.doings = JSON.parse(window.localStorage["doings"]);
                    }
                    else {
                        this.month.doings = [{ description: '', important: true, urgent: true, target: '', global: 0, time: 0 }];
                    }
                    if (window.localStorage["days"] != undefined && window.localStorage["days"]) {
                        this.month.days = JSON.parse(window.localStorage["days"]);
                        console.log(this.month.days);
                    }
                    else {
                        var daysQty;
                        var newMonth = new Date().getMonth();
                        switch (newMonth) {
                            case 1:
                                daysQty = 28;
                                break;
                            case 3:
                                daysQty = 30;
                                break;
                            case 5:
                                daysQty = 30;
                                break;
                            case 7:
                                daysQty = 30;
                                break;
                            case 9:
                                daysQty = 30;
                                break;
                            case 11:
                                daysQty = 30;
                                break;
                            default: daysQty = 31;
                        }
                        for (var i = 0; i < daysQty; i++) {
                            this.month.days[i] = { index: i, date: { year: 2016, month: newMonth, number: i + 1, weekday: (i + 1) % 7 }, doings: [], done: false, routine: [{ doing: '', time: 0 }] };
                        }
                    }
                    return this.month;
                };
                DaysService.prototype.insertDay = function (day) {
                    Promise.resolve(this.month.days).then(function (days) { return days.push(day); });
                };
                DaysService.prototype.insertDoing = function (index, doing) {
                    var _this = this;
                    var doingsArray = this.days;
                    Promise.resolve(this.month.days).then(function (days) { days[index].doings.push(doing); doingsArray = days; });
                    setTimeout(function () {
                        _this.updateDay();
                    });
                };
                DaysService.prototype.updateDay = function () {
                    window.localStorage["days"] = JSON.stringify(this.month.days, function (key, val) {
                        if (key == '$$hashKey') {
                            return undefined;
                        }
                        return val;
                    });
                };
                DaysService.prototype.updateWeeks = function (weeks) {
                    this.month.weeks = weeks;
                    window.localStorage["weeks"] = JSON.stringify(this.month.weeks, function (key, val) {
                        if (key == '$$hashKey') {
                            return undefined;
                        }
                        return val;
                    });
                };
                DaysService.prototype.updateMonthDoings = function (doings) {
                    this.month.doings = doings;
                    window.localStorage["doings"] = JSON.stringify(this.month.doings, function (key, val) {
                        if (key == '$$hashKey') {
                            return undefined;
                        }
                        return val;
                    });
                };
                DaysService.prototype.updateIdealRoutine = function (idealRoutine) {
                    this.idealRoutine = idealRoutine;
                    window.localStorage["ideal-routine"] = JSON.stringify(this.idealRoutine, function (key, val) {
                        if (key == '$$hashKey') {
                            return undefined;
                        }
                        return val;
                    });
                };
                DaysService.prototype.getIdealRoutine = function () {
                    if (window.localStorage["ideal-routine"] != null && window.localStorage["ideal-routine"]) {
                        this.idealRoutine = JSON.parse(window.localStorage["ideal-routine"]);
                    }
                    else {
                        this.idealRoutine = [{ doing: '', time: 0, fullTime: 0, fullDays: 0 }];
                    }
                    return this.idealRoutine;
                };
                DaysService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], DaysService);
                return DaysService;
            }());
            exports_1("DaysService", DaysService);
        }
    }
});
//# sourceMappingURL=days.service.js.map