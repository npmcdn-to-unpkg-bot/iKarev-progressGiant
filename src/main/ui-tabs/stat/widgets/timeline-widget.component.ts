/// <reference path="../../../../../typings/d3/d3.d.ts" />

import {Component, Input, ElementRef} from 'angular2/core'
import * as d3 from 'd3'

const template = `
    <div id="figure" (click)="blockModify(timelineContainerSize)" style="this.margin-bottom: 50px;">
        <span class="arrow left">L</span>
        <div id="timeline">
            <figure id="scroller" class="wtr_chrt_anim">
            </figure>
        </div>
        <span class="arrow right">R</span>
    </div>
    `;
    
const objects = [
    {image:"http://www.bing.com/th?id=A0b60216aa1cfbc9166cfc90fc4cfc623&w=75&h=75&c=8&rs=1&qlt=100",text:'SomeSomeSomeSomeSomeSomeSome Text 1 Some Text 1Some Text 1 Some Text 1Some Some Text 1 Some Text 1Some Text 1 Some Text 1Some Text 1 Some Text 1Some Text 1 Some Text 1 Some Text 1 Some Text 1'},
    {image:"http://www.bing.com/th?id=A8c180336aa0a19e653b5ebdcf7cc66c1&w=75&h=75&c=8&rs=1&qlt=100",text:'Some Text 2 Some Text 2Some Text 2 Some Text 2Some Some Text 2 Some Text 2Some Text 2 Some Text 2Some Text 2 Some Text 2Some Text 2 Some Text 2 Some Text 2 Some Text 2'},
    {image:"http://www.bing.com/th?id=Abbd63488ba17a0d2adc62bfba7121436&w=75&h=75&c=8&rs=1&qlt=100",text:'Some Text 3 Some Text 3Some Text 3 Some Text 3Some Some Text 3 Some Text 3Some Text 3 Some Text 3Some Text 3 Some Text 3Some Text 3 Some Text 3 Some Text 3 Some Text 3'},
    {image:"http://www.bing.com/th?id=Ad2057ab87092319a96b6c2c3519a3d05&w=75&h=75&c=8&rs=1&qlt=100",text:'Some Text 4 Some Text 4Some Text 4 Some Text 4Some Some Text 4 Some Text 4Some Text 4 Some Text 4Some Text 4 Some Text 4Some Text 4 Some Text 4 Some Text 4 Some Text 4'},
    {image:"http://www.bing.com/th?id=Abfdc7c54b6f419f631468856be521966&w=75&h=75&c=8&rs=1&qlt=100",text:'Some Text 5 Some Text 5Some Text 5 Some Text 5Some Some Text 5 Some Text 5Some Text 5 Some Text 5Some Text 5 Some Text 5Some Text 5 Some Text 5 Some Text 5 Some Text 5'},
    {image:"http://www.bing.com/th?id=A97df2eaed1b6bd43da6a7b00ec231acc&w=75&h=75&c=8&rs=1&qlt=100",text:'Some Text 6 Some Text 6Some Text 6 Some Text 6Some Some Text 6 Some Text 6Some Text 6 Some Text 6Some Text 6 Some Text 6Some Text 6 Some Text 6 Some Text 6 Some Text 6'},
    {image:"http://www.bing.com/th?id=A0ece1cac2a957687936d788bd392299c&w=75&h=75&c=8&rs=1&qlt=100",text:'Some Text 7 Some Text 7Some Text 7 Some Text 7Some Some Text 7 Some Text 7Some Text 7 Some Text 7Some Text 7 Some Text 7Some Text 7 Some Text 7 Some Text 7 Some Text 7'},
    {image:"http://www.bing.com/th?id=A851a6f625440fda5906041436dc4f8d5&w=75&h=75&c=8&rs=1&qlt=100",text:'Some Text 8 Some Text 8Some Text 8 Some Text 8Some Some Text 8 Some Text 8Some Text 8 Some Text 8Some Text 8 Some Text 8Some Text 8 Some Text 8 Some Text 8 Some Text 8'},
    {image:"http://www.bing.com/th?id=A77d0af2d74bdc0b5ddf2928883ae017e&w=75&h=75&c=8&rs=1&qlt=100",text:'Some Text 9 Some Text 9Some Text 9 Some Text 9Some Some Text 9 Some Text 9Some Text 9 Some Text 9Some Text 9 Some Text 9Some Text 9 Some Text 9 Some Text 9 Some Text 9'},
    {image:"http://www.bing.com/th?id=A6c0397232a62a6407b9f3e06d2bd4081&w=75&h=75&c=8&rs=1&qlt=100",text:'Some Text 10 Some Text 10Some Text 10 Some Text 10Some Some Text 10 Some Text 10Some Text 10 Some Text 10Some Text 10 Some Text 10Some Text 10 Some Text 10 Some Text 10 Some Text 10'},
    {image:"http://www.bing.com/th?id=A1ef95a2e33846b6e36ad40e0a4b4de9f&w=75&h=75&c=8&rs=1&qlt=100",text:'Some Text 11 Some Text 11Some Text 11 Some Text 11Some Some Text 11 Some Text 11Some Text 11 Some Text 11Some Text 11 Some Text 11Some Text 11 Some Text 11 Some Text 11 Some Text 11'},
    {image:"http://www.bing.com/th?id=A5cade07394e70367d7782b7ebc1d6d5a&w=75&h=75&c=8&rs=1&qlt=100",text:'Some Text 12 Some Text 12Some Text 12 Some Text 12Some Some Text 12 Some Text 12Some Text 12 Some Text 12Some Text 12 Some Text 12Some Text 12 Some Text 12 Some Text 12 Some Text 12'},
    {image:"http://www.bing.com/th?id=A8eb23ae89dfffbd6c4117405dc1aef0c&w=75&h=75&c=8&rs=1&qlt=100",text:'Some Text 13 Some Text 13Some Text 13 Some Text 13Some Some Text 13 Some Text 13Some Text 13 Some Text 13Some Text 13 Some Text 13Some Text 13 Some Text 13 Some Text 13 Some Text 13'},
    {image:"http://www.bing.com/th?id=A5ee792a628a0c4a6c044a3258c4c4b1b&w=75&h=75&c=8&rs=1&qlt=100",text:'Some Text 14 Some Text 14Some Text 14 Some Text 14Some Some Text 14 Some Text 14Some Text 14 Some Text 14Some Text 14 Some Text 14Some Text 14 Some Text 14 Some Text 14 Some Text 14'},
    {image:"http://www.bing.com/th?id=Aaf663c4825e1d24ff7f1466774d126cc&w=75&h=75&c=8&rs=1&qlt=100",text:'Some Text 15 Some Text 15Some Text 15 Some Text 15Some Some Text 15 Some Text 15Some Text 15 Some Text 15Some Text 15 Some Text 15Some Text 15 Some Text 15 Some Text 15 Some Text 15'},
    {image:"http://www.bing.com/th?id=A0195a9644d067303bf14a035fba5335e&w=75&h=75&c=8&rs=1&qlt=100",text:'Some Text 16 Some Text 16Some Text 16 Some Text 16Some Some Text 16 Some Text 16Some Text 16 Some Text 16Some Text 16 Some Text 16Some Text 16 Some Text 16 Some Text 16 Some Text 16'}
    ];
    

    
