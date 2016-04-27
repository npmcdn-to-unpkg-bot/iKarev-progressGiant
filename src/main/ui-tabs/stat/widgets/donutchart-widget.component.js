System.register(["angular2/core", "./highcharts-widget.component"], function(exports_1, context_1) {
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
    var core_1, highcharts_widget_component_1;
    var template, HIGHCHARTS_GAUGE_OPTIONS, globalTargetsMap, DonutchartWidgetComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (highcharts_widget_component_1_1) {
                highcharts_widget_component_1 = highcharts_widget_component_1_1;
            }],
        execute: function() {
            template = "\n    <highcharts-widget [data]=\"htData\"></highcharts-widget>\n";
            HIGHCHARTS_GAUGE_OPTIONS = {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45
                    }
                },
                title: {
                    text: 'Full time spent on each global target'
                },
                subtitle: {
                    text: ''
                },
                plotOptions: {
                    pie: {
                        innerSize: 100,
                        depth: 45
                    }
                },
                series: [{
                        name: 'Delivered amount',
                        data: []
                    }]
            };
            globalTargetsMap = function (data) {
                var mergedData = {
                    data: []
                };
                for (var g = 0; g < data.length; g++) {
                    //var global = data[g];
                    //var time = 0;
                    /*for(var l = 0; l < global.longTargets.length; l++){
                        var long = global.longTargets[l];
                        for(var s = 0; s < long.shortTargets.length; s++){
                            var short = long.shortTargets[s];
                            for(var d = 0; d < short.doings.length; d++){
                                time += short.doings[d].time ? short.doings[d].time : 0;
                            }
                        }
                    }*/
                    mergedData.data.push([data[g].target, data[g].time]);
                }
                return {
                    series: [{
                            name: 'spent hours',
                            data: mergedData.data
                        }]
                };
            };
            DonutchartWidgetComponent = (function () {
                function DonutchartWidgetComponent() {
                }
                DonutchartWidgetComponent.prototype.ngOnInit = function () {
                    this.htData = HIGHCHARTS_GAUGE_OPTIONS;
                    this.htData = Highcharts.merge(HIGHCHARTS_GAUGE_OPTIONS, globalTargetsMap(this.data));
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], DonutchartWidgetComponent.prototype, "data", void 0);
                DonutchartWidgetComponent = __decorate([
                    core_1.Component({
                        selector: "donutchart-widget",
                        template: template,
                        directives: [highcharts_widget_component_1.HighchartsWidgetComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], DonutchartWidgetComponent);
                return DonutchartWidgetComponent;
            }());
            exports_1("DonutchartWidgetComponent", DonutchartWidgetComponent);
        }
    }
});
//# sourceMappingURL=donutchart-widget.component.js.map