System.register(['angular2/core', '../../../pipes/date.pipe', '../../../services/days/days.service'], function(exports_1, context_1) {
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
    var core_1, date_pipe_1, days_service_1;
    var template, shortTargetComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (date_pipe_1_1) {
                date_pipe_1 = date_pipe_1_1;
            },
            function (days_service_1_1) {
                days_service_1 = days_service_1_1;
            }],
        execute: function() {
            template = "\n        <h4 class=\"lifetarget__form_label\">Add short targets to the long target \"{{data.target}}\"</h4>\n        <div class=\"block-shadow fleft col-xs-5 lifetarget__shorttarget_block\">\n            <form #newDoingForm=\"ngForm\" class=\"lifetarget__short_block\">\n                <p>Target title: <input class=\"lifetarget__short_target\" [(ngModel)]=\"selectedShortTargets.target\" /></p>\n                <div class=\"lifetarget__short_deadline\">\n                    <h4 class=\"disp-ib lifetarget__short_deadline-target\">Deadline:</h4>\n                    <p class=\"disp-ib lifetarget__short_deadline-date\">Month: <input class=\"lifetarget__short_deadline-input\" [(ngModel)]=\"selectedShortTargets.deadline.month\" />\n                    Day: <input class=\"lifetarget__short_deadline-input\" [(ngModel)]=\"selectedShortTargets.deadline.number\" />\n                    Year: <input class=\"lifetarget__short_deadline-input\" [(ngModel)]=\"selectedShortTargets.deadline.year\" /></p>\n                </div>\n                <p>Why? Explain in a several words how this taget can help you to reach the long target</p>\n                <textarea class=\"lifetarget__short_why\" [(ngModel)]=\"selectedShortTargets.why\"></textarea>\n                <div class=\"nopadding col-xs-12\">\n                    <div (click)=\"onBackToLongTargets()\" class=\"btn btn-default\">Back</div>\n                    <div (click)=\"onAddShortTarget(selectedShortTargets)\" class=\"btn btn-primary lifetarget__short_save\">Add short target</div>\n                </div>\n            </form>\n        </div>\n        <div class=\"block-shadow col-xs-7 lifetarget__shorttarget_table\">\n            <table class=\"table\">\n                <thead class=\"thead\" class=\"lifetarget__short_table-header\">\n                    <tr>\n                        <td rowspan=\"2\" class=\"lifetarget__short_table-header-td\">Name of target</td>\n                        <td rowspan=\"2\" class=\"lifetarget__shorttarget_table-date lifetarget__short_table-header-td\">Quantity of doings</td>\n                        <td class=\"lifetarget__shorttarget_table-date-thead\" colspan=\"3\">Deadline</td>\n                        <td rowspan=\"2\" class=\"lifetarget__short_table-header-td\">Why you need it?</td>\n                        <td class=\"lifetarget__shorttarget_table-buttons\" rowspan=\"2\"></td>\n                    </tr>\n                    <tr>\n                        <td class=\"lifetarget__shorttarget_table-date\">Month</td>\n                        <td class=\"lifetarget__shorttarget_table-date\">Number</td>\n                        <td class=\"lifetarget__shorttarget_table-date\">Year</td>\n                    </tr>\n                </thead>\n                <tbody *ngIf=\"isShortTargets\">\n                    <tr *ngFor=\"#shortTarget of data.shortTargets | sortdate; #i = index\" [ngClass]=\"{targetdone:shortTarget.done}\">\n                        <td class=\"lifetarget__shorttarget_table-title\"><p>{{shortTarget.target}}</p><label>{{shortTarget.target}}</label></td>\n                        <td class=\"lifetarget__shorttarget_table-date ta-center\">{{shortTarget.doings.length}}</td>\n                        <td class=\"lifetarget__shorttarget_table-date ta-center\">{{shortTarget.deadline.month}}</td>\n                        <td class=\"lifetarget__shorttarget_table-date ta-center\">{{shortTarget.deadline.number}}</td>\n                        <td class=\"lifetarget__shorttarget_table-date ta-center\">{{shortTarget.deadline.year}}</td>\n                        <td class=\"lifetarget__shorttarget_table-why\"><p>{{shortTarget.why}}</p><label class=\"left\">{{shortTarget.why}}</label></td>\n                        <td class=\"lifetarget__shorttarget_table-buttons\">\n                            <div (click)=\"onTargetDelete(i)\" class=\"btn btn-default calendar__current_delete\"></div>\n                            <div (click)=\"onTargetDone(shortTarget)\" [ngClass]=\"{isntdone:!shortTarget.done,isdone:shortTarget.done}\" class=\"btn btn-default calendar__current_button \"></div>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n    ";
            shortTargetComponent = (function () {
                function shortTargetComponent(_daysService) {
                    this._daysService = _daysService;
                    this.selectedShortTargets = { target: '', deadline: { year: 0, month: 0, weekday: 0, number: 0 }, doings: [], why: '', done: false };
                    this.backToLongTargets = new core_1.EventEmitter();
                    this.saveShortTargets = new core_1.EventEmitter();
                }
                shortTargetComponent.prototype.ngOnInit = function () {
                    if (this.data.shortTargets[0].target)
                        this.isShortTargets = true;
                    this.calendar = this._daysService.getMonth();
                    this.firstMonth = this.calendar[0].days[0].date.month;
                    console.log(this.data);
                };
                shortTargetComponent.prototype.onBackToLongTargets = function () {
                    this.backToLongTargets.emit(false);
                };
                shortTargetComponent.prototype.onAddShortTarget = function (short) {
                    if (!this.data.shortTargets[0].target)
                        this.data.shortTargets[0] = short;
                    else
                        this.data.shortTargets.push(short);
                    this.selectedShortTargets = { target: '', deadline: { year: 0, month: 0, weekday: 0, number: 0 }, doings: [], why: '', done: false };
                    this.saveShortTargets.emit(true);
                    for (var m in this.calendar) {
                        if (this.firstMonth + parseInt(m) == parseInt(short.deadline.month)) {
                            for (var d in this.calendar[m].days) {
                                if (this.calendar[m].days[d].date.number == short.deadline.number) {
                                    this._daysService.month[m].days[d].deadlines.push({ date: short.deadline, title: short.target });
                                }
                            }
                        }
                    }
                    this._daysService.updateDay();
                };
                shortTargetComponent.prototype.onTargetDelete = function (i) {
                    this.data.shortTargets.splice(i, 1);
                    this.saveShortTargets.emit(true);
                };
                shortTargetComponent.prototype.onTargetDone = function (target) {
                    target.done = !target.done;
                    this.saveShortTargets.emit(true);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], shortTargetComponent.prototype, "backToLongTargets", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], shortTargetComponent.prototype, "saveShortTargets", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], shortTargetComponent.prototype, "data", void 0);
                shortTargetComponent = __decorate([
                    core_1.Component({
                        selector: 'short-targets',
                        template: template,
                        providers: [days_service_1.DaysService],
                        pipes: [date_pipe_1.SortDatePipe]
                    }), 
                    __metadata('design:paramtypes', [days_service_1.DaysService])
                ], shortTargetComponent);
                return shortTargetComponent;
            }());
            exports_1("shortTargetComponent", shortTargetComponent);
        }
    }
});
//# sourceMappingURL=lifetarget-shorttargets.component.js.map