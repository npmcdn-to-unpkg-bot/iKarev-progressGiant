import {Component, AfterViewChecked, Input, NgZone} from 'angular2/core';
import {DaysService} from '../../services/days/days.service';
import {LifetargetService, LIFETARGET} from '../../services/targets/targets.service';
import {IDay, IIdealRoutine, ILifeTarget, IGlobalTarget} from '../../services/app-types'
import {BarchartWidgetComponent} from './widgets/barchart-widget.component'
import {DonutchartWidgetComponent} from './widgets/donutchart-widget.component'

const template = `
    <div class="widget-item-view">
        <barchart-widget [data]="routine"></barchart-widget>
        <donutchart-widget [data]="globalTargets"></donutchart-widget>
    </div>`
const styles = ``

//*ngIf="type == 'BarChart'" 

@Component({
    selector: 'stat',
    providers:[DaysService, LifetargetService],
    template: template,
    styles:[styles],
    directives:[BarchartWidgetComponent, DonutchartWidgetComponent]
})

export class StatisticComponent {
    routine: IIdealRoutine[];
    globalTargets: IGlobalTarget[];
    constructor(private _daysService: DaysService, private _lifetargetService: LifetargetService){
        this.globalTargets = _lifetargetService.getTargets().globalTargets;
        this.routine = _daysService.getIdealRoutine();
    }
}