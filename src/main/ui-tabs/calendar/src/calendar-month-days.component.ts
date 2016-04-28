import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {DaysService, DAYS, MONTH} from '../../../services/days/days.service';
import {IDay, IMonth, IDoing, IWeek} from '../../../services/app-types'
import {calendarWeeksComponent} from './calendar-weeks.component'
import {calendarMonthDoingsComponent} from './calendar-month-doings.component'

const WEEK = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Satarday'];

const template = `
    <div class="calendar__month calendar__month-{{editWeeksBoo}}">
        <h2>{{monthName}} 2016</h2>
        <month-doings (monthDoingDelete)="onMonthDoingDelete($event)" (editMonthDoings)="onEditMonthDoings($event)" class="col-xs-6 calendar__month_block" [data]="monthDoings"></month-doings>
        <div *ngIf="!editWeeksBoo">
            <div class="calendar__month_weekdays col-xs-9">
                <div class="btn calendar__month_weekdays-each" *ngFor="#day of weekDays">{{day}}</div>
            </div>
            <div class="col-xs-3 calendar__month_week left-silver"><div class="calendar__month_week-inner btn btn-default">Weeks</div></div>
        </div>
        <div class="col-xs-9 calendar__month_days" *ngIf="!editWeeksBoo">
            <div class="calendar__cell" *ngFor="#day of data.days">
                <p class="calendar__cell_date">{{day.date.number < 10 ? 0 : ''}}{{day.date.number}}</p>
                <p (click)="onEditDay(day)" class="calendar__cell_add">Edit</p>
                <p (click)="onSelectDay(day)" class="calendar__cell_doings-qty">{{day.doings.length}}</p>
            </div>
        </div>
        <weeks (editWeeks)="onEditWeeks($event)" class="col-xs-3 left-silver calendar__weeks" [ngClass]="{calendar__weeks_edit: editWeeksBoo}" [data]="data.weeks"></weeks>
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