import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {IDay, IDoing, ILifeTarget, IIdealRoutine} from '../../../services/app-types'
import {DaysService} from '../../../services/days/days.service';
import {LifetargetService} from '../../../services/targets/targets.service';
const template = `
    <table class="table">
        <thead>
            <tr>
                <td class="ta-center"><h3>Routine</h3></td>
                <td class="ta-center"><h3>Ideal time</h3></td>
                <td class="ta-center"><h3>Today time</h3></td>
                <td class="ta-center"><h3>Targets</h3></td>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="#r of idealRoutine; #i = index">
                <td>{{r.doing}}</td>
                <td class="ta-center">{{r.time}}</td>
                <td><input  class="ta-center" [(ngModel)]="todayRoutine[i].time" type="number" value="" /></td>
                <td *ngIf="i == 0" [attr.rowspan]="idealRoutine.length">
                    <div  class="ta-center" *ngFor="#doing of data.doings">
                        <label class="calendar__routine_label">{{doing.description}}</label><input type="checkbox" [(ngModel)]="doing.done" />
                    </div>    
                </td>
            </tr>
        </tbody>
    </table>
    <div class="btn btn-success" (click)="onSaveDay(data)">Save changes</div>
`
const styles = ``
@Component({
    selector:'shedule',
    template:template,
    providers:[LifetargetService, DaysService]
})
export class calendarSheduleComponent{
    lifeTarget:ILifeTarget;
    idealRoutine:IIdealRoutine[];
    todayRoutine = [];
    @Input() data;
    constructor(private _daysService: DaysService, private _lifetargetService: LifetargetService){
        this.lifeTarget = this._lifetargetService.getTargets();
        this.idealRoutine = this._daysService.getIdealRoutine();
        this.todayRoutine = this.idealRoutine
            .map(function(global){
                return {
                    doing: global.doing,
                    time: ''
                }
                
            })
    }
    ngOnChanges(){
        this.todayRoutine = this.idealRoutine
            .map(function(global){
                return {
                    doing: global.doing,
                    time: ''
                }
                
            })
    }
    onSaveDay(){
        var ir = this.idealRoutine; var tr = this.todayRoutine;
        for(var i in ir){
            this.idealRoutine[i].fullTime += tr[i].time;
        }
        this._daysService.updateIdealRoutine(this.idealRoutine);
    }
    
}