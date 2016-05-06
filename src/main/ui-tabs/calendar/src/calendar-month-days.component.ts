import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {DaysService, DAYS, MONTH} from '../../../services/days/days.service';
import {IDay, IMonth, IDoing, IWeek} from '../../../services/app-types'
import {calendarWeeksComponent} from './calendar-weeks.component'
import {calendarMonthDoingsComponent} from './calendar-month-doings.component'

const WEEK = ['SU','MO','TU','WE','TH','FR','SA'];

const template = `
    <div class="calendar__month calendar__month-{{editWeeksBoo}}">
        <month-doings (monthDoingDelete)="onMonthDoingDelete($event)" (editMonthDoings)="onEditMonthDoings($event)" class="calendar__month_block col-xs-12" [data]="monthDoings"></month-doings>
        <div>
            <div *ngIf="!editWeeksBoo" class="col-xs-9 nopadding bg-white">
                <div class="calendar__month_weekdays nopadding col-xs-12">
                    <div class="btn calendar__month_weekdays-each" *ngFor="#day of weekDays">{{day}}</div>
                </div>
                <div class="col-xs-12 calendar__month_days nopadding" *ngIf="!editWeeksBoo">
                    <div class="calendar__cell" *ngFor="#day of data.days">
                        <p class="calendar__cell_date">{{day.date.number < 10 ? 0 : ''}}{{day.date.number}}</p>
                        <p (click)="onEditDay(day)" class="calendar__cell_add"></p>
                        <p (click)="onSelectDay(day)" class="calendar__cell_doings-qty">{{day.doings.length}}</p>
                        <div class="calendar__cell_deadlines" *ngIf="day.deadlines.length > 0">
                            <span class="calendar__cell_deadlines-title">Deadlines</span>
                            <ul class="calendar__cell_deadlines-list">
                                <li *ngFor="#deadline of day.deadlines" class="calendar__cell_deadlines-item">
                                    <p class="calendar__cell_deadlines-item-name">{{deadline.title}}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <weeks (editWeeks)="onEditWeeks($event)" class="col-xs-3 left-silver calendar__weeks" [ngClass]="{calendar__weeks_edit: editWeeksBoo}" [data]="data.weeks"></weeks>
        </div>
    </div>`
@Component({
    selector: 'month-days',
    providers:[DaysService],
    template: template,
    directives:[calendarWeeksComponent, calendarMonthDoingsComponent]
})
export class CalendarMonthDaysComponent{
    monthDoings = [];
    editWeeksBoo = false;
    weekDays = WEEK;
    monthName: string;
    @Input() data;
    @Output() editDay = new EventEmitter<any>()
    @Output() selectDay = new EventEmitter<any>()
    
    constructor(private _daysService: DaysService){
        
    }
    
    ngOnInit(){
        this.ngOnChanges();
    }
    
    ngOnChanges(){
        if(this.monthDoings.length > 0){
            this.monthDoings = this.data.doings;
        }else{
            this.monthDoings[0] = {month:this.data.index,description:'',important:true,urgent:true,main:false,target:'',global:0,time:0};
        }
        switch(this.data.days[0].date.month){
            case 0:this.monthName = 'January';break;
            case 1:this.monthName = 'February';break;
            case 2:this.monthName = 'March';break;
            case 3:this.monthName = 'April';break;
            case 4:this.monthName = 'May';break;
            case 5:this.monthName = 'June';break;
            case 6:this.monthName = 'Jule';break;
            case 7:this.monthName = 'August';break;
            case 8:this.monthName = 'September';break;
            case 9:this.monthName = 'October';break;
            case 10:this.monthName = 'November';break;
            case 11:this.monthName = 'December';break;
        }
    }
    
    onEditMonthDoings(doings){
        this.data.doings = doings;
        this._daysService.updateMonthDoings();
    }
    
    onMonthDoingDelete(doings){
        this.data.doings = doings;
        this._daysService.updateMonthDoings();
    }
    
    onEditWeeks(boo){
        this.editWeeksBoo = boo;
    }
    
    onEditDay(day){
        this.editDay.emit(day);
    }
    onSelectDay(day){
        this.selectDay.emit(day);
    }
}