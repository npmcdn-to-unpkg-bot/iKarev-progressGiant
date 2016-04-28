import {Component, AfterViewChecked, Input, NgZone} from 'angular2/core';
import {DaysService, DAYS, MONTH} from '../../services/days/days.service';
import {IDay, IMonth, IDoing, IWeek} from '../../services/app-types'
import {calendarDayComponent} from './src/calendar-day.component'
import {calendarSheduleComponent} from './src/calendar-shedule.component'
import {idealRoutineComponent} from './src/ideal-routine.component'
import {calendarMonthDoingsComponent} from './src/calendar-month-doings.component'
import {CalendarMonthDaysComponent} from './src/calendar-month-days.component'

const styles = `
    .calendar__to-ideal{margin:-44px 150px;} 
    .left-silver{border-left:1px solid silver;}
    shedule{float: left;width: 100%;position: relative;}
`

@Component({
    selector: 'calendar',
    providers:[DaysService],
    template: `
    <div class="col-xs-4">
        <h1>Calendar</h1>
        <button class="btn calendar__to-ideal p-abs btn-default" [hidden]="showCurrent || !isIdealRoutine" *ngIf="isIdealRoutine" (click)="isIdealRoutine = false">{{idealText}}</button>
    </div>
    <div class="calendar__monthes col-xs-8" *ngIf="!showCurrent && isIdealRoutine && !isShowShedule" >
        <section *ngFor="#m of month; #mIndex = index" (click)="currentMonth = m" class="calendar__monthes_item">
            {{setMonthName(m.days[0].date.month)}}
        </section>
        <button (click)="onAddMonth()" class="calendar__monthes_add btn btn-primary">+</button>
    </div>
    <ideal-routine (idealRoutineSave)="onIdealRoutineSave()" *ngIf="!isIdealRoutine"></ideal-routine>
    <month-days [hidden]="showCurrent || !isIdealRoutine || isShowShedule" (selectDay)="onSelectDay($event)" (editDay)="onEditDay($event)" [data]="currentMonth"></month-days>
    <current-day (backToMonth)="onBackToMonth(boolean)" *ngIf="showCurrent" class="calendar__current_day p-rel" [data]="editDayDoings"></current-day>
    <shedule (closeDay)="onCloseDay()" (saveDay)="onSaveDay($event)" class="calendar__shedule" [data]="selectDayShedule" *ngIf="!showCurrent && selectDayShedule && isShowShedule"></shedule>
    `,
    styles:[styles],
    directives:[CalendarMonthDaysComponent, calendarDayComponent, calendarSheduleComponent, idealRoutineComponent, calendarMonthDoingsComponent]
})

export class CalendarComponent{
    monthDoings = [];
    currentMonth:IMonth;
    selectDayShedule:IDay;
    idealText:string = "To the Ideal Routine";
    isShowShedule: boolean = false;
    isIdealRoutine: boolean = false;
    month: IMonth[];
    showCurrent: boolean = false;
    editDayDoings:IDay;
    weeks: IWeek[];
    days: IDay[] = [];

    constructor(private _daysService: DaysService){
        this.month = _daysService.getMonth();
        for (var i in this.month) this.monthDoings[i] = this.month[i].doings;
        if(_daysService.getIdealRoutine()[0].doing){
            this.isIdealRoutine = !this.isIdealRoutine; 
        }
        if(this.currentMonth == undefined){
            this.currentMonth = this.month[0];
        }
    }
    
    onAddMonth(){
        var days:IDay[] = [];
        var weeks:IWeek[] = [];
        var doings:IDoing[] = [];
        var daysQty: number;
        var newMonth = this.month[this.month.length - 1].days[0].date.month + 1; 
        switch (newMonth){
            case 1: daysQty = 28; break;
            case 3: case 5: case 7: case 9: case 11: daysQty = 30; break;
            default: daysQty = 31;
        }
        for(var i = 0; i < daysQty; i++) days[i] = {index:i, date:{year:2016,month:newMonth,number:i+1,weekday:(i+1)%7},doings:[],done:false, routine:[{doing:'',time:0}]};
        for(var i = 0; i < 5; i++) weeks[i] = {month:this.month.length, doings:[{description:'', month:newMonth,important:true,urgent:true,main:false,global:0,target:'',time:0}]}
        doings = [{month:this.month[this.month.length-1].index + 1,description:'',important:true,urgent:true,main:false,target:'',global:0,time:0}] 
        console.log(newMonth);
        this.month.push({index:newMonth,days:days,weeks:weeks,doings:doings});
        this._daysService.updateDay();
        this._daysService.updateWeeks();
        this._daysService.updateMonthDoings();
    }
    
    onCloseDay(){
        this.isShowShedule = false;
    }
    
    onSaveDay(e){
        this._daysService.updateDay();
        this.selectDayShedule = this.days[e.index];
    }
    
    onDoingDelete(i){
        console.log(this.month[0].doings);
        this.month[0].doings.splice(i,1);
        this._daysService.updateDay();
    }
    
    onEditDay(day){
        this.editDayDoings = day;
        this.showCurrent = true;
    }
    
    onBackToMonth(boo){
        this.showCurrent = boo;
    }
    
    onSelectDay(day){
        this.isShowShedule = true;
        this.selectDayShedule = day;
    }
    
    
    onIdealRoutineSave(){
        if(this.isIdealRoutine == false){
            this.idealText="To the Ideal Routine"
        }
        this.isIdealRoutine = !this.isIdealRoutine; 
    }
    
    setMonthName(i){
        var monthName;
        switch(i){
            case 0: monthName = 'January';break;
            case 1: monthName = 'February';break;
            case 2: monthName = 'March';break;
            case 3: monthName = 'April';break;
            case 4: monthName = 'May';break;
            case 5: monthName = 'June';break;
            case 6: monthName = 'Jule';break;
            case 7: monthName = 'August';break;
            case 8: monthName = 'September';break;
            case 9: monthName = 'October';break;
            case 10:monthName = 'November';break;
            case 11:monthName = 'December';break;
        }
        return monthName;
    }
}