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
    var template, styles, idealRoutineComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (days_service_1_1) {
                days_service_1 = days_service_1_1;
            }],
        execute: function() {
            template = "\n    <h3 class=\"col-xs-8\">Before you started use calendar, you have to understand, how do you want your ideal day looks like. It's important to understand, that it will be your absolutle common day, it's not a party and not a holiday. Just one day in a long list of others. And all of them will be like this day. And all of them will be ideal. What could you do in your ideal day? <br/> Type below your main doings, and the time you spend on it.</h3>\n    <table class=\"table\">\n        <thead>\n            <tr>\n                <td>Doings</td>\n                <td>Time</td>\n            </tr>\n        </thead>\n        <tbody>\n            <tr *ngFor=\"#doing of doings; #i = index\">\n                <td>\n                    <input class=\"calender__iroutine_doing\" [(ngModel)]=\"doing.doing\" />\n                </td>\n                <td>\n                    <input type=\"number\" class=\"calender__iroutine_time\" [(ngModel)]=\"doing.time\" />\n                    <div *ngIf=\"doings.length > 1\" class=\"btn p-abs calender__iroutine_delete btn-danger\" (click)=\"onDoingDelete(i)\">X</div>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n    <button class=\"btn btn-success\" (click)=\"onAddDoing()\">Add doing</button>\n    <button class=\"btn btn-primary\" (click)=\"onSaveIdealRoutine()\">Save your ideal routine</button>";
            styles = "\n        .calender__iroutine_doing{width:100%;}\n        .calender__iroutine_delete{margin: -5px 0 0 7px;}";
            idealRoutineComponent = (function () {
                function idealRoutineComponent(_daysService) {
                    this._daysService = _daysService;
                    this.idealRoutineSave = new core_1.EventEmitter();
                    this.doings = _daysService.getIdealRoutine();
                }
                idealRoutineComponent.prototype.onAddDoing = function () {
                    this.doings.push({ doing: '', time: 0, fullTime: 0, fullDays: 0 });
                };
                idealRoutineComponent.prototype.onDoingDelete = function (i) {
                    this.doings.splice(i, 1);
                };
                idealRoutineComponent.prototype.onSaveIdealRoutine = function () {
                    this._daysService.updateIdealRoutine(this.doings);
                    this.idealRoutineSave.emit(true);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], idealRoutineComponent.prototype, "idealRoutineSave", void 0);
                idealRoutineComponent = __decorate([
                    core_1.Component({
                        selector: 'ideal-routine',
                        template: template,
                        styles: [styles],
                        providers: [days_service_1.DaysService]
                    }), 
                    __metadata('design:paramtypes', [days_service_1.DaysService])
                ], idealRoutineComponent);
                return idealRoutineComponent;
            }());
            exports_1("idealRoutineComponent", idealRoutineComponent);
        }
    }
});
//# sourceMappingURL=ideal-routine.component.js.map