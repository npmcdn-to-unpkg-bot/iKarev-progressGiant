System.register(['angular2/core', '../../services/days/days.service', './src/calendar-day.component', './src/calendar-shedule.component', './src/ideal-routine.component', './src/calendar-weeks.component', './src/calendar-month.component'], function(exports_1, context_1) {
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
    var core_1, days_service_1, calendar_day_component_1, calendar_shedule_component_1, ideal_routine_component_1, calendar_weeks_component_1, calendar_month_component_1;
    var WEEK, CalendarComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (days_service_1_1) {
                days_service_1 = days_service_1_1;
            },
            function (calendar_day_component_1_1) {
                calendar_day_component_1 = calendar_day_component_1_1;
            },
            function (calendar_shedule_component_1_1) {
                calendar_shedule_component_1 = calendar_shedule_component_1_1;
            },
            function (ideal_routine_component_1_1) {
                ideal_routine_component_1 = ideal_routine_component_1_1;
            },
            function (calendar_weeks_component_1_1) {
                calendar_weeks_component_1 = calendar_weeks_component_1_1;
            },
            function (calendar_month_component_1_1) {
                calendar_month_component_1 = calendar_month_component_1_1;
            }],
        execute: function() {
            WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Satarday'];
            CalendarComponent = (function () {
                function CalendarComponent(_daysService) {
                    this._daysService = _daysService;
                    this.monthDoings = [];
                    this.editWeeksBoo = true;
                    this.idealText = "To the Ideal Routine";
                    this.isIdealRoutine = false;
                    this.showCurrent = false;
                    this.weekDays = WEEK;
                    this.month = days_service_1.MONTH;
                    this.days = [];
                    this.header = [];
                    this.month = _daysService.getMonth();
                    this.monthDoings = this.month.doings;
                    this.weeks = this.month.weeks;
                    this.days = this.month.days;
                    this.editedDay = this.days ? this.days[0] : null;
                    if (_daysService.getIdealRoutine()[0].doing) {
                        this.isIdealRoutine = !this.isIdealRoutine;
                    }
                }
                CalendarComponent.prototype.onSaveDay = function (e) {
                    this._daysService.updateDay();
                    this.selectedDay = this.days[e.index];
                };
                CalendarComponent.prototype.onEditWeeks = function (boo) {
                    this.editWeeksBoo = boo;
                };
                CalendarComponent.prototype.onDoingDelete = function (i) {
                    this.month.doings.splice(i, 1);
                    this._daysService.updateDay();
                };
                CalendarComponent.prototype.onBackToMonth = function (boolean) {
                    this.showCurrent = boolean;
                };
                CalendarComponent.prototype.onSelectDay = function (day) {
                    this.selectedDay = day;
                };
                CalendarComponent.prototype.onEditDay = function (day) {
                    this.editedDay = day;
                    this.showCurrent = true;
                };
                CalendarComponent.prototype.onIdealRoutineSave = function () {
                    if (this.isIdealRoutine == false) {
                        this.idealText = "To the Ideal Routine";
                    }
                    this.isIdealRoutine = !this.isIdealRoutine;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], CalendarComponent.prototype, "rows", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], CalendarComponent.prototype, "columns", void 0);
                CalendarComponent = __decorate([
                    core_1.Component({
                        selector: 'calendar',
                        providers: [days_service_1.DaysService],
                        template: "\n    <div class=\"col-xs-6\">\n        <h1>Calendar</h1><button class=\"btn calendar__to-ideal p-abs btn-default\" *ngIf=\"isIdealRoutine\" (click)=\"isIdealRoutine = false\">{{idealText}}</button>\n    </div>\n    <month *ngIf=\"isIdealRoutine\" class=\"col-xs-6 calendar__month_block\" [data]=\"monthDoings\"></month>\n    <ideal-routine (idealRoutineSave)=\"onIdealRoutineSave()\" *ngIf=\"!isIdealRoutine\"></ideal-routine>\n    <div *ngIf=\"!showCurrent && isIdealRoutine\" class=\"calendar__month calendar__month-{{editWeeksBoo}}\">\n        <div>\n            <div class=\"calendar__month_weekdays col-xs-9\">\n                <div class=\"btn calendar__month_weekdays-each\" *ngFor=\"#day of weekDays\">{{day}}</div>\n            </div>\n            <div class=\"col-xs-3 calendar__month_week left-silver\"><div class=\"calendar__month_week-inner btn btn-default\">Weeks</div></div>\n        </div>\n        <div class=\"col-xs-9 calendar__month_days\" *ngIf=\"editWeeksBoo\">\n            <div class=\"calendar__cell\" *ngFor=\"#day of days\">\n                <p class=\"calendar__cell_date\">{{day.date.number < 10 ? 0 : ''}}{{day.date.number}}</p>\n                <p (click)=\"onEditDay(day)\" class=\"calendar__cell_add\">Edit</p>\n                <p (click)=\"onSelectDay(day)\" class=\"calendar__cell_doings-qty\">{{day.doings.length}}</p>\n            </div>\n        </div>\n        <weeks (editWeeks)=\"onEditWeeks($event)\" class=\"col-xs-3 left-silver calendar__weeks\" [ngClass]=\"{calendar__weeks_edit: !editWeeksBoo}\" [data]=\"weeks\"></weeks>\n    </div>\n    <shedule (saveDay)=\"onSaveDay($event)\" class=\"calendar__shedule\" [data]=\"selectedDay\" *ngIf=\"!showCurrent && selectedDay\"></shedule>\n    <current-day (backToMonth)=\"onBackToMonth(boolean)\" *ngIf=\"showCurrent\" class=\"calendar__current_day p-rel\" [data]=\"editedDay\"></current-day>\n    ",
                        styles: [".calendar__to-ideal{margin:-44px 150px;} .left-silver{border-left:1px solid silver;}"],
                        directives: [calendar_day_component_1.calendarDayComponent, calendar_shedule_component_1.calendarSheduleComponent, ideal_routine_component_1.idealRoutineComponent, calendar_weeks_component_1.calendarWeeksComponent, calendar_month_component_1.calendarMonthComponent]
                    }), 
                    __metadata('design:paramtypes', [days_service_1.DaysService])
                ], CalendarComponent);
                return CalendarComponent;
            }());
            exports_1("CalendarComponent", CalendarComponent);
        }
    }
});
//# sourceMappingURL=calendar.component.js.map