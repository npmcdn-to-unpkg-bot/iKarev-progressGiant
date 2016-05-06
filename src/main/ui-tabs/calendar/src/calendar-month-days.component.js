System.register(['angular2/core', '../../../services/days/days.service', './calendar-weeks.component', './calendar-month-doings.component'], function(exports_1, context_1) {
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
    var core_1, days_service_1, calendar_weeks_component_1, calendar_month_doings_component_1;
    var WEEK, template, CalendarMonthDaysComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (days_service_1_1) {
                days_service_1 = days_service_1_1;
            },
            function (calendar_weeks_component_1_1) {
                calendar_weeks_component_1 = calendar_weeks_component_1_1;
            },
            function (calendar_month_doings_component_1_1) {
                calendar_month_doings_component_1 = calendar_month_doings_component_1_1;
            }],
        execute: function() {
            WEEK = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
            template = "\n    <div class=\"calendar__month calendar__month-{{editWeeksBoo}}\">\n        <month-doings (monthDoingDelete)=\"onMonthDoingDelete($event)\" (editMonthDoings)=\"onEditMonthDoings($event)\" class=\"calendar__month_block col-xs-12\" [data]=\"monthDoings\"></month-doings>\n        <div>\n            <div *ngIf=\"!editWeeksBoo\" class=\"col-xs-9 nopadding bg-white\">\n                <div class=\"calendar__month_weekdays nopadding col-xs-12\">\n                    <div class=\"btn calendar__month_weekdays-each\" *ngFor=\"#day of weekDays\">{{day}}</div>\n                </div>\n                <div class=\"col-xs-12 calendar__month_days nopadding\" *ngIf=\"!editWeeksBoo\">\n                    <div class=\"calendar__cell\" *ngFor=\"#day of data.days\">\n                        <p class=\"calendar__cell_date\">{{day.date.number < 10 ? 0 : ''}}{{day.date.number}}</p>\n                        <p (click)=\"onEditDay(day)\" class=\"calendar__cell_add\"></p>\n                        <p (click)=\"onSelectDay(day)\" class=\"calendar__cell_doings-qty\">{{day.doings.length}}</p>\n                        <div class=\"calendar__cell_deadlines\" *ngIf=\"day.deadlines.length > 0\">\n                            <span class=\"calendar__cell_deadlines-title\">Deadlines</span>\n                            <ul class=\"calendar__cell_deadlines-list\">\n                                <li *ngFor=\"#deadline of day.deadlines\" class=\"calendar__cell_deadlines-item\">\n                                    <p class=\"calendar__cell_deadlines-item-name\">{{deadline.title}}</p>\n                                </li>\n                            </ul>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <weeks (editWeeks)=\"onEditWeeks($event)\" class=\"col-xs-3 left-silver calendar__weeks\" [ngClass]=\"{calendar__weeks_edit: editWeeksBoo}\" [data]=\"data.weeks\"></weeks>\n        </div>\n    </div>";
            CalendarMonthDaysComponent = (function () {
                function CalendarMonthDaysComponent(_daysService) {
                    this._daysService = _daysService;
                    this.monthDoings = [];
                    this.editWeeksBoo = false;
                    this.weekDays = WEEK;
                    this.editDay = new core_1.EventEmitter();
                    this.selectDay = new core_1.EventEmitter();
                }
                CalendarMonthDaysComponent.prototype.ngOnInit = function () {
                    this.ngOnChanges();
                };
                CalendarMonthDaysComponent.prototype.ngOnChanges = function () {
                    if (this.monthDoings.length > 0) {
                        this.monthDoings = this.data.doings;
                    }
                    else {
                        this.monthDoings[0] = { month: this.data.index, description: '', important: true, urgent: true, main: false, target: '', global: 0, time: 0 };
                    }
                    switch (this.data.days[0].date.month) {
                        case 0:
                            this.monthName = 'January';
                            break;
                        case 1:
                            this.monthName = 'February';
                            break;
                        case 2:
                            this.monthName = 'March';
                            break;
                        case 3:
                            this.monthName = 'April';
                            break;
                        case 4:
                            this.monthName = 'May';
                            break;
                        case 5:
                            this.monthName = 'June';
                            break;
                        case 6:
                            this.monthName = 'Jule';
                            break;
                        case 7:
                            this.monthName = 'August';
                            break;
                        case 8:
                            this.monthName = 'September';
                            break;
                        case 9:
                            this.monthName = 'October';
                            break;
                        case 10:
                            this.monthName = 'November';
                            break;
                        case 11:
                            this.monthName = 'December';
                            break;
                    }
                };
                CalendarMonthDaysComponent.prototype.onEditMonthDoings = function (doings) {
                    this.data.doings = doings;
                    this._daysService.updateMonthDoings();
                };
                CalendarMonthDaysComponent.prototype.onMonthDoingDelete = function (doings) {
                    this.data.doings = doings;
                    this._daysService.updateMonthDoings();
                };
                CalendarMonthDaysComponent.prototype.onEditWeeks = function (boo) {
                    this.editWeeksBoo = boo;
                };
                CalendarMonthDaysComponent.prototype.onEditDay = function (day) {
                    this.editDay.emit(day);
                };
                CalendarMonthDaysComponent.prototype.onSelectDay = function (day) {
                    this.selectDay.emit(day);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], CalendarMonthDaysComponent.prototype, "data", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], CalendarMonthDaysComponent.prototype, "editDay", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], CalendarMonthDaysComponent.prototype, "selectDay", void 0);
                CalendarMonthDaysComponent = __decorate([
                    core_1.Component({
                        selector: 'month-days',
                        providers: [days_service_1.DaysService],
                        template: template,
                        directives: [calendar_weeks_component_1.calendarWeeksComponent, calendar_month_doings_component_1.calendarMonthDoingsComponent]
                    }), 
                    __metadata('design:paramtypes', [days_service_1.DaysService])
                ], CalendarMonthDaysComponent);
                return CalendarMonthDaysComponent;
            }());
            exports_1("CalendarMonthDaysComponent", CalendarMonthDaysComponent);
        }
    }
});
//# sourceMappingURL=calendar-month-days.component.js.map