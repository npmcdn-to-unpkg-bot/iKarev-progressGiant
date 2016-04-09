import {Component, AfterViewChecked, Input, NgZone} from 'angular2/core';
import {DaysService, DAYS, MONTH} from '../../services/days/days.service';
import {IDay, IMonth, IDoing, IWeek} from '../../services/app-types'
import {calendarDayComponent} from './src/calendar-day.component'
import {calendarSheduleComponent} from './src/calendar-shedule.component'
import {idealRoutineComponent} from './src/ideal-routine.component'
import {calendarWeeksComponent} from './src/calendar-weeks.component'
import {calendarMonthComponent} from './src/calendar-month.component'


const WEEK = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Satarday'];
@Component({
    selector: 'calendar',
    providers:[DaysService],
    template: `
    <div class="col-xs-6">
        <h1>Calendar</h1><button class="btn calendar__to-ideal p-abs btn-default" *ngIf="isIdealRoutine" (click)="isIdealRoutine = false">{{idealText}}</button>
    </div>
    <month *ngIf="isIdealRoutine" class="col-xs-6 calendar__month_block" [data]="monthDoings"></month>
    <ideal-routine (idealRoutineSave)="onIdealRoutineSave()" *ngIf="!isIdealRoutine"></ideal-routine>
    <div *ngIf="!showCurrent && isIdealRoutine" class="calendar__month calendar__month-{{editWeeksBoo}}">
        <div>
            <div class="calendar__month_weekdays col-xs-9">
                <div class="btn calendar__month_weekdays-each" *ngFor="#day of weekDays">{{day}}</div>
            </div>
            <div class="col-xs-3 calendar__month_week left-silver"><div class="calendar__month_week-inner btn btn-default">Weeks</div></div>
        </div>
        <div class="col-xs-9 calendar__month_days" *ngIf="editWeeksBoo">
            <div class="calendar__cell" *ngFor="#day of days">
                <p class="calendar__cell_date">{{day.date.number < 10 ? 0 : ''}}{{day.date.number}}</p>
                <p (click)="onEditDay(day)" class="calendar__cell_add">Edit</p>
                <p (click)="onSelectDay(day)" class="calendar__cell_doings-qty">{{day.doings.length}}</p>
            </div>
        </div>
        <weeks (editWeeks)="onEditWeeks($event)" class="col-xs-3 left-silver calendar__weeks" [ngClass]="{calendar__weeks_edit: !editWeeksBoo}" [data]="weeks"></weeks>
    </div>
    <shedule (saveDay)="onSaveDay($event)" class="calendar__shedule" [data]="selectedDay" *ngIf="!showCurrent && selectedDay"></shedule>
    <current-day (backToMonth)="onBackToMonth(boolean)" *ngIf="showCurrent" class="calendar__current_day p-rel" [data]="editedDay"></current-day>
    `,
    styles:[`.calendar__to-ideal{margin:-44px 150px;} .left-silver{border-left:1px solid silver;}`],
    directives:[calendarDayComponent, calendarSheduleComponent, idealRoutineComponent, calendarWeeksComponent, calendarMonthComponent]
})

export class CalendarComponent{
    monthDoings: IDoing[] = [];
    editWeeksBoo:boolean = true;
    selectedDay:IDay;
    idealText:string = "To the Ideal Routine";
    isIdealRoutine: boolean = false;
    showCurrent: boolean = false;
    weekDays = WEEK;
    month: IMonth = MONTH;
    weeks: IWeek[];
    days: IDay[] = [];
    editedDay:IDay;
    @Input() rows:Number;
    @Input() columns:Number;
    header = [];

    constructor(private _daysService: DaysService){
        this.month = _daysService.getMonth();
        this.monthDoings = this.month.doings;
        this.weeks = this.month.weeks;
        this.days = this.month.days;
        this.editedDay = this.days ? this.days[0] : null;
        if(_daysService.getIdealRoutine()[0].doing){
            this.isIdealRoutine = !this.isIdealRoutine; 
        }
    }
    
    onSaveDay(e){
        this._daysService.updateDay();
        this.selectedDay = this.days[e.index];
    }
    
    onEditWeeks(boo){
        this.editWeeksBoo = boo;
    }
    
    onDoingDelete(i){
        this.month.doings.splice(i,1);
        this._daysService.updateDay();
    }
    
    onBackToMonth(boolean){
        this.showCurrent = boolean;
    }
    
    onSelectDay(day){
        this.selectedDay = day;
    }
    
    onEditDay(day){
        this.editedDay = day;
        this.showCurrent = true;
    }
    
    onIdealRoutineSave(){
        if(this.isIdealRoutine == false){
            this.idealText="To the Ideal Routine"
        }
        this.isIdealRoutine = !this.isIdealRoutine; 
    }
    
    /*onInputClick(week,day){
        let newDay: IDay = {index:(this.days[this.days.length-1].index)+1,date:{year:2016,month:4,weekday:week,number:week*7+day+1},doings:[],done:false}
        this._daysService.insertDay(newDay);
    }*/
    

}