import {Component, Input, ElementRef, NgZone} from 'angular2/core';
import {IHighCharts} from '../../../services/app-types'

@Component({
  selector: 'highcharts-widget',
  template: ``
})
export class HighchartsWidgetComponent {

  index: number;
  @Input() data: any;

  private _sub;

  constructor(private _element: ElementRef, private zone: NgZone){
  }
  
  ngOnInit(){
      let chart = Highcharts.chart(this._element.nativeElement, this.data);

      /*setTimeout(()=>{
          chart.reflow();
      });*/
  }
  
  ngAfterViewInit() {
/*
      let chart = Highcharts.chart(this._element.nativeElement, this.data);

      setTimeout(()=>{
          chart.reflow();
      },100);
*/
  }

}