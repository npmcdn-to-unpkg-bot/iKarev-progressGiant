import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {IIdealRoutine} from '../../../services/app-types';
import {DaysService} from '../../../services/days/days.service';
const template = `
    <h3 class="col-xs-8">Before you started use calendar, you have to understand, how do you want your ideal day looks like. It's important to understand, that it will be your absolutle common day, it's not a party and not a holiday. Just one day in a long list of others. And all of them will be like this day. And all of them will be ideal. What could you do in your ideal day? <br/> Type below your main doings, and the time you spend on it.</h3>
    <table class="table">
        <thead>
            <tr>
                <td>Doings</td>
                <td>Time</td>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="#doing of doings; #i = index">
                <td>
                    <input class="calender__iroutine_doing" [(ngModel)]="doing.doing" />
                </td>
                <td>
                    <input type="number" class="calender__iroutine_time" [(ngModel)]="doing.time" />
                    <div *ngIf="doings.length > 1" class="btn p-abs calender__iroutine_delete btn-danger" (click)="onDoingDelete(i)">X</div>
                </td>
            </tr>
        </tbody>
    </table>
    <button class="btn btn-success" (click)="onAddDoing()">Add doing</button>
    <button class="btn btn-primary" (click)="onSaveIdealRoutine()">Save your ideal routine</button>`
const styles = `
        .calender__iroutine_doing{width:100%;}
        .calender__iroutine_delete{margin: -5px 0 0 7px;}`
    
@Component({
    selector:'ideal-routine',
    template:template,
    styles:[styles],
    providers:[DaysService]
})
export class idealRoutineComponent{
    @Output() idealRoutineSave = new EventEmitter<boolean>();
    doings:IIdealRoutine[];
    constructor(private _daysService: DaysService){
        this.doings = _daysService.getIdealRoutine();
    }
    onAddDoing(){
        this.doings.push({doing:'',time:0, fullTime:0, fullDays:0});
    }
    onDoingDelete(i){
        this.doings.splice(i,1);
    }
    onSaveIdealRoutine(){
        this._daysService.updateIdealRoutine(this.doings);
        this.idealRoutineSave.emit(true);
    }
}