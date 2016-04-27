System.register(['angular2/core', '../../services/days/days.service', '../../services/targets/targets.service', './widgets/barchart-widget.component', './widgets/donutchart-widget.component', './widgets/timeline-widget.component', './widgets/dendrogram-widget.component'], function(exports_1, context_1) {
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
    var core_1, days_service_1, targets_service_1, barchart_widget_component_1, donutchart_widget_component_1, timeline_widget_component_1, dendrogram_widget_component_1;
    var template, styles, StatisticComponent;
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
            function (barchart_widget_component_1_1) {
                barchart_widget_component_1 = barchart_widget_component_1_1;
            },
            function (donutchart_widget_component_1_1) {
                donutchart_widget_component_1 = donutchart_widget_component_1_1;
            },
            function (timeline_widget_component_1_1) {
                timeline_widget_component_1 = timeline_widget_component_1_1;
            },
            function (dendrogram_widget_component_1_1) {
                dendrogram_widget_component_1 = dendrogram_widget_component_1_1;
            }],
        execute: function() {
            template = "\n    <div class=\"widget-item-view\">\n        <barchart-widget [data]=\"routine\"></barchart-widget>\n        <donutchart-widget [data]=\"globalTargets\"></donutchart-widget>\n        <timeline-widget [timelineContainerSize]=\"event\" (click)=\"resizeAll($event)\"></timeline-widget>\n        <dendrogram-widget [timelineContainerSize]=\"event\" (click)=\"resizeAll($event)\"></dendrogram-widget>\n    </div>";
            styles = "";
            //*ngIf="type == 'BarChart'" 
            StatisticComponent = (function () {
                function StatisticComponent(_daysService, _lifetargetService) {
                    this._daysService = _daysService;
                    this._lifetargetService = _lifetargetService;
                    this.event = { pageX: 1 };
                    this.timelineContainerSize = 100;
                    this.globalTargets = _lifetargetService.getTargets().globalTargets;
                    this.routine = _daysService.getIdealRoutine();
                }
                StatisticComponent.prototype.resizeAll = function (event) {
                    this.event = event;
                };
                StatisticComponent = __decorate([
                    core_1.Component({
                        selector: 'stat',
                        providers: [days_service_1.DaysService, targets_service_1.LifetargetService],
                        template: template,
                        styles: [styles],
                        directives: [barchart_widget_component_1.BarchartWidgetComponent, donutchart_widget_component_1.DonutchartWidgetComponent, timeline_widget_component_1.TimelineWidgetComponent, dendrogram_widget_component_1.DendrogramWidgetComponent]
                    }), 
                    __metadata('design:paramtypes', [days_service_1.DaysService, targets_service_1.LifetargetService])
                ], StatisticComponent);
                return StatisticComponent;
            }());
            exports_1("StatisticComponent", StatisticComponent);
        }
    }
});
//# sourceMappingURL=stat.component.js.map