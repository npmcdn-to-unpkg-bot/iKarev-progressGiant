import {Component, Input, Output, EventEmitter} from 'angular2/core'
import {UiTabs, UiPane} from './main.ui_tabs'
import {CalendarComponent} from './ui-tabs/calendar/calendar.component'
import {LifetargetComponent} from './ui-tabs/lifetarget/lifetarget.component'
import {StatisticComponent} from './ui-tabs/stat/stat.component'

class Detail {
  title: string;
  text: string;
}

const positions = [{x:0,y:0,width:2,height:2},{x:0,y:2,width:5,height:1},{x:2,y:1,width:3,height:2},{x:5,y:0,width:3,height:3}];

@Component({
  selector: 'app',
  template: `
    <ui-tabs>
      <template ui-pane title='Calendar' active="active">
        <calendar class="calendar">Spreadsheet in loading...</calendar>
      </template>
      <template ui-pane title='Lifetarget'>
        <lifetarget>Lifetarget in loading...</lifetarget>
      </template>
      <template ui-pane title='Statistic'>
        <stat>Statistic in loading...</stat>
      </template>
    </ui-tabs>
    `,
    directives: [UiTabs, UiPane, StatisticComponent, CalendarComponent, LifetargetComponent]
})
export class mainComponent {
  event:any = {pageX:1};
  details: Detail[] = [];
  positions = positions;
  text:string = '';
  id: number = 0;
  timelineContainerSize: number = 100;
  
  constructor() {}
  
  resizeAll(event){
      this.event = event;
  }
  onPositionChanged(e){
  }
  
}