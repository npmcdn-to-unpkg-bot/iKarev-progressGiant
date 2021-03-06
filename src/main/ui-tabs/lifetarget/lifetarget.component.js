System.register(['angular2/core', '../../services/targets/targets.service', './src/lifetarget-shorttargets.component'], function(exports_1, context_1) {
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
    var core_1, targets_service_1, lifetarget_shorttargets_component_1;
    var LifetargetComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (targets_service_1_1) {
                targets_service_1 = targets_service_1_1;
            },
            function (lifetarget_shorttargets_component_1_1) {
                lifetarget_shorttargets_component_1 = lifetarget_shorttargets_component_1_1;
            }],
        execute: function() {
            LifetargetComponent = (function () {
                function LifetargetComponent(_lifetargetService) {
                    this._lifetargetService = _lifetargetService;
                    this.showLong = false;
                    this.showPlan = false;
                    this.text = 'Today you starts the path to the target of your whole life';
                    this.lifeTarget = targets_service_1.LIFETARGET;
                    this.selectedLongTarget = { target: '', shortTargets: [{ target: '', deadline: { year: 0, month: 0, weekday: 0, number: 0 }, doings: [], why: '', done: false }] };
                    this.lifeTarget = _lifetargetService.getTargets();
                }
                LifetargetComponent.prototype.ngOnInit = function () {
                    this.lifeTargetIsSet = this.lifeTarget.target ? true : false;
                    this.globalTargetsIsSet = this.lifeTarget.globalTargets[0].target ? true : false;
                    this.longTargetsIsSet = this.lifeTarget.globalTargets[0].longTargets[0].target ? true : false;
                };
                LifetargetComponent.prototype.onTargetDelete = function (global, long) {
                    if (long)
                        this.lifeTarget.globalTargets[global].longTargets.splice(long, 1);
                    else
                        this.lifeTarget.globalTargets.splice(global, 1);
                };
                LifetargetComponent.prototype.onLifeTargetAdd = function () {
                    this.lifeTargetIsSet = true;
                    this.text = 'Cool! Now you have to divide the life target to several global targets';
                    this._lifetargetService.updateLifeTarget(this.lifeTarget);
                };
                LifetargetComponent.prototype.onGlobalTargetAdd = function () {
                    this.lifeTarget.globalTargets.push({ target: '', time: 0, role: '', longTargets: [{ target: '', shortTargets: [{ target: '', deadline: { year: 0, month: 0, weekday: 0, number: 0 }, doings: [], why: '', done: false }] }] });
                };
                LifetargetComponent.prototype.onLongTargetAdd = function (global, long) {
                    global.longTargets.push({ target: '', shortTargets: [{ deadline: { year: 0, month: 0, weekday: 0, number: 0 }, doings: [], why: '' }] });
                };
                LifetargetComponent.prototype.onGlobalTargetsFinish = function () {
                    this.text = 'Cool! Now devide each of the global targets to the long targets';
                    this.globalTargetsIsSet = true;
                    this._lifetargetService.updateLifeTarget(this.lifeTarget);
                };
                LifetargetComponent.prototype.onLongTargetsFinish = function () {
                    this.text = 'Great! So now you need to fill each of the long targets by short targets - step by step';
                    this.longTargetsIsSet = true;
                    this._lifetargetService.updateLifeTarget(this.lifeTarget);
                };
                LifetargetComponent.prototype.onSaveShortTargets = function (boo) {
                    this._lifetargetService.updateLifeTarget(this.lifeTarget);
                };
                LifetargetComponent.prototype.onLongTargetSelect = function (long) {
                    this.showLong = true;
                    this.selectedLongTarget = long;
                };
                LifetargetComponent.prototype.onBackToLongTargets = function () {
                    this.showLong = false;
                };
                LifetargetComponent = __decorate([
                    core_1.Component({
                        selector: 'lifetarget',
                        providers: [targets_service_1.LifetargetService],
                        template: "\n  <div>\n    <div class=\"lifetarget__set\" *ngIf=\"!showPlan\">\n        <h4 class=\"lifetarget__plot\">{{text}}</h4> \n        <form *ngIf=\"!lifeTargetIsSet\" #lifetargetForm=\"ngForm\" class=\"col-xs-5 calendar__current_form\">\n            <div>\n                <label class=\"lifetarget__form_label\" for=\"lifetarget\">Please, type the target of your life</label>\n                <input class=\"lifetarget__form_input\" type=\"text\" id=\"lifetarget\"\n                    ngControl=\"lifeTargetControl\"\n                    [(ngModel)]=\"lifeTarget.target\"\n                />\n            </div>\n            <div (click)=\"onLifeTargetAdd()\" class=\"lifetarget__form_button-add-main btn btn-primary\">Plan life target</div>\n        </form>\n        <form *ngIf=\"lifeTargetIsSet && !globalTargetsIsSet\" #globalTargetsForm=\"ngForm\" class=\"col-xs-5 calendar__current_form\">\n            <label class=\"lifetarget__form_label\">Please, type the global targets, that will help you to reach your life target</label>\n            <div class=\"calendar__current_line\" *ngFor=\"#globalTarget of lifeTarget.globalTargets; #i = index\">\n                <input class=\"lifetarget__form_input\" type=\"text\" id=\"globaltarget-i\"\n                    ngControl=\"globalTargetControl\"\n                    [(ngModel)]=\"globalTarget.target\"\n                />\n                <div (click)=\"onTargetDelete(i)\" class=\"btn btn-default calendar__current_delete\"></div>\n                <span class=\"btn btn-primary calendar__current_add-doing\" *ngIf=\"lifeTarget.globalTargets.length == i+1\" (click)=\"onGlobalTargetAdd()\"></span>\n            </div>\n            <div class=\"fleft w-100 lifetarget__form_button-block\">\n                <div class=\"btn btn-default\" (click)=\"lifeTargetIsSet = false\">Back</div>\n                <div (click)=\"onGlobalTargetsFinish()\" class=\"btn btn-primary calendar__current_button-add-main\">Plan global targets</div>\n            </div>\n        </form>\n        \n        <form *ngIf=\"lifeTargetIsSet && globalTargetsIsSet && !longTargetsIsSet\" #longTargetsForm=\"ngForm\" class=\"col-xs-5 lifetarget__longtargets\">\n            <label class=\"lifetarget__form_label\">For the each of global targets, you need to enter targets of long (3-5 years) targets.</label>\n            <div class=\"lifetarget__longtargets_block\" *ngFor=\"#globalTarget of lifeTarget.globalTargets; #iglob = index\">\n                <div class=\"w-100 btn btn-info\">{{globalTarget.target}}</div>\n                <div class=\"calendar__current_line\" *ngFor=\"#longTarget of globalTarget.longTargets; #i = index\">\n                    <input\n                        class=\"lifetarget__form_input\" \n                        type=\"text\"\n                        ngControl=\"longTargetControl\"\n                        [(ngModel)]=\"longTarget.target\"\n                    />\n                    <div (click)=\"onTargetDelete(iglob, i)\" class=\"btn btn-default calendar__current_delete\"></div>\n                    <p class=\"calendar__current_add-doing btn btn-primary\" *ngIf=\"globalTarget.longTargets.length == i+1\" (click)=\"onLongTargetAdd(globalTarget, longTarget)\"></p>\n                </div>\n            </div>\n            <div class=\"fleft w-100 lifetarget__form_button-block\">\n                <div class=\"btn btn-default\" (click)=\"globalTargetsIsSet = false\">Back</div>\n                <div (click)=\"onLongTargetsFinish()\" class=\"btn btn-primary calendar__current_button-add-main\">Plan long targets</div>\n            </div>\n        </form>\n        \n        <div *ngIf=\"lifeTargetIsSet && globalTargetsIsSet && longTargetsIsSet && !showLong\">\n            <div class=\"fleft lifetarget__longtargets_block-list col-xs-4\" *ngFor=\"#globaltarget of lifeTarget.globalTargets\">\n                <h4 class=\"lifetarget__longtargets_block-list-title\">{{globaltarget.target}}</h4>\n                <div class=\"llifetarget__longtargets_block-list-list\" *ngFor=\"#longTarget of globaltarget.longTargets\">\n                    <p class=\"lifetarget__longtargets_block-list-item btn-default\" (click)=\"onLongTargetSelect(longTarget)\">{{longTarget.target}}</p>\n                </div>\n            </div>\n            <div class=\"fleft w-100 lifetarget__form_button-block\">\n                <div class=\"btn btn-default\" (click)=\"longTargetsIsSet = false\">Back</div>\n            </div>\n        </div>\n        <short-targets (saveShortTargets)=\"onSaveShortTargets(boo)\" *ngIf=\"showLong\" (backToLongTargets)=\"onBackToLongTargets()\" [data]=\"selectedLongTarget\"></short-targets>\n        \n    </div>\n  </div>\n  ",
                        styles: ["\n    .btn-info{width:230px;}\n  "],
                        directives: [lifetarget_shorttargets_component_1.shortTargetComponent]
                    }), 
                    __metadata('design:paramtypes', [targets_service_1.LifetargetService])
                ], LifetargetComponent);
                return LifetargetComponent;
            }());
            exports_1("LifetargetComponent", LifetargetComponent);
        }
    }
});
//# sourceMappingURL=lifetarget.component.js.map