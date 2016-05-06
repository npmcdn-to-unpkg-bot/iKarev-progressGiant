System.register(["angular2/core"], function(exports_1, context_1) {
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
    var SortDatePipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            SortDatePipe = (function () {
                function SortDatePipe() {
                }
                SortDatePipe.prototype.transform = function (array, args) {
                    array.sort(function (a, b) {
                        var ad = a.deadline;
                        var bd = b.deadline;
                        var aDate = new Date(ad.year, ad.month, ad.number).getTime();
                        var bDate = new Date(bd.year, bd.month, bd.number).getTime();
                        return aDate > bDate;
                    });
                    return array;
                };
                SortDatePipe = __decorate([
                    core_1.Pipe({ name: "sortdate" }), 
                    __metadata('design:paramtypes', [])
                ], SortDatePipe);
                return SortDatePipe;
            }());
            exports_1("SortDatePipe", SortDatePipe);
        }
    }
});
//# sourceMappingURL=date.pipe.js.map