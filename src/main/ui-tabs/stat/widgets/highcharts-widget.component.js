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
    var HighchartsWidgetComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            HighchartsWidgetComponent = (function () {
                function HighchartsWidgetComponent(_element, zone) {
                    this._element = _element;
                    this.zone = zone;
                }
                HighchartsWidgetComponent.prototype.ngOnInit = function () {
                    var chart = Highcharts.chart(this._element.nativeElement, this.data);
                    /*setTimeout(()=>{
                        chart.reflow();
                    });*/
                };
                HighchartsWidgetComponent.prototype.ngAfterViewInit = function () {
                    /*
                          let chart = Highcharts.chart(this._element.nativeElement, this.data);
                    
                          setTimeout(()=>{
                              chart.reflow();
                          },100);
                    */
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], HighchartsWidgetComponent.prototype, "data", void 0);
                HighchartsWidgetComponent = __decorate([
                    core_1.Component({
                        selector: 'highcharts-widget',
                        template: ""
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, core_1.NgZone])
                ], HighchartsWidgetComponent);
                return HighchartsWidgetComponent;
            }());
            exports_1("HighchartsWidgetComponent", HighchartsWidgetComponent);
        }
    }
});
//# sourceMappingURL=highcharts-widget.component.js.map