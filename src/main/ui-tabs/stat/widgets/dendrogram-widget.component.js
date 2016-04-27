/// <reference path="../../../../../typings/d3/d3.d.ts" />
System.register(['angular2/core', 'd3'], function(exports_1, context_1) {
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
    var core_1, d3;
    var template, styles, DendrogramWidgetComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (d3_1) {
                d3 = d3_1;
            }],
        execute: function() {
            template = "\n        <div class=\"node\"></div>\n    ";
            ;
            styles = "\n";
            DendrogramWidgetComponent = (function () {
                function DendrogramWidgetComponent(elementRef) {
                    this.elementRef = elementRef;
                }
                DendrogramWidgetComponent.prototype.ngAfterViewInit = function () {
                    var width = 960;
                    var height = 2200;
                    var cluster = d3.layout.cluster()
                        .size([height, width - 160]);
                    var diagonal = d3.svg.diagonal()
                        .projection(function (d) { return [d.y, d.x]; });
                    var svg = d3.select("body").append("svg")
                        .attr("width", width)
                        .attr("height", height)
                        .append("g")
                        .attr("transform", "translate(40,0)");
                    d3.json('/src/main/ui-tabs/stat/mocks/dendrogram.json', function (error, root) {
                        if (error)
                            throw error;
                        var nodes = cluster.nodes(root), links = cluster.links(nodes);
                        var link = svg.selectAll(".link")
                            .data(links)
                            .enter().append("path")
                            .attr("class", "link")
                            .attr("d", diagonal);
                        var node = svg.selectAll(".node")
                            .data(nodes)
                            .enter().append("g")
                            .attr("class", "node")
                            .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; });
                        node.append("circle")
                            .attr("r", 4.5);
                        node.append("text")
                            .attr("dx", function (d) { return d.children ? -8 : 8; })
                            .attr("dy", 3)
                            .style("text-anchor", function (d) { return d.children ? "end" : "start"; })
                            .text(function (d) { return d.name; });
                    });
                    d3.select(self.frameElement).style("height", height + "px");
                };
                DendrogramWidgetComponent = __decorate([
                    core_1.Component({
                        selector: 'dendrogram-widget',
                        template: template,
                        providers: [core_1.ElementRef],
                        styles: [styles]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], DendrogramWidgetComponent);
                return DendrogramWidgetComponent;
            }());
            exports_1("DendrogramWidgetComponent", DendrogramWidgetComponent);
        }
    }
});
//# sourceMappingURL=dendrogram-widget.component.js.map