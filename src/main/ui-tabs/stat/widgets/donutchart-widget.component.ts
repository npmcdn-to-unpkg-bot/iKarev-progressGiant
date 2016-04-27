import {Component, Input} from "angular2/core";
import {HighchartsWidgetComponent} from "./highcharts-widget.component";

const template = `
    <highcharts-widget [data]="htData"></highcharts-widget>
`;

const HIGHCHARTS_GAUGE_OPTIONS = {
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

const globalTargetsMap = function(data){
    var mergedData = {
        data:[]
    }
    for(var g = 0; g < data.length; g++){
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
        mergedData.data.push([data[g].target,data[g].time]);
    }
    return {
        series: [{
            name: 'spent hours',
            data: mergedData.data
        }]
    };
}

@Component({
  selector: "donutchart-widget",
  template: template,
  directives: [HighchartsWidgetComponent]
})

export class DonutchartWidgetComponent {
    @Input() data;
    private htData;
    ngOnInit(){
        this.htData = HIGHCHARTS_GAUGE_OPTIONS;
        this.htData = (<any>Highcharts).merge(HIGHCHARTS_GAUGE_OPTIONS, globalTargetsMap(this.data));
    }
}
