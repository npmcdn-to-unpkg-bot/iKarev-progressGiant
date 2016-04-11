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
    var template, HIGHCHARTS_GAUGE_OPTIONS, routineMap, BarchartWidgetComponent;
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
                    type: 'bar'
                },
                title: {
                    text: 'Ideal & Real Routine Compare'
                },
                subtitle: {
                    text: 'Statstic based on last month'
                },
                xAxis: {
                    categories: [],
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Hours per day',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: ' hours',
                    enabled: true
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    },
                    series: {
                        animation: true
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 80,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: '#FFFFFF',
                    shadow: true
                },
                credits: {
                    enabled: false
                },
                series: []
            };
            routineMap = function (data) {
                var mergedData = {
                    categories: [],
                    ideal: [],
                    real: []
                };
                for (var i in data) {
                    mergedData.categories.push(data[i].doing);
                    mergedData.ideal.push(data[i].time);
                    mergedData.real.push(data[i].fullTime / data[i].fullDays);
                }
                return {
                    xAxis: {
                        categories: mergedData.categories
                    },
                    series: [{
                            name: 'Ideal Routine',
                            data: mergedData.ideal
                        }, {
                            name: 'Average Routine',
                            data: mergedData.real
                        }]
                };
            };
            BarchartWidgetComponent = (function () {
                function BarchartWidgetComponent() {
                }
                BarchartWidgetComponent.prototype.ngOnInit = function () {
                    this.htData = HIGHCHARTS_GAUGE_OPTIONS;
                    this.htData = Highcharts.merge(HIGHCHARTS_GAUGE_OPTIONS, routineMap(this.data));
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], BarchartWidgetComponent.prototype, "data", void 0);
                BarchartWidgetComponent = __decorate([
                    core_1.Component({
                        selector: "barchart-widget",
                        template: template,
                        directives: [highcharts_widget_component_1.HighchartsWidgetComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], BarchartWidgetComponent);
                return BarchartWidgetComponent;
            }());
            exports_1("BarchartWidgetComponent", BarchartWidgetComponent);
        }
    }
});
//# sourceMappingURL=barchart-widget.component.js.map