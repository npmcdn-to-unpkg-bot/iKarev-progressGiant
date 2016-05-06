import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {ILifeTarget, IShortTarget, IMonth, IDoing} from '../../../services/app-types'
import {DaysService, MONTH} from '../../../services/days/days.service';
import {calendarTargetComponent} from './calendar-target.component';
import {LifetargetService} from '../../../services/targets/targets.service';

const template = `
    <h2 class="color-white">Month's doings:</h2>
    <div class="btn calendar__month_edit p-abs" (click)="onEditMonthDoings(monthDoingsEdit.show)">{{monthDoingsEdit.text}}</div>
    <div class="calendar__month_doings-list" *ngIf="!monthDoingsEdit.show">
        <p class="calendar__month_doing" *ngFor="#doing of data">
            <label class="calendar__routine_label disp-ib">{{doing.description}}</label>
            <input class="calendar__routine_input disp-ib" type="checkbox" [(ngModel)]="doing.done" />
        </p>
    </div>
    <div class="calendar__month_block-edit" *ngIf="monthDoingsEdit.show">
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
            <div (click)="onDoingDelete(i)" *ngIf="data.length > 1" class="btn btn-default calendar__current_delete"></div>
            <div *ngIf="i+1 == data.length && doing.target" (click)="onMonthDoingAdd(doing)" class="btn btn-primary calendar__current_add-doing calendar__current_add-doing-monthes"></div>
        </div>
    </div>`
    
@Component({
    selector:'month-doings',
    template:template,
    providers:[DaysService, LifetargetService],
    directives:[calendarTargetComponent]
})
export class calendarMonthDoingsComponent{
    selectTargetIsActive: boolean = false;
    lifeTarget: ILifeTarget;
    month: IMonth[] = MONTH;
    globalIndex: number;
    longIndex: number;
    shortIndex: number;
    @Input() data;
    @Output() selectedTarget = new EventEmitter<IShortTarget>();
    @Output() editMonthDoings = new EventEmitter<IDoing[]>();
    @Output() monthDoingDelete = new EventEmitter<IShortTarget>();
    constructor(private _daysService: DaysService, private _lifetargetService: LifetargetService){
        //this.month = this.data;
    }
    monthDoingsEdit = {
        text:'Edit doings',
        show:false
    }
    
    ngOnInit(){
        this.lifeTarget = this._lifetargetService.getTargets();
    }
    
    onEditMonthDoings(boo){
        this.monthDoingsEdit.text = boo ? 'Edit doings' : 'Back'
        this.monthDoingsEdit.show = !this.monthDoingsEdit.show;
    }
    
    onDoingDelete(i){
        this.data.splice(i,1);
        this.monthDoingDelete.emit(this.data)
    }
    
    onMonthDoingAdd(doing: IDoing){
        this.data.push({month:this.data[0].month,global:this.globalIndex,description:'',important:false,urgent:false,target:'',time:0,main:false});
        console.log(doing);
        if(doing){
            this.lifeTarget.globalTargets[this.globalIndex].longTargets[this.longIndex].shortTargets[this.shortIndex].doings.push(doing);
            //this._daysService.updateMonthDoings(this.data);
            this._lifetargetService.updateLifeTarget(this.lifeTarget);
            this.editMonthDoings.emit(this.data)
        }
    }   
    
    onSelectShortTarget(doing, obj){
        doing.target = obj.content.target;
        this.selectTargetIsActive = false;
        this.globalIndex = obj.global;
        this.longIndex = obj.long;
        this.shortIndex = obj.short;
    }
}