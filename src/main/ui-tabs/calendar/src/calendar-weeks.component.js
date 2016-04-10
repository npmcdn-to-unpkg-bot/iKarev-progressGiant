System.register(['angular2/core', '../../../services/days/days.service'], function(exports_1, context_1) {
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
    var core_1, days_service_1;
    var styles, template, calendarWeeksComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (days_service_1_1) {
                days_service_1 = days_service_1_1;
            }],
        execute: function() {
            styles = "\n    .calendar__weeks_block-true{max-height:none;padding: 20px;}\n    ";
            template = "\n    <div class=\"btn btn-primary calendar__weeks_edit-button\" (click)=\"onEditWeekDoings(weekDoingsEdit.show)\">{{weekDoingsEdit.text}}</div>\n    <div *ngFor=\"#week of data; #weekIdx = index\">\n        <div class=\"calendar__weeks_block calendar__weeks_block-{{editWeeksInner}}\">\n            <div *ngIf=\"!weekDoingsEdit.show\">\n                <p *ngFor=\"#doing of week.doings\">\n                    <label class=\"calendar__routine_label\">{{doing.description}}</label><input type=\"checkbox\" [(ngModel)]=\"doing.done\" />\n                </p>\n            </div>\n            <div *ngIf=\"weekDoingsEdit.show\">\n                <div *ngFor=\"#doing of week.doings; #i = index\" class=\"calendar__current_line\">\n                    <input class=\"calendar__current_doing\" [(ngModel)]=\"doing.description\" />\n                    <span>Important?</span> <input type=\"checkbox\" [(ngModel)]=\"doing.important\" />\n                    <span>Urgent?</span> <input type=\"checkbox\" [(ngModel)]=\"doing.urgent\" />\n                    <input type=\"number\" class=\"calendar__current_plantime\" value=\"{{doing.planTime}}\" />\n                    <div (click)=\"onDoingDelete(week, i)\" *ngIf=\"week.doings.length > 1\" class=\"btn btn-danger calendar__current_delete\">X</div>\n                </div>\n                <div (click)=\"onWeekDoingAdd(week)\" class=\"btn btn-success calendar__current_add-doing\">Add Week Doing</div>\n            </div>\n        </div>\n    </div>";
            calendarWeeksComponent = (function () {
                function calendarWeeksComponent(_daysService) {
                    this._daysService = _daysService;
                    this.weeks = days_service_1.WEEK;
                    this.editWeeksInner = false;
                    this.editWeeks = new core_1.EventEmitter();
                    this.weekDoingsEdit = {
                        text: 'Add week\'s doings',
                        show: false
                    };
                }
                calendarWeeksComponent.prototype.onDoingDelete = function (week, i) {
                    week.doings.splice(i, 1);
                    this._daysService.updateWeeks(this.data);
                };
                calendarWeeksComponent.prototype.onWeekDoingAdd = function (week, doing) {
                    week.doings.push({ description: '', important: false, urgent: false, target: '', time: 0 });
                    this._daysService.updateWeeks(this.data);
                };
                calendarWeeksComponent.prototype.onEditWeekDoings = function (boo) {
                    this.editWeeks.emit(boo);
                    this.weekDoingsEdit.text = boo ? 'Add week\'s doings' : 'Back';
                    this.weekDoingsEdit.show = !this.weekDoingsEdit.show;
                    this.editWeeksInner = !this.editWeeksInner;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], calendarWeeksComponent.prototype, "data", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], calendarWeeksComponent.prototype, "editWeeks", void 0);
                calendarWeeksComponent = __decorate([
                    core_1.Component({
                        selector: 'weeks',
                        template: template,
                        styles: [styles]
                    }), 
                    __metadata('design:paramtypes', [days_service_1.DaysService])
                ], calendarWeeksComponent);
                return calendarWeeksComponent;
            }());
            exports_1("calendarWeeksComponent", calendarWeeksComponent);
        }
    }
});
//# sourceMappingURL=calendar-weeks.component.js.map