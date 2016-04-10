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
    var template, calendarMonthComponent;
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
            template = "\n    <h2>Month's doings:</h2><button class=\"btn calendar__month_edit p-abs btn-primary\" (click)=\"onEditMonthDoings(monthDoingsEdit.show)\">{{monthDoingsEdit.text}}</button>\n    <hr />\n    <div *ngIf=\"!monthDoingsEdit.show\">\n        <p *ngFor=\"#doing of data\"><label class=\"calendar__routine_label\">{{doing.description}}</label><input type=\"checkbox\" [(ngModel)]=\"doing.done\" /></p>\n    </div>\n    <div *ngIf=\"monthDoingsEdit.show\">\n        <h4>Add below new doings you have to do this month</h4>\n        <div *ngFor=\"#doing of data; #i = index\" class=\"calendar__current_line\">\n            <input class=\"calendar__current_doing\" [(ngModel)]=\"doing.description\" />\n            <span>Important?</span> <input type=\"checkbox\" [(ngModel)]=\"doing.important\" />\n            <span>Urgent?</span> <input type=\"checkbox\" [(ngModel)]=\"doing.urgent\" />\n            <input id=\"newdoing-target\" \n                        [(ngModel)]=\"doing.target\" \n                        *ngIf=\"!selectTargetIsActive\"\n                        (focus)=\"selectTargetIsActive = true\"\n                    />\n            <select-target class=\"calendar__current_form-select month-select\" *ngIf=\"selectTargetIsActive\" [data]=\"lifeTarget\" (selectedTarget)=\"onSelectShortTarget(doing, $event)\"></select-target>\n            <div (click)=\"onDoingDelete(i)\" *ngIf=\"data.length > 1\" class=\"btn btn-danger calendar__current_delete\">X</div>\n        </div>\n        <div (click)=\"onMonthDoingAdd(doing)\" class=\"btn btn-success calendar__current_add-doing\">Add Month Doing</div>\n    </div>";
            calendarMonthComponent = (function () {
                function calendarMonthComponent(_daysService, _lifetargetService) {
                    this._daysService = _daysService;
                    this._lifetargetService = _lifetargetService;
                    this.selectTargetIsActive = false;
                    this.month = days_service_1.MONTH;
                    this.selectedTarget = new core_1.EventEmitter();
                    this.monthDoingsEdit = {
                        text: 'Add doings',
                        show: false
                    };
                    //this.month = this.data;
                }
                calendarMonthComponent.prototype.ngOnInit = function () {
                    this.lifeTarget = this._lifetargetService.getTargets();
                };
                calendarMonthComponent.prototype.onEditMonthDoings = function (boo) {
                    console.log(this.data);
                    this.monthDoingsEdit.text = boo ? 'Add doings' : 'Back';
                    this.monthDoingsEdit.show = !this.monthDoingsEdit.show;
                };
                calendarMonthComponent.prototype.onDoingDelete = function (i) {
                    this.data.splice(i, 1);
                    this._daysService.updateMonthDoings(this.data);
                };
                calendarMonthComponent.prototype.onMonthDoingAdd = function (doing) {
                    this.data.push({ description: '', important: false, urgent: false, target: '', time: 0 });
                    this.lifeTarget.globalTargets[this.globalIndex].longTargets[this.longIndex].shortTargets[this.shortIndex].doings.push(doing);
                    this._daysService.updateMonthDoings(this.data);
                    this._lifetargetService.updateLifeTarget(this.lifeTarget);
                };
                calendarMonthComponent.prototype.onSelectShortTarget = function (doing, obj) {
                    doing.target = obj.content.target;
                    this.selectTargetIsActive = false;
                    this.globalIndex = obj.global;
                    this.longIndex = obj.long;
                    this.shortIndex = obj.short;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], calendarMonthComponent.prototype, "data", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], calendarMonthComponent.prototype, "selectedTarget", void 0);
                calendarMonthComponent = __decorate([
                    core_1.Component({
                        selector: 'month',
                        template: template,
                        providers: [days_service_1.DaysService, targets_service_1.LifetargetService],
                        directives: [calendar_target_component_1.calendarTargetComponent]
                    }), 
                    __metadata('design:paramtypes', [days_service_1.DaysService, targets_service_1.LifetargetService])
                ], calendarMonthComponent);
                return calendarMonthComponent;
            }());
            exports_1("calendarMonthComponent", calendarMonthComponent);
        }
    }
});
//# sourceMappingURL=calendar-month.component.js.map