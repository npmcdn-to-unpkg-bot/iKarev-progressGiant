System.register(['angular2/core', '../../services/days/days.service', './src/calendar-day.component', './src/calendar-shedule.component', './src/ideal-routine.component', './src/calendar-month-doings.component', './src/calendar-month-days.component'], function(exports_1, context_1) {
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
    var core_1, days_service_1, calendar_day_component_1, calendar_shedule_component_1, ideal_routine_component_1, calendar_month_doings_component_1, calendar_month_days_component_1;
    var styles, CalendarComponent;
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
            function (calendar_month_doings_component_1_1) {
                calendar_month_doings_component_1 = calendar_month_doings_component_1_1;
            },
            function (calendar_month_days_component_1_1) {
                calendar_month_days_component_1 = calendar_month_days_component_1_1;
            }],
        execute: function() {
            styles = "\n    .left-silver{border-left:1px solid silver;}\n    shedule{float: left;width: 100%;position: relative;}\n";
            CalendarComponent = (function () {
                function CalendarComponent(_daysService) {
                    this._daysService = _daysService;
                    this.monthDoings = [];
                    this.idealText = "To the Ideal Routine";
                    this.isShowShedule = false;
                    this.isIdealRoutine = false;
                    this.showCurrent = false;
                    this.days = [];
                    this.month = _daysService.getMonth();
                    for (var i in this.month)
                        this.monthDoings[i] = this.month[i].doings;
                    if (_daysService.getIdealRoutine()[0].doing) {
                        this.isIdealRoutine = !this.isIdealRoutine;
                    }
                    if (this.currentMonth == undefined) {
                        this.currentMonth = this.month[0];
                    }
                }
                CalendarComponent.prototype.onAddMonth = function () {
                    var days = [];
                    var weeks = [];
                    var doings = [];
                    var daysQty;
                    var newMonth = this.month[this.month.length - 1].days[0].date.month + 1;
                    switch (newMonth) {
                        case 1:
                            daysQty = 28;
                            break;
                        case 3:
                        case 5:
                        case 7:
                        case 9:
                        case 11:
                            daysQty = 30;
                            break;
                        default: daysQty = 31;
                    }
                    for (var i = 0; i < daysQty; i++)
                        days[i] = { index: i, date: { year: 2016, month: newMonth, number: i + 1, weekday: (i + 1) % 7 }, doings: [], done: false, routine: [{ doing: '', time: 0 }] };
                    for (var i = 0; i < 5; i++)
                        weeks[i] = { month: this.month.length, doings: [{ description: '', month: newMonth, important: true, urgent: true, main: false, global: 0, target: '', time: 0 }] };
                    doings = [{ month: this.month[this.month.length - 1].index + 1, description: '', important: true, urgent: true, main: false, target: '', global: 0, time: 0 }];
                    console.log(newMonth);
                    this.month.push({ index: newMonth, days: days, weeks: weeks, doings: doings });
                    this._daysService.updateDay();
                    this._daysService.updateWeeks();
                    this._daysService.updateMonthDoings();
                };
                CalendarComponent.prototype.onCloseDay = function () {
                    this.isShowShedule = false;
                };
                CalendarComponent.prototype.onSaveDay = function (e) {
                    this._daysService.updateDay();
                    this.selectDayShedule = this.days[e.index];
                };
                CalendarComponent.prototype.onDoingDelete = function (i) {
                    console.log(this.month[0].doings);
                    this.month[0].doings.splice(i, 1);
                    this._daysService.updateDay();
                };
                CalendarComponent.prototype.onEditDay = function (day) {
                    this.editDayDoings = day;
                    this.showCurrent = true;
                };
                CalendarComponent.prototype.onBackToMonth = function (boo) {
                    this.showCurrent = boo;
                };
                CalendarComponent.prototype.onSelectDay = function (day) {
                    this.isShowShedule = true;
                    this.selectDayShedule = day;
                };
                CalendarComponent.prototype.onIdealRoutineSave = function () {
                    if (this.isIdealRoutine == false) {
                        this.idealText = "To the Ideal Routine";
                    }
                    this.isIdealRoutine = !this.isIdealRoutine;
                };
                CalendarComponent.prototype.setMonthName = function (i) {
                    var monthName;
                    switch (i) {
                        case 0:
                            monthName = 'January';
                            break;
                        case 1:
                            monthName = 'February';
                            break;
                        case 2:
                            monthName = 'March';
                            break;
                        case 3:
                            monthName = 'April';
                            break;
                        case 4:
                            monthName = 'May';
                            break;
                        case 5:
                            monthName = 'June';
                            break;
                        case 6:
                            monthName = 'Jule';
                            break;
                        case 7:
                            monthName = 'August';
                            break;
                        case 8:
                            monthName = 'September';
                            break;
                        case 9:
                            monthName = 'October';
                            break;
                        case 10:
                            monthName = 'November';
                            break;
                        case 11:
                            monthName = 'December';
                            break;
                    }
                    return monthName;
                };
                CalendarComponent = __decorate([
                    core_1.Component({
                        selector: 'calendar',
                        providers: [days_service_1.DaysService],
                        template: "\n    <div class=\"calendar__monthes col-xs-12\" *ngIf=\"!showCurrent && isIdealRoutine && !isShowShedule\" >\n        <section *ngFor=\"#m of month; #mIndex = index\" (click)=\"currentMonth = m\" [ngClass]=\"{active: m == currentMonth}\" class=\"calendar__monthes_item\">\n            <p class=\"calendar__monthes_item-p\">{{setMonthName(m.days[0].date.month)}}</p>\n        </section>\n        <div (click)=\"onAddMonth()\" class=\"calendar__monthes_add btn\">+</div>\n    </div>\n    <ideal-routine (idealRoutineSave)=\"onIdealRoutineSave()\" *ngIf=\"!isIdealRoutine\"></ideal-routine>\n    <month-days [hidden]=\"showCurrent || !isIdealRoutine || isShowShedule\" (selectDay)=\"onSelectDay($event)\" (editDay)=\"onEditDay($event)\" [data]=\"currentMonth\"></month-days>\n    <current-day (backToMonth)=\"onBackToMonth(boolean)\" *ngIf=\"showCurrent\" class=\"calendar__current_day p-rel\" [data]=\"editDayDoings\"></current-day>\n    <shedule (closeDay)=\"onCloseDay()\" (saveDay)=\"onSaveDay($event)\" class=\"calendar__shedule\" [data]=\"selectDayShedule\" *ngIf=\"!showCurrent && selectDayShedule && isShowShedule\"></shedule>\n    <button class=\"btn calendar__to-ideal p-abs btn-default\" [hidden]=\"showCurrent || !isIdealRoutine\" *ngIf=\"isIdealRoutine\" (click)=\"isIdealRoutine = false\">{{idealText}}</button>\n    ",
                        styles: [styles],
                        directives: [calendar_month_days_component_1.CalendarMonthDaysComponent, calendar_day_component_1.calendarDayComponent, calendar_shedule_component_1.calendarSheduleComponent, ideal_routine_component_1.idealRoutineComponent, calendar_month_doings_component_1.calendarMonthDoingsComponent]
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