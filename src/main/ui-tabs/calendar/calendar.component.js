System.register(['angular2/core', '../../services/days/days.service', './src/calendar-day.component', './src/calendar-shedule.component', './src/ideal-routine.component'], function(exports_1, context_1) {
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
    var core_1, days_service_1, calendar_day_component_1, calendar_shedule_component_1, ideal_routine_component_1;
    var WEEK, CalenderComponent;
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
            }],
        execute: function() {
            WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Satarday'];
            CalenderComponent = (function () {
                function CalenderComponent(_daysService) {
                    this._daysService = _daysService;
                    this.idealText = "To the Ideal Routine";
                    this.isIdealRoutine = false;
                    this.showCurrent = false;
                    this.week = WEEK;
                    this.days = [];
                    this.header = [];
                    this.days = _daysService.getDays();
                    this.editededDay = this.days[0];
                    if (_daysService.getIdealRoutine()[0].doing) {
                        this.isIdealRoutine = !this.isIdealRoutine;
                    }
                }
                CalenderComponent.prototype.getHeader = function () {
                    return this.week;
                };
                CalenderComponent.prototype.onBackToMonth = function (boolean) {
                    this.showCurrent = boolean;
                };
                CalenderComponent.prototype.onSelectDay = function (day) {
                    this.selectedDay = day;
                };
                CalenderComponent.prototype.onEditDay = function (day) {
                    this.editededDay = day;
                    this.showCurrent = true;
                };
                CalenderComponent.prototype.onIdealRoutineSave = function () {
                    if (this.isIdealRoutine == false) {
                        this.idealText = "To the Ideal Routine";
                    }
                    this.isIdealRoutine = !this.isIdealRoutine;
                };
                CalenderComponent.prototype.onInputClick = function (week, day) {
                    var newDay = { index: (this.days[this.days.length - 1].index) + 1, date: { year: 2016, month: 4, weekday: week, number: week * 7 + day + 1 }, doings: [] };
                    this._daysService.insertDay(newDay);
                };
                CalenderComponent.prototype.ngAfterViewChecked = function () { };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], CalenderComponent.prototype, "rows", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], CalenderComponent.prototype, "columns", void 0);
                CalenderComponent = __decorate([
                    core_1.Component({
                        selector: 'calendar',
                        providers: [days_service_1.DaysService],
                        template: "\n    <h1>Calendar</h1><button class=\"btn calendar__to-ideal p-abs btn-default\" *ngIf=\"isIdealRoutine\" (click)=\"isIdealRoutine = false\">{{idealText}}</button>\n    <ideal-routine (idealRoutineSave)=\"onIdealRoutineSave()\" *ngIf=\"!isIdealRoutine\"></ideal-routine>\n    <div *ngIf=\"!showCurrent && isIdealRoutine\" class=\"calendar__month\">\n        <div class=\"calendar__cell\" *ngFor=\"#day of days\">\n            <p class=\"calendar__cell_date\">{{day.date.number < 10 ? 0 : ''}}{{day.date.number}}</p>\n            <p (click)=\"onEditDay(day)\" class=\"calendar__cell_add\">Edit</p>\n            <p (click)=\"onSelectDay(day)\" class=\"calendar__cell_doings-qty\">{{day.doings.length}}</p>\n        </div>\n    </div>\n    <shedule class=\"calendar__shedule\" [data]=\"selectedDay\" *ngIf=\"!showCurrent && selectedDay\"></shedule>\n    <current-day (backToMonth)=\"onBackToMonth(boolean)\" *ngIf=\"showCurrent\" class=\"calendar__current_day p-rel\" [data]=\"editededDay\"></current-day>\n    ",
                        styles: [".calendar__to-ideal{margin:-44px 150px;}"],
                        directives: [calendar_day_component_1.calendarDayComponent, calendar_shedule_component_1.calendarSheduleComponent, ideal_routine_component_1.idealRoutineComponent]
                    }), 
                    __metadata('design:paramtypes', [days_service_1.DaysService])
                ], CalenderComponent);
                return CalenderComponent;
            }());
            exports_1("CalenderComponent", CalenderComponent);
        }
    }
});
//# sourceMappingURL=calendar.component.js.map