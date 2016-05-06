import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {IShortTarget, IMonth} from '../../../services/app-types'
import {SortDatePipe} from '../../../pipes/date.pipe'
import {DaysService, DAYS, MONTH} from '../../../services/days/days.service';

const template = `
        <h4 class="lifetarget__form_label">Add short targets to the long target "{{data.target}}"</h4>
        <div class="block-shadow fleft col-xs-5 lifetarget__shorttarget_block">
            <form #newDoingForm="ngForm" class="lifetarget__short_block">
                <p>Target title: <input class="lifetarget__short_target" [(ngModel)]="selectedShortTargets.target" /></p>
                <div class="lifetarget__short_deadline">
                    <h4 class="disp-ib lifetarget__short_deadline-target">Deadline:</h4>
                    <p class="disp-ib lifetarget__short_deadline-date">Month: <input class="lifetarget__short_deadline-input" [(ngModel)]="selectedShortTargets.deadline.month" />
                    Day: <input class="lifetarget__short_deadline-input" [(ngModel)]="selectedShortTargets.deadline.number" />
                    Year: <input class="lifetarget__short_deadline-input" [(ngModel)]="selectedShortTargets.deadline.year" /></p>
                </div>
                <p>Why? Explain in a several words how this taget can help you to reach the long target</p>
                <textarea class="lifetarget__short_why" [(ngModel)]="selectedShortTargets.why"></textarea>
                <div class="nopadding col-xs-12">
                    <div (click)="onBackToLongTargets()" class="btn btn-default">Back</div>
                    <div (click)="onAddShortTarget(selectedShortTargets)" class="btn btn-primary lifetarget__short_save">Add short target</div>
                </div>
            </form>
        </div>
        <div class="block-shadow col-xs-7 lifetarget__shorttarget_table">
            <table class="table">
                <thead class="thead" class="lifetarget__short_table-header">
                    <tr>
                        <td rowspan="2" class="lifetarget__short_table-header-td">Name of target</td>
                        <td rowspan="2" class="lifetarget__shorttarget_table-date lifetarget__short_table-header-td">Quantity of doings</td>
                        <td class="lifetarget__shorttarget_table-date-thead" colspan="3">Deadline</td>
                        <td rowspan="2" class="lifetarget__short_table-header-td">Why you need it?</td>
                        <td class="lifetarget__shorttarget_table-buttons" rowspan="2"></td>
                    </tr>
                    <tr>
                        <td class="lifetarget__shorttarget_table-date">Month</td>
                        <td class="lifetarget__shorttarget_table-date">Number</td>
                        <td class="lifetarget__shorttarget_table-date">Year</td>
                    </tr>
                </thead>
                <tbody *ngIf="isShortTargets">
                    <tr *ngFor="#shortTarget of data.shortTargets | sortdate; #i = index" [ngClass]="{targetdone:shortTarget.done}">
                        <td class="lifetarget__shorttarget_table-title"><p>{{shortTarget.target}}</p><label>{{shortTarget.target}}</label></td>
                        <td class="lifetarget__shorttarget_table-date ta-center">{{shortTarget.doings.length}}</td>
                        <td class="lifetarget__shorttarget_table-date ta-center">{{shortTarget.deadline.month}}</td>
                        <td class="lifetarget__shorttarget_table-date ta-center">{{shortTarget.deadline.number}}</td>
                        <td class="lifetarget__shorttarget_table-date ta-center">{{shortTarget.deadline.year}}</td>
                        <td class="lifetarget__shorttarget_table-why"><p>{{shortTarget.why}}</p><label class="left">{{shortTarget.why}}</label></td>
                        <td class="lifetarget__shorttarget_table-buttons">
                            <div (click)="onTargetDelete(i)" class="btn btn-default calendar__current_delete"></div>
                            <div (click)="onTargetDone(shortTarget)" [ngClass]="{isntdone:!shortTarget.done,isdone:shortTarget.done}" class="btn btn-default calendar__current_button "></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

@Component({
    selector:'short-targets',
    template:template,
    providers:[DaysService],
    pipes: [SortDatePipe]
})
export class shortTargetComponent{
    isShortTargets: boolean;
    firstMonth: number;
    calendar: any;
    selectedShortTargets: IShortTarget = {target:'',deadline: {year:0,month:0,weekday:0,number:0}, doings: [],why: '',done:false};
    @Output() backToLongTargets = new EventEmitter<boolean>();
    @Output() saveShortTargets = new EventEmitter<boolean>();
    @Input() data;
    
    constructor(private _daysService: DaysService){}
    
    ngOnInit(){
        if (this.data.shortTargets[0].target) this.isShortTargets = true;
        this.calendar = this._daysService.getMonth();
        this.firstMonth = this.calendar[0].days[0].date.month;
        console.log(this.data);
    }
    
    onBackToLongTargets(){
        this.backToLongTargets.emit(false);
    }
    
    onAddShortTarget(short){
        if(!this.data.shortTargets[0].target) this.data.shortTargets[0] = short; else this.data.shortTargets.push(short);
        this.selectedShortTargets = {target:'',deadline: {year:0,month:0,weekday:0,number:0}, doings: [],why: '',done:false};
        this.saveShortTargets.emit(true);
        for(var m in this.calendar){
            if(this.firstMonth + parseInt(m) == parseInt(short.deadline.month)){
                for(var d in this.calendar[m].days){
                    if(this.calendar[m].days[d].date.number == short.deadline.number){
                        this._daysService.month[m].days[d].deadlines.push({date:short.deadline,title:short.target});
                    }
                }
            }
        }
        this._daysService.updateDay();
    }
    
    onTargetDelete(i){
        this.data.shortTargets.splice(i,1);
        this.saveShortTargets.emit(true);
    }
    
    onTargetDone(target){
        target.done = !target.done;
        this.saveShortTargets.emit(true);
    }
    
}