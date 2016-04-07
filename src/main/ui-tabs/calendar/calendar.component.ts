import {Component, AfterViewChecked, Input, NgZone} from 'angular2/core';
import {DaysService, DAYS} from '../../services/days/days.service';
import {IDay} from '../../services/app-types'
import {calendarDayComponent} from './src/calendar-day.component'
import {calendarSheduleComponent} from './src/calendar-shedule.component'
import {idealRoutineComponent} from './src/ideal-routine.component'


const WEEK = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Satarday'];
@Component({
    selector: 'calendar',
    providers:[DaysService],
    template: `
    <h1>Calendar</h1><button class="btn calendar__to-ideal p-abs btn-default" *ngIf="isIdealRoutine" (click)="isIdealRoutine = false">{{idealText}}</button>
    <ideal-routine (idealRoutineSave)="onIdealRoutineSave()" *ngIf="!isIdealRoutine"></ideal-routine>
    <div *ngIf="!showCurrent && isIdealRoutine" class="calendar__month">
        <div class="calendar__cell" *ngFor="#day of days">
            <p class="calendar__cell_date">{{day.date.number < 10 ? 0 : ''}}{{day.date.number}}</p>
            <p (click)="onEditDay(day)" class="calendar__cell_add">Edit</p>
            <p (click)="onSelectDay(day)" class="calendar__cell_doings-qty">{{day.doings.length}}</p>
        </div>
    </div>
    <shedule class="calendar__shedule" [data]="selectedDay" *ngIf="!showCurrent && selectedDay"></shedule>
    <current-day (backToMonth)="onBackToMonth(boolean)" *ngIf="showCurrent" class="calendar__current_day p-rel" [data]="editededDay"></current-day>
    `,
    styles:[`.calendar__to-ideal{margin:-44px 150px;}`],
    directives:[calendarDayComponent, calendarSheduleComponent, idealRoutineComponent]
})

export class CalenderComponent implements AfterViewChecked{
    selectedDay:IDay;
    idealText:string = "To the Ideal Routine";
    isIdealRoutine: boolean = false;
    showCurrent: boolean = false;
    week = WEEK;
    days: IDay[] = [];
    editededDay:IDay;
    @Input() rows:Number;
    @Input() columns:Number;
    header = [];

    constructor(private _daysService: DaysService){
        this.days = _daysService.getDays();
        this.editededDay = this.days[0];
        if(_daysService.getIdealRoutine()[0].doing){
            this.isIdealRoutine = !this.isIdealRoutine; 
        }
    }
    
    getHeader(){
        return this.week;
    }
    
    onBackToMonth(boolean){
        this.showCurrent = boolean;
    }
    onSelectDay(day){
        this.selectedDay = day;
    }
    onEditDay(day){
        this.editededDay = day;
        this.showCurrent = true;
    }
    
    onIdealRoutineSave(){
        if(this.isIdealRoutine == false){
            this.idealText="To the Ideal Routine"
        }
        this.isIdealRoutine = !this.isIdealRoutine; 
    }
    
    onInputClick(week,day){
        let newDay: IDay = {index:(this.days[this.days.length-1].index)+1,date:{year:2016,month:4,weekday:week,number:week*7+day+1},doings:[]}
        this._daysService.insertDay(newDay);
    }
    
    ngAfterViewChecked(){}

}