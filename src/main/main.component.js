System.register(['angular2/core', './main.ui_tabs', './ui-tabs/calendar/calendar.component', './ui-tabs/lifetarget/lifetarget.component', './ui-tabs/stat/stat.component'], function(exports_1, context_1) {
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
    var core_1, main_ui_tabs_1, calendar_component_1, lifetarget_component_1, stat_component_1;
    var Detail, positions, mainComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (main_ui_tabs_1_1) {
                main_ui_tabs_1 = main_ui_tabs_1_1;
            },
            function (calendar_component_1_1) {
                calendar_component_1 = calendar_component_1_1;
            },
            function (lifetarget_component_1_1) {
                lifetarget_component_1 = lifetarget_component_1_1;
            },
            function (stat_component_1_1) {
                stat_component_1 = stat_component_1_1;
            }],
        execute: function() {
            Detail = (function () {
                function Detail() {
                }
                return Detail;
            }());
            positions = [{ x: 0, y: 0, width: 2, height: 2 }, { x: 0, y: 2, width: 5, height: 1 }, { x: 2, y: 1, width: 3, height: 2 }, { x: 5, y: 0, width: 3, height: 3 }];
            mainComponent = (function () {
                function mainComponent() {
                    this.event = { pageX: 1 };
                    this.details = [];
                    this.positions = positions;
                    this.text = '';
                    this.id = 0;
                    this.timelineContainerSize = 100;
                }
                mainComponent.prototype.resizeAll = function (event) {
                    this.event = event;
                };
                mainComponent.prototype.onPositionChanged = function (e) {
                    console.log(e);
                };
                mainComponent = __decorate([
                    core_1.Component({
                        selector: 'app',
                        template: "\n    <ui-tabs>\n      <template ui-pane title='Calendar' active=\"active\">\n        <calendar class=\"calendar\">Spreadsheet in loading...</calendar>\n      </template>\n      <template ui-pane title='Lifetarget'>\n        <lifetarget>Lifetarget in loading...</lifetarget>\n      </template>\n      <template ui-pane title='Statistic'>\n        <stat>Statistic in loading...</stat>\n      </template>\n    </ui-tabs>\n    ",
                        directives: [main_ui_tabs_1.UiTabs, main_ui_tabs_1.UiPane, stat_component_1.StatisticComponent, calendar_component_1.CalendarComponent, lifetarget_component_1.LifetargetComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], mainComponent);
                return mainComponent;
            }());
            exports_1("mainComponent", mainComponent);
        }
    }
});
//# sourceMappingURL=main.component.js.map