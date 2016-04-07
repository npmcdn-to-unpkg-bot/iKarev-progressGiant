import {Component, AfterViewChecked, Input, NgZone} from 'angular2/core';
import {DaysService} from '../../services/days/days.service';
import {IDay} from '../../services/app-types'
import {BarchartWidgetComponent} from './widgets/barchart-widget.component'

const template = `
    <div class="widget-item-view">
        <barchart-widget [data]="routine"></barchart-widget>
    </div>`
const styles = ``

//*ngIf="type == 'BarChart'" 

@Component({
    selector: 'stat',
    providers:[DaysService],
    template: template,
    styles:[styles],
    directives:[BarchartWidgetComponent]
})

export class StatisticComponent {
    routine;
    constructor(private _daysService: DaysService){
        this.routine = _daysService.getIdealRoutine();
    }
}