import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {IDay, IDoing, ILifeTarget, IIdealRoutine, ISaveDay, IDayRoutine} from '../../../services/app-types'
import {DaysService} from '../../../services/days/days.service';
import {LifetargetService} from '../../../services/targets/targets.service';
import {calendarDoingComponent} from './calendar-doing.component'

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
                    <input *ngIf="!data.done" class="ta-center" (change)="onTimeChanged()" [(ngModel)]="todayRoutine[i].time" type="number" value="" />
                </td>
                <td *ngIf="i == 0" [attr.rowspan]="idealRoutine.length">
                    <div *ngIf="mainTarget.length > 0">
                        <h4 class="ta-center">Main Target</h4>
                        <div class="ta-center" *ngFor="#doing of mainTarget; #i = index">
                            <doing (doingChanged)="onTimeChanged()" [doing]="doing" [data]=data></doing>
                        </div>   
                    </div>
                    <div *ngIf="impAndUrgTargets.length > 0">
                        <h4 class="ta-center">Urgent & Important</h4>
                        <div  class="ta-center" *ngFor="#doing of impAndUrgTargets; #i = index">
                            <doing (doingChanged)="onTimeChanged()" [doing]="doing" [data]=data></doing>
                        </div>   
                    </div>
                    <div *ngIf="urgTargets.length > 0">                     
                        <h4 class="ta-center">Urgent</h4>
                        <div  class="ta-center" *ngFor="#doing of urgTargets; #i = index"> 
                            <doing (doingChanged)="onTimeChanged()" [doing]="doing" [data]=data></doing>
                        </div>
                    </div>
                    <div *ngIf="impTargets.length > 0">
                        <h4 class="ta-center">Important</h4>
                        <div  class="ta-center" *ngFor="#doing of impTargets; #i = index">
                            <doing (doingChanged)="onTimeChanged()" [doing]="doing" [data]=data></doing>
                        </div>  
                    </div>
                    <div *ngIf="nonimpAndNonurgTargets.length > 0">
                        <h4 class="ta-center">Why?</h4>
                        <div  class="ta-center" *ngFor="#doing of nonimpAndNonurgTargets; #i = index">  
                            <doing (doingChanged)="onTimeChanged()" [doing]="doing" [data]=data></doing>
                        </div>  
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <button (click)="onCloseDay()" class="day__edited_back btn btn-default">Back</button>
    <button class="btn btn-success" (click)="onSaveDay(data)">Save changes</button>
    <div class="btn cur-def" *ngIf="!data.done">So far you've logged {{fullTime.count}} hours</div>
    <div class="btn day-edited-toomuch cur-def" *ngIf="fullTime.toomuch">It's too much! 24 is a max!</div>
`
const styles = `.toomuchtime{border: 1.81px solid rgba(190,0,0,1);} .disabled{height:auto;} .day-edited-toomuch{color: #cc3333;font-weight: 500;}`
@Component({
    selector:'shedule',
    template:template,
    styles:[styles],
    providers:[LifetargetService, DaysService],
    directives:[calendarDoingComponent]
})
export class calendarSheduleComponent {
    lifeTarget:ILifeTarget;
    idealRoutine:IIdealRoutine[];
    mainTarget:IDoing[] = [];
    impAndUrgTargets:IDoing[] = [];
    urgTargets:IDoing[] = [];
    impTargets:IDoing[] = [];
    nonimpAndNonurgTargets:IDoing[] = [];
    todayRoutine;
    fullTime = {
        count:0,
        toomuch:false
    };
    @Input() data;
    @Output() closeDay = new EventEmitter<boolean>();
    @Output() saveDay = new EventEmitter<ISaveDay>();
    constructor(private _daysService: DaysService, private _lifetargetService: LifetargetService){
        this.lifeTarget = this._lifetargetService.getTargets();
        this.idealRoutine = this._daysService.getIdealRoutine();
    }
    
    ngOnInit(){
    }
    
    ngOnChanges(){
        this.mainTarget = [];
        this.impAndUrgTargets = [];
        this.urgTargets = [];
        this.impTargets = [];
        this.nonimpAndNonurgTargets = [];
        var doings = this.data.doings;
        for(var i in doings){
            if (doings[i].main==true) {this.mainTarget.push(doings[i])}
            else if (doings[i].urgent==true){
                if (doings[i].important==true) this.impAndUrgTargets.push(doings[i])
                else {this.urgTargets.push(doings[i])}
            }else{
                if (doings[i].important==true) {this.impTargets.push(doings[i])}
                else {this.nonimpAndNonurgTargets.push(doings[i])}
            }
        }        
        this.todayRoutine = this.data.routine[0].doing ? this.data.routine : this.idealRoutine
            .map(function(global){
                return {
                    doing: global.doing,
                    time: global.time
                }
                
            })
        this.onTimeChanged();
    }
    
    onCloseDay(){
        this.closeDay.emit(false);
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
            var targets = [this.mainTarget, this.impAndUrgTargets, this.urgTargets, this.impTargets, this.nonimpAndNonurgTargets];
            for(var t in targets){
                for(var c in targets[t]){
                    this.lifeTarget.globalTargets[targets[t][c].global].time += targets[t][c].time;
                }
            }
            this._lifetargetService.updateLifeTarget(this.lifeTarget);
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