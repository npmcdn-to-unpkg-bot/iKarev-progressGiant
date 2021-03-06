System.register(['angular2/core', '../../../services/days/days.service', './calendar-target.component', '../../../services/targets/targets.service'], function(exports_1, context_1) {
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
    var core_1, days_service_1, calendar_target_component_1, targets_service_1;
    var template, calendarMonthDoingsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (days_service_1_1) {
                days_service_1 = days_service_1_1;
            },
            function (calendar_target_component_1_1) {
                calendar_target_component_1 = calendar_target_component_1_1;
            },
            function (targets_service_1_1) {
                targets_service_1 = targets_service_1_1;
            }],
        execute: function() {
            template = "\n    <h2 class=\"color-white\">Month's doings:</h2>\n    <div class=\"btn calendar__month_edit p-abs\" (click)=\"onEditMonthDoings(monthDoingsEdit.show)\">{{monthDoingsEdit.text}}</div>\n    <div class=\"calendar__month_doings-list\" *ngIf=\"!monthDoingsEdit.show\">\n        <p class=\"calendar__month_doing\" *ngFor=\"#doing of data\">\n            <label class=\"calendar__routine_label disp-ib\">{{doing.description}}</label>\n            <input class=\"calendar__routine_input disp-ib\" type=\"checkbox\" [(ngModel)]=\"doing.done\" />\n        </p>\n    </div>\n    <div class=\"calendar__month_block-edit\" *ngIf=\"monthDoingsEdit.show\">\n        <h4>Add below new doings you have to do this month</h4>\n        <div *ngFor=\"#doing of data; #i = index\" class=\"calendar__current_line\">\n            <input class=\"calendar__current_doing\" [(ngModel)]=\"doing.description\" />\n            <span>Important?</span> <input type=\"checkbox\" [(ngModel)]=\"doing.important\" />\n            <span>Urgent?</span> <input type=\"checkbox\" [(ngModel)]=\"doing.urgent\" />\n            <input id=\"newdoing-target\" \n                        [(ngModel)]=\"doing.target\" \n                        *ngIf=\"!selectTargetIsActive\"\n                        (focus)=\"selectTargetIsActive = true\"\n                    />\n            <select-target class=\"calendar__current_form-select month-select\" *ngIf=\"selectTargetIsActive\" [data]=\"lifeTarget\" (selectedTarget)=\"onSelectShortTarget(doing, $event)\"></select-target>\n            <div (click)=\"onDoingDelete(i)\" *ngIf=\"data.length > 1\" class=\"btn btn-default calendar__current_delete\"></div>\n            <div *ngIf=\"i+1 == data.length && doing.target\" (click)=\"onMonthDoingAdd(doing)\" class=\"btn btn-primary calendar__current_add-doing calendar__current_add-doing-monthes\"></div>\n        </div>\n    </div>";
            calendarMonthDoingsComponent = (function () {
                function calendarMonthDoingsComponent(_daysService, _lifetargetService) {
                    this._daysService = _daysService;
                    this._lifetargetService = _lifetargetService;
                    this.selectTargetIsActive = false;
                    this.month = days_service_1.MONTH;
                    this.selectedTarget = new core_1.EventEmitter();
                    this.editMonthDoings = new core_1.EventEmitter();
                    this.monthDoingDelete = new core_1.EventEmitter();
                    this.monthDoingsEdit = {
                        text: 'Edit doings',
                        show: false
                    };
                    //this.month = this.data;
                }
                calendarMonthDoingsComponent.prototype.ngOnInit = function () {
                    this.lifeTarget = this._lifetargetService.getTargets();
                };
                calendarMonthDoingsComponent.prototype.onEditMonthDoings = function (boo) {
                    this.monthDoingsEdit.text = boo ? 'Edit doings' : 'Back';
                    this.monthDoingsEdit.show = !this.monthDoingsEdit.show;
                };
                calendarMonthDoingsComponent.prototype.onDoingDelete = function (i) {
                    this.data.splice(i, 1);
                    this.monthDoingDelete.emit(this.data);
                };
                calendarMonthDoingsComponent.prototype.onMonthDoingAdd = function (doing) {
                    this.data.push({ month: this.data[0].month, global: this.globalIndex, description: '', important: false, urgent: false, target: '', time: 0, main: false });
                    console.log(doing);
                    if (doing) {
                        this.lifeTarget.globalTargets[this.globalIndex].longTargets[this.longIndex].shortTargets[this.shortIndex].doings.push(doing);
                        //this._daysService.updateMonthDoings(this.data);
                        this._lifetargetService.updateLifeTarget(this.lifeTarget);
                        this.editMonthDoings.emit(this.data);
                    }
                };
                calendarMonthDoingsComponent.prototype.onSelectShortTarget = function (doing, obj) {
                    doing.target = obj.content.target;
                    this.selectTargetIsActive = false;
                    this.globalIndex = obj.global;
                    this.longIndex = obj.long;
                    this.shortIndex = obj.short;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], calendarMonthDoingsComponent.prototype, "data", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], calendarMonthDoingsComponent.prototype, "selectedTarget", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], calendarMonthDoingsComponent.prototype, "editMonthDoings", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], calendarMonthDoingsComponent.prototype, "monthDoingDelete", void 0);
                calendarMonthDoingsComponent = __decorate([
                    core_1.Component({
                        selector: 'month-doings',
                        template: template,
                        providers: [days_service_1.DaysService, targets_service_1.LifetargetService],
                        directives: [calendar_target_component_1.calendarTargetComponent]
                    }), 
                    __metadata('design:paramtypes', [days_service_1.DaysService, targets_service_1.LifetargetService])
                ], calendarMonthDoingsComponent);
                return calendarMonthDoingsComponent;
            }());
            exports_1("calendarMonthDoingsComponent", calendarMonthDoingsComponent);
        }
    }
});
//# sourceMappingURL=calendar-month-doings.component.js.map