import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {ILifeTarget, IShortTarget, IWeek, IDoing} from '../../../services/app-types'
import {DaysService, WEEK} from '../../../services/days/days.service';

const styles = `
    .calendar__weeks_block-true{max-height:none;padding: 20px;}
    `
const template = `
    <div class="btn btn-primary calendar__weeks_edit-button" (click)="onEditWeekDoings(weekDoingsEdit.show)">{{weekDoingsEdit.text}}</div>
    <div *ngFor="#week of data; #weekIdx = index">
        <div class="calendar__weeks_block calendar__weeks_block-{{editWeeksInner}}">
            <div *ngIf="!weekDoingsEdit.show">
                <p *ngFor="#doing of week.doings">
                    <label class="calendar__routine_label">{{doing.description}}</label><input type="checkbox" [(ngModel)]="doing.done" />
                </p>
            </div>
            <div *ngIf="weekDoingsEdit.show">
                <div *ngFor="#doing of week.doings; #i = index" class="calendar__current_line">
                    <input class="calendar__current_doing" [(ngModel)]="doing.description" />
                    <span>Important?</span> <input type="checkbox" [(ngModel)]="doing.important" />
                    <span>Urgent?</span> <input type="checkbox" [(ngModel)]="doing.urgent" />
                    <input type="number" class="calendar__current_plantime" value="{{doing.planTime}}" />
                    <div (click)="onDoingDelete(week, i)" *ngIf="week.doings.length > 1" class="btn btn-danger calendar__current_delete">X</div>
                </div>
                <div (click)="onWeekDoingAdd(week)" class="btn btn-success calendar__current_add-doing">Add Week Doing</div>
            </div>
        </div>
    </div>`
    
@Component({
    selector:'weeks',
    template:template,
    styles:[styles]
})
export class calendarWeeksComponent{
    weeks: IWeek[] = WEEK;
    editWeeksInner:boolean = false;
    @Input() data;
    @Output() editWeeks = new EventEmitter<boolean>();
    weekDoingsEdit = {
        text:'Add week\'s doings',
        show:false
    }
        
    constructor(private _daysService: DaysService){}
    
    onDoingDelete(week, i){
        week.doings.splice(i,1);
        this._daysService.updateWeeks(this.data);
    }
    
    onWeekDoingAdd(week, doing){
        week.doings.push({description:'',important:false,urgent:false,target:''});
        this._daysService.updateWeeks(this.data);
    }
    
    onEditWeekDoings(boo){
        this.editWeeks.emit(boo);
        this.weekDoingsEdit.text = boo ? 'Add week\'s doings' : 'Back';
        this.weekDoingsEdit.show = !this.weekDoingsEdit.show;
        this.editWeeksInner = !this.editWeeksInner;
    }
    
}