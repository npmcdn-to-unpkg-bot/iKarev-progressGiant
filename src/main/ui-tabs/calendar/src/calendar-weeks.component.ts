import {Component, Input, Output, EventEmitter, ElementRef} from 'angular2/core';
import {ILifeTarget, IShortTarget, IWeek, IDoing} from '../../../services/app-types'
import {DaysService, WEEK} from '../../../services/days/days.service';

const styles = `
    .border{width:100%;}
    .border .calendar__weeks_label{width:80%;margin: 10px 0 0 5%;}
    .border .calendar__weeks_input{width:8%;text-align:center;margin:10px 0 10px 2%;}
`
const template = `
    <div [ngClass]="{weeksdoingsedit:weekDoingsEdit.show,weeksdoingsback:!weekDoingsEdit.show}" [attr.weeksMarker]="data[0] ? data[0].month : 0" class="btn calendar__weeks_edit-button" (click)="onEditWeekDoings(weekDoingsEdit.show)">{{weekDoingsEdit.text}}</div>
    <div *ngFor="#week of data; #weekIdx = index">
        <div class="calendar__weeks_block-{{weekDoingsEdit.show}}">
            <div [ngClass]="{border: weekDoingsEdit.show}" class="calendar__weeks_block" *ngIf="weekDoingsEdit.show">
                <p *ngFor="#doing of week.doings">
                    <label class="calendar__weeks_label">{{doing.description}}</label>
                    <input class="calendar__weeks_input" type="checkbox" [(ngModel)]="doing.done" />
                </p>
            </div>
            <div class="calendar__weeks_block" *ngIf="!weekDoingsEdit.show">
                <div *ngFor="#doing of week.doings; #i = index" class="calendar__current_line">
                    <input class="calendar__current_doing" [(ngModel)]="doing.description" />
                    <span>Important?</span> <input type="checkbox" [(ngModel)]="doing.important" />
                    <span>Urgent?</span> <input type="checkbox" [(ngModel)]="doing.urgent" />
                    <input type="number" class="calendar__current_plantime" value="{{doing.planTime}}" />
                    <div (click)="onDoingDelete(week, i)" *ngIf="week.doings.length > 1" class="btn btn-default calendar__current_delete"></div>
                </div>
            </div>
            <div *ngIf="!weekDoingsEdit.show" (click)="onWeekDoingAdd(week)" class="btn btn-primary calendar__current_add-doing"></div>
        </div>
    </div>`
    
@Component({
    selector:'weeks',
    template:template,
    styles:[styles]
})
export class calendarWeeksComponent{
    weeks: IWeek[] = WEEK;
    @Input() data;
    @Output() editWeeks = new EventEmitter<any>();
    currentEdit:number;
    weekDoingsEdit = {
        text:'Week\'s doings',
        show:true
    }
        
    constructor(private _daysService: DaysService, private elementRef: ElementRef){
        const container = this.elementRef.nativeElement;
    }
    
    onDoingDelete(week, i){
        week.doings.splice(i,1);
        this._daysService.updateWeeks();
    }
    
    onWeekDoingAdd(week, doing){
        week.doings.push({month:0, 
                          description:'',
                          important:false,
                          global:0,
                          urgent:false,
                          main:false,
                          target:'',
                          time:0});
        this._daysService.updateWeeks();
    }
    
    onEditWeekDoings(boo){
        console.log('onEditWeekDoings');
        if(this.weekDoingsEdit.show){
            this._daysService.updateWeeks();
        }
        this.editWeeks.emit(boo);
        this.weekDoingsEdit.text = !boo ? 'Week\'s doings' : 'Back';
        this.weekDoingsEdit.show = !this.weekDoingsEdit.show;
    }
}