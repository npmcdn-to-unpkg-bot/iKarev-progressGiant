System.register(['angular2/core', '../../../services/days/days.service', '../../../services/targets/targets.service', './calendar-target.component'], function(exports_1, context_1) {
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
    var core_1, days_service_1, targets_service_1, calendar_target_component_1;
    var template, calendarDayComponent;
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
            function (calendar_target_component_1_1) {
                calendar_target_component_1 = calendar_target_component_1_1;
            }],
        execute: function() {
            template = "\n        <h2>{{data.date.month}}.{{data.date.number}}.{{data.date.year}}</h2><div (click)=\"onBackButton()\" class=\"btn btn-primary p-abs calendar__current_back\">Back</div>\n        <form #newDoingForm=\"ngForm\" class=\"col-xs-5 calendar__current_form\">\n            <h3>New Doing</h3>\n            <div class=\"col-xs-12\">\n                <div>\n                    <label class=\"calendar__current_form-label\" for=\"newdoing-important\">Is it important?</label>\n                    <input type=\"checkbox\" id=\"newdoing-important\"\n                        ngControl=\"importantControl\"\n                        [(ngModel)]=\"newDoing.important\"\n                    />\n                </div>\n                <div>\n                    <label class=\"calendar__current_form-label\" for=\"newdoing-urgent\">Is it urgent?</label>\n                    <input type=\"checkbox\" id=\"newdoing-urgent\"\n                        ngControl=\"urgentControl\" \n                        [(ngModel)]=\"newDoing.urgent\"\n                    />\n                </div>\n                <div>\n                    <label class=\"calendar__current_form-label\" for=\"newdoing-description\">Description</label>\n                    <input type=\"text\" id=\"newdoing-description\" \n                        required \n                        ngControl=\"descriptionControl\" \n                        [(ngModel)]=\"newDoing.description\"\n                    />\n                </div>\n                <div>\n                    <label class=\"calendar__current_form-label\" for=\"newdoing-target\">Choose target</label>\n                    <input id=\"newdoing-target\" \n                        required \n                        ngControl=\"targetControl\" \n                        [(ngModel)]=\"newDoing.target\" \n                        *ngIf=\"!selectTargetIsActive\"\n                        (focus)=\"selectTargetIsActive = true\"\n                    />\n                    <select-target class=\"calendar__current_form-select\" *ngIf=\"selectTargetIsActive\" [data]=\"lifeTarget\" (selectedTarget)=\"onSelectShortTarget($event)\"></select-target>\n                    \n                    \n                </div>\n            </div>\n            <div (click)=\"onDoingAdd(data.index, newDoing, $event)\" class=\"btn btn-success calendar__current_add-doing\">Plan Doing</div>\n        </form>\n        <div class=\"col-xs-7 calendar__current_details\">\n            <h3>Doings</h3>\n            <div class=\"col-xs-12\">\n                <div *ngFor=\"#doing of data.doings; #i = index\" class=\"calendar__current_line\">\n                    <input class=\"calendar__current_doing\" [(ngModel)]=\"doing.description\" />\n                    <span class=\"calendar__current_doing_label calendar__current_doing_important-{{doing.important}}\">I</span>\n                    <span class=\"calendar__current_doing_label calendar__current_doing_urgent-{{doing.urgent}}\">U</span>\n                    <input class=\"calendar__current_plantime\" value=\"{{doing.planTime}}\" />\n                    <div (click)=\"onDoingDelete(i)\" class=\"btn btn-danger calendar__current_delete\">X</div>\n                </div>\n            </div>\n            \n        </div>";
            calendarDayComponent = (function () {
                function calendarDayComponent(_daysService, _lifetargetService) {
                    this._daysService = _daysService;
                    this._lifetargetService = _lifetargetService;
                    this.backToMonth = new core_1.EventEmitter();
                    this.newDoing = { description: '', important: false, target: '', urgent: false };
                }
                calendarDayComponent.prototype.ngOnInit = function () {
                    this.lifeTarget = this._lifetargetService.getTargets();
                };
                calendarDayComponent.prototype.onBackButton = function () {
                    this.backToMonth.emit(false);
                };
                calendarDayComponent.prototype.onDoingDelete = function (i) {
                    this.data.doings.splice(i, 1);
                    this._daysService.updateDay();
                };
                calendarDayComponent.prototype.onSelectShortTarget = function (obj) {
                    this.newDoing.target = obj.content.target;
                    this.selectTargetIsActive = false;
                    console.log(obj.content);
                    this.globalIndex = obj.global;
                    this.longIndex = obj.long;
                    this.shortIndex = obj.short;
                };
                calendarDayComponent.prototype.onDoingAdd = function (i, newDo, event) {
                    var targets = this.lifeTarget.globalTargets;
                    for (var i_1 in targets) {
                        if (targets[i_1].target == newDo.target) {
                        }
                    }
                    var newDoing = {
                        description: newDo.description,
                        important: newDo.important,
                        urgent: newDo.urgent,
                        target: newDo.target
                    };
                    this.lifeTarget.globalTargets[this.globalIndex].longTargets[this.longIndex].shortTargets[this.shortIndex].doings.push(newDoing);
                    this._daysService.insertDoing(i, newDoing);
                    this._lifetargetService.updateLifeTarget(this.lifeTarget);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], calendarDayComponent.prototype, "backToMonth", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], calendarDayComponent.prototype, "data", void 0);
                calendarDayComponent = __decorate([
                    core_1.Component({
                        selector: 'current-day',
                        template: template,
                        providers: [targets_service_1.LifetargetService],
                        directives: [calendar_target_component_1.calendarTargetComponent]
                    }), 
                    __metadata('design:paramtypes', [days_service_1.DaysService, targets_service_1.LifetargetService])
                ], calendarDayComponent);
                return calendarDayComponent;
            }());
            exports_1("calendarDayComponent", calendarDayComponent);
        }
    }
});
//# sourceMappingURL=calendar-day.component.js.map