@Component({
  selector: 'timeline-widget',
  template: template,
  providers: [ElementRef]
})
export class TimelineWidgetComponent {
  @Input() timelineContainerSize;
  elementRef: ElementRef;
  blockModify:any;
  modify:any;
  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
  }

  ngAfterViewInit(){
    
    var images = new Array(objects.length),
        texts = new Array(objects.length);
    
    for(var i in objects){
        images[i] = objects[i].image;
        texts[i] = objects[i].text.slice(0,100)+'...';
    };
    let staggered: boolean = true;
    let imageWidth: number = 75;
    let scroller: d3.Selection<any> = d3.select(this.elementRef.nativeElement).select("figure");
    let visibleWidth: number = document.getElementById("scroller").getBoundingClientRect().width;
    let spacing: number = staggered ? 114 : visibleWidth / 6 ;
    let axisExtraOffset: number = imageWidth + 10;
    let margin = {top: 20, right: axisExtraOffset , bottom:20, left: axisExtraOffset };
    let dataPoints: number = images.length;
    let data: number[] = d3.range(dataPoints);
    let fullHeight: number = 470;
    let fullWidth: number = (dataPoints + 1) * spacing;
    let width: number = fullWidth - margin.left - margin.right;
    let height: number = fullHeight - margin.top - margin.bottom;
    let thumbnailRadius: number = imageWidth/2;
    let descBoxHeight: number = thumbnailRadius * 2;
    let yAxisPosition: number = height/2;
    let translationOffset: number = 0;
    let svgParent: HTMLElement = document.getElementById("scroller");
    let parentWidth: number = 1;
    
    
    // Responsibility control ** start //
    this.blockModify = function(timelineContainerSize){
        if(timelineContainerSize.pageX != parentWidth){
            timelineContainerSize.pageX = parentWidth;
            visibleWidth = document.getElementById("scroller").getBoundingClientRect().width;
            spacing = visibleWidth / 6;
        }
    }
    setTimeout(function(){
        window.addEventListener('resize',changeWidth);
    },100);
    var changeWidth = function(){
        visibleWidth = document.getElementById("scroller").getBoundingClientRect().width;
        if (translationOffset >= fullWidth - visibleWidth ) translationOffset = fullWidth - visibleWidth;
        ScrollX(translationOffset);
    }
    d3.select('#figure').on('mouseup', function(){
        setTimeout(function(){
            changeWidth();
        },10);
    });    
    
    // Timeline management
    d3.select(".arrow.left").on("click", function() {
        setTimeout(function(){
            if(translationOffset <0){return;}
            translationOffset = translationOffset - spacing * 3;
            if(translationOffset < 0 )translationOffset = 0;
            ScrollX(translationOffset);
        },10);
    });
    
    d3.select(".arrow.right").on("click", function() { 
        setTimeout(function(){
            if(translationOffset >= fullWidth - visibleWidth) return;
            translationOffset = translationOffset + spacing * 3;
            if(translationOffset >= fullWidth - visibleWidth ) translationOffset = fullWidth - visibleWidth;
            ScrollX(translationOffset);
        },10);
    });
  
    function ScrollX(xOffset){
        let translate3D = "translate3d(" + -xOffset + "px, 0px, 0px)";
        svgParent.style['transform'] = translate3D;
        svgParent.style['-webkit-transform'] = translate3D;
        svgParent.style['-o-transform'] = translate3D;
    }
   
    let getY = function(index){
            let y = 0;
            if(!staggered){
                y = index % 2 == 1 ? 100 : -100;
            }
            else{
                switch(index % 4){
                    case 0: y = -100; break;
                    case 1: y = 100; break;
                    case 2: y = -200; break;
                    case 3: y = 200; break;
                }
            }
        return y;
    }
    
    let x = d3.scale.ordinal().domain(data).rangeRoundBands([0, width]),
        xAxis = d3.svg.axis().scale(x).orient("top"),
        svgRoot = d3.select("#scroller").append("svg").attr("width", fullWidth).attr("height", fullHeight).attr("id", "d3-plot"),
        svg = svgRoot.append("g").attr("transform", "translate(" + margin.left +  "," + margin.top + ")");

    // Middle Axis line
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate( "+ -axisExtraOffset +", 0 )")
    .append("line")
        .attr("x1", 0)
        .attr("x2", width + axisExtraOffset * 2)
        .attr("y1", yAxisPosition)
        .attr("y2", yAxisPosition)
        .attr("class","middle-line");

    // Line Connectors
    let connectorsContainer = svg.append("g")
        .attr("class", "lineContainer");

    connectorsContainer.selectAll("line")
        .data(data)
        .enter()
        .append("line")
        .attr("x2", function(d) {return x(d);})
        .attr("x1", function(d) {return x(d);})
        .attr("y1", yAxisPosition)
        .attr("y2", function(d) {return getY(d) + yAxisPosition; });

    // Axis nodes
    let nodeContainer = svg.append("g")
        .attr("class", "nodeContainer");

    nodeContainer.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) {return x(d);})
        .attr("cy", yAxisPosition)
        .attr("r", 6);

    // Thumbnail pictures
    let thumbnailContainer = svg.append("g")
        .attr("class", "thumbnailContainer")
        .attr("transform", "translate( "+ -(imageWidth + 10) +", 0 )");

    thumbnailContainer.selectAll("rect")
        .data(images)
        .enter()
        .append("svg:image")
        .attr("width", imageWidth)
        .attr("height", imageWidth)
        .attr("xlink:href", function(d){return d;})
        .attr("clip-path", function(d,i) {return "url(#mask"+ i+")";})
        .attr("x", function(d,i) {return x(i);})
        .attr("y", function(d,i) { 
            var y = getY(i);
            return yAxisPosition + ( y < 0 ?  y : y - descBoxHeight)});

    // Thumbnail Mask
    svg.append("defs")
        .selectAll("clipPath")
        .data(data)
        .enter()
        .append("clipPath")
        .attr('id', function(d,i) {return "mask"+ i;})
        .append("circle")
        .attr("r", thumbnailRadius)
        .attr("cx", function(d) {return x(d) + thumbnailRadius;})
        .attr("cy", function(d) {
            var y = getY(d);
            return yAxisPosition + y + ( y > 0 ? -thumbnailRadius : thumbnailRadius);
        });

    // Description Rectangles
    let descriptionContainer = svg.append("g")
        .attr("class", "descContainer")
        .attr("transform", "translate( "+ 15 +", 0 )");

    let descItems = descriptionContainer.selectAll("text")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function(d, i){ 
            var y = getY(d);
            y = yAxisPosition + ( y < 0 ?  y : y - descBoxHeight);
            return "translate( "+  x(d) +", "+ y +" )"; 
        } );

    // Adding Title
    descItems
        .append("text")
        .text( function(d){ return  "Candidate Title " + d;})
        .attr("class", "title")
        .attr("dy", "10");



    // Adding Body
    descItems
        .data(texts)
        .append("text")
        .text( function(d){ return d;})
        .attr("class", "desc")
        .attr("transform", "translate(0, "+ 26 +")")
        .attr("dy", "0")
        .attr("y", "0")
        .call(wrap, spacing + 50);


    function wrap(text, width) {
    text.each(function() {
        let text = d3.select(this),
            words = text.text().match(/.{20}/g).join(' ').split(/\s+/).reverse();
        let word;
        let line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
    });
    }
    
  }
}