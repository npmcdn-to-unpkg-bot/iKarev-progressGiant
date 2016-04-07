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
    var LIFETARGET, LifetargetService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            exports_1("LIFETARGET", LIFETARGET = { target: '', globalTargets: [{ target: '', role: '', longTargets: [{ target: '', shortTargets: [{ target: '', deadline: { year: 0, month: 0, weekday: 0, number: 0 }, doings: [], why: '' }] }] }] });
            ;
            LifetargetService = (function () {
                function LifetargetService() {
                    this.lifetarget = LIFETARGET;
                }
                LifetargetService.prototype.getTargets = function () {
                    if (window.localStorage["lifetarget"] != null && window.localStorage["lifetarget"]) {
                        this.lifetarget = JSON.parse(window.localStorage["lifetarget"]);
                    }
                    return this.lifetarget;
                };
                LifetargetService.prototype.updateLifeTarget = function (newLifetarget) {
                    var _this = this;
                    Promise.resolve(this.lifetarget).then(function (lifetarget) { return lifetarget = newLifetarget; });
                    setTimeout(function () { _this.updateTargets(); });
                };
                LifetargetService.prototype.updateTargets = function () {
                    window.localStorage["lifetarget"] = JSON.stringify(this.lifetarget, function (key, val) {
                        if (key == '$$hashKey') {
                            return undefined;
                        }
                        return val;
                    });
                };
                LifetargetService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], LifetargetService);
                return LifetargetService;
            }());
            exports_1("LifetargetService", LifetargetService);
        }
    }
});
//# sourceMappingURL=targets.service.js.map