import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {ILifeTarget, IShortTarget, IMonth} from '../../../services/app-types'
import {DaysService, MONTH} from '../../../services/days/days.service';
import {calendarTargetComponent} from './calendar-target.component';
import {LifetargetService} from '../../../services/targets/targets.service';

const template = `
    <h2>Month's doings:</h2><button class="btn calendar__month_edit p-abs btn-primary" (click)="onEditMonthDoings(monthDoingsEdit.show)">{{monthDoingsEdit.text}}</button>
    <hr />
    <div *ngIf="!monthDoingsEdit.show">
        <p *ngFor="#doing of data"><label class="calendar__routine_label">{{doing.description}}</label><input type="checkbox" [(ngModel)]="doing.done" /></p>
    </div>
    <div *ngIf="monthDoingsEdit.show">
        <h4>Add below new doings you have to do this month</h4>
        <div *ngFor="#doing of data; #i = index" class="calendar__current_line">
            <input class="calendar__current_doing" [(ngModel)]="doing.description" />
            <span>Important?</span> <input type="checkbox" [(ngModel)]="doing.important" />
            <span>Urgent?</span> <input type="checkbox" [(ngModel)]="doing.urgent" />
            <input id="newdoing-target" 
                        [(ngModel)]="doing.target" 
                        *ngIf="!selectTargetIsActive"
                        (focus)="selectTargetIsActive = true"
                    />
            <select-target class="calendar__current_form-select month-select" *ngIf="selectTargetIsActive" [data]="lifeTarget" (selectedTarget)="onSelectShortTarget(doing, $event)"></select-target>
            <div (click)="onDoingDelete(i)" *ngIf="data.length > 1" class="btn btn-danger calendar__current_delete">X</div>
        </div>
        <div (click)="onMonthDoingAdd(doing)" class="btn btn-success calendar__current_add-doing">Add Month Doing</div>
    </div>`
    
@Component({
    selector:'month',
    template:template,
    providers:[DaysService, LifetargetService],
    directives:[calendarTargetComponent]
})
export class calendarMonthComponent{
    selectTargetIsActive: boolean = false;
    lifeTarget: ILifeTarget;
    month: IMonth = MONTH;
    globalIndex: number;
    longIndex: number;
    shortIndex: number;
    @Input() data;
    @Output() selectedTarget = new EventEmitter<IShortTarget>();
    constructor(private _daysService: DaysService, private _lifetargetService: LifetargetService){
        //this.month = this.data;
    }
    monthDoingsEdit = {
        text:'Add doings',
        show:false
    }
    
    ngOnInit(){
        this.lifeTarget = this._lifetargetService.getTargets();
    }
    
    onEditMonthDoings(boo){
        console.log(this.data);
        this.monthDoingsEdit.text = boo ? 'Add doings' : 'Back'
        this.monthDoingsEdit.show = !this.monthDoingsEdit.show;
    }
    
    onDoingDelete(i){
        this.data.splice(i,1);
        this._daysService.updateMonthDoings(this.data);
    }
    
    onMonthDoingAdd(doing){
        this.data.push({description:'',important:false,urgent:false,target:''});
        this.lifeTarget.globalTargets[this.globalIndex].longTargets[this.longIndex].shortTargets[this.shortIndex].doings.push(doing);
        this._daysService.updateMonthDoings(this.data);
        this._lifetargetService.updateLifeTarget(this.lifeTarget);
    }   
    
    onSelectShortTarget(doing, obj){
        doing.target = obj.content.target;
        this.selectTargetIsActive = false;
        this.globalIndex = obj.global;
        this.longIndex = obj.long;
        this.shortIndex = obj.short;
    }
}