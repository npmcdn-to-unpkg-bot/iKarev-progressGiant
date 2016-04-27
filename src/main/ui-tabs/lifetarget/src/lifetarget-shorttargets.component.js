System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var shortTargetComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            shortTargetComponent = (function () {
                function shortTargetComponent() {
                    this.selectedShortTargets = { target: '', deadline: { year: 0, month: 0, weekday: 0, number: 0 }, doings: [], why: '' };
                    this.backToLongTargets = new core_1.EventEmitter();
                    this.saveShortTargets = new core_1.EventEmitter();
                }
                shortTargetComponent.prototype.onBackToLongTargets = function () {
                    this.backToLongTargets.emit(false);
                };
                shortTargetComponent.prototype.onAddShortTarget = function (short) {
                    if (!this.data.shortTargets[0].target)
                        this.data.shortTargets[0] = short;
                    else
                        this.data.shortTargets.push(short);
                    this.selectedShortTargets = { target: '', deadline: { year: 0, month: 0, weekday: 0, number: 0 }, doings: [], why: '' };
                    this.saveShortTargets.emit(true);
                };
                shortTargetComponent.prototype.onTargetDelete = function (i) {
                    this.data.shortTargets.splice(i, 1);
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
                        template: "\n        <h2>Add short targets to the long target \"{{data.target}}\"</h2>\n        <div class=\"fleft col-xs-5 lifetaget__shorttarget_block\">\n            <form #newDoingForm=\"ngForm\" class=\"lifetarget__short_block\">\n                <p>Target title: <input class=\"lifetarget__short_target\" [(ngModel)]=\"selectedShortTargets.target\" /></p>\n                <div class=\"lifetarget__short_deadline\">\n                    <h4 lifetarget__short_deadline-target>Deadline:</h4>\n                    <p>Month: <input class=\"lifetarget__short_deadline-input\" [(ngModel)]=\"selectedShortTargets.deadline.month\" />\n                    Day: <input class=\"lifetarget__short_deadline-input\" [(ngModel)]=\"selectedShortTargets.deadline.number\" />\n                    Year: <input class=\"lifetarget__short_deadline-input\" [(ngModel)]=\"selectedShortTargets.deadline.year\" /></p>\n                </div>\n                <p>Why? Explain in a several words how this taget can help you to reach the long target</p>\n                <textarea class=\"lifetarget__short_why\" [(ngModel)]=\"selectedShortTargets.why\"></textarea>\n                <div class=\"col-xs-12\">\n                    <div (click)=\"onBackToLongTargets()\" class=\"btn btn-default\">Back</div>\n                    <div (click)=\"onAddShortTarget(selectedShortTargets)\" class=\"btn btn-primary lifetarget__short_save\">Add short target</div>\n                </div>\n            </form>\n        </div>\n        <div class=\"col-xs-7\">\n            <table class=\"table table-striped\">\n                <thead class=\"thead\" class=\"lifetarget__short_table-header\">\n                    <tr>\n                        <td rowspan=\"2\" class=\"lifetarget__short_table-header-td\">Name of target</td>\n                        <td rowspan=\"2\" class=\"lifetarget__short_table-header-td\">Quantity of doings</td>\n                        <td colspan=\"3\">Deadline</td>\n                        <td rowspan=\"2\" class=\"lifetarget__short_table-header-td\">Why you need it?</td>\n                        <td rowspan=\"2\"></td>\n                    </tr>\n                    <tr>\n                        <td>Month</td>\n                        <td>Number</td>\n                        <td>Year</td>\n                    </tr>\n                </thead>\n                <tbody *ngIf=\"data.shortTargets[0].target\">\n                    <tr *ngFor=\"#shortTarget of data.shortTargets; #i = index\">\n                        <td>{{shortTarget.target}}</td>\n                        <td>{{shortTarget.doings.length}}</td>\n                        <td class=\"ta-center\">{{shortTarget.deadline.month}}</td>\n                        <td class=\"ta-center\">{{shortTarget.deadline.number}}</td>\n                        <td class=\"ta-center\">{{shortTarget.deadline.year}}</td>\n                        <td>{{shortTarget.why}}</td>\n                        <td><div (click)=\"onTargetDelete(i)\" class=\"btn btn-danger calendar__current_delete\">X</div></td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], shortTargetComponent);
                return shortTargetComponent;
            }());
            exports_1("shortTargetComponent", shortTargetComponent);
        }
    }
});
//# sourceMappingURL=lifetarget-shorttargets.component.js.map