import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {IDay, IDoing, ILifeTarget, IIdealRoutine, ISaveDay, IDayRoutine} from '../../../services/app-types'
import {DaysService} from '../../../services/days/days.service';
import {LifetargetService} from '../../../services/targets/targets.service';

export interface ISaveDay {
    day: IDay;
    done: boolean;
}
export interface IFullTime {
        count:number;
        toomuch:boolean;
    };

const template = `
    <table class="table day-edited-{{data.done}}">
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
                <td>
                    <input *ngIf="data.done" disabled class="ta-center" [(ngModel)]="todayRoutine[i].time" type="number" value="" />
                    <input *ngIf="!data.done" [ngClass]="{toomuchtime:fullTime.toomuch}" class="ta-center" (change)="onTimeChanged()" [(ngModel)]="todayRoutine[i].time" type="number" value="" />
                </td>
                <td *ngIf="i == 0" [attr.rowspan]="idealRoutine.length">
                    <div  class="ta-center" *ngFor="#doing of data.doings; #i = index">
                        <label class="calendar__routine_label">{{doing.description}}</label>
                        <input type="checkbox" *ngIf="!data.done" [(ngModel)]="doing.done" />
                        <input type="number" *ngIf="!data.done" [ngClass]="{toomuchtime:fullTime.toomuch}" (change)="onTimeChanged()" [(ngModel)]="doing.time" />
                        <input type="checkbox" *ngIf="data.done" disabled [(ngModel)]="doing.done" />
                        <input type="number" *ngIf="data.done" disabled [(ngModel)]="doing.time" />
                    </div>    
                </td>
            </tr>
        </tbody>
    </table>
    <button class="btn btn-success" [ngClass]="{disabled:fullTime.toomuch}" (click)="onSaveDay(data)">Save changes</button>
    <div class="btn cur-def" *ngIf="!data.done">So far you've logged {{fullTime.count}} hours</div>
    <div class="btn day-edited-toomuch cur-def" *ngIf="fullTime.toomuch">It's too much! 24 is a max!</div>
`
const styles = `.toomuchtime{border: 1.81px solid rgba(190,0,0,1);} .disabled{height:auto;} .day-edited-toomuch{color: #cc3333;font-weight: 500;}`
@Component({
    selector:'shedule',
    template:template,
    styles:[styles],
    providers:[LifetargetService, DaysService]
})
export class calendarSheduleComponent {
    lifeTarget:ILifeTarget;
    idealRoutine:IIdealRoutine[];
    todayRoutine;
    fullTime = {
        count:0,
        toomuch:false
    };
    @Input() data;
    @Output() saveDay = new EventEmitter<ISaveDay>();
    constructor(private _daysService: DaysService, private _lifetargetService: LifetargetService){
        this.lifeTarget = this._lifetargetService.getTargets();
        this.idealRoutine = this._daysService.getIdealRoutine();
    }
    
    ngOnChanges(){
        console.log(this.data)
        this.todayRoutine = this.data.routine[0].doing ? this.data.routine : this.idealRoutine
            .map(function(global){
                return {
                    doing: global.doing,
                    time: ''
                }
                
            })
    }
    
    onTimeChanged(){
        var c = this.data.doings;
        var i = this.todayRoutine;
        this.fullTime.count = 0;
        for (var cur in c) this.fullTime.count += c[cur].time;
        for (var cur in i) this.fullTime.count += i[cur].time;
        if(this.fullTime.count > 24){
            this.fullTime.toomuch = true;
        }else{
            this.fullTime.toomuch = false;
        }
    }
    
    onSaveDay(day){
        if(!this.fullTime.toomuch){
            day.done = true;
            day.routine = this.todayRoutine;
            this.saveDay.emit(day);
            var ir = this.idealRoutine; var tr = this.todayRoutine;
            for(var i in ir){
                this.idealRoutine[i].fullTime += tr[i].time;
                this.idealRoutine[i].fullDays += 1;
            }
            this._daysService.updateIdealRoutine(this.idealRoutine);
        }
    }
    
}