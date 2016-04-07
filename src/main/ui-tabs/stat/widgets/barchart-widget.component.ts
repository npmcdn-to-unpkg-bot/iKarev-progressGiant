import {Component, Input} from "angular2/core";
import {HighchartsWidgetComponent} from "./highcharts-widget.component";

const template = `
    <highcharts-widget [data]="htData"></highcharts-widget>
`;

const HIGHCHARTS_GAUGE_OPTIONS = {
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
            series:{
                animation:true
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
            backgroundColor:  '#FFFFFF',
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: []
};

const routineMap = function(data){
    var mergedData = {
        categories:[],
        ideal:[],
        real:[]
    }
    for(var i in data){
        mergedData.categories.push(data[i].doing);
        mergedData.ideal.push(data[i].time);
        mergedData.real.push(data[i].fullTime / 4)
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
}

@Component({
  selector: "barchart-widget",
  template: template,
  directives: [HighchartsWidgetComponent]
})

export class BarchartWidgetComponent {
    @Input() data;
    private htData;
    ngOnInit(){
        this.htData = HIGHCHARTS_GAUGE_OPTIONS;
        console.log(this.data);
        this.htData = (<any>Highcharts).merge(HIGHCHARTS_GAUGE_OPTIONS, routineMap(this.data));
    }
}
