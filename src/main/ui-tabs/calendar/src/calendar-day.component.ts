import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {IDay,IDoing, ILifeTarget} from '../../../services/app-types'
import {DaysService} from '../../../services/days/days.service';
import {LifetargetService} from '../../../services/targets/targets.service';
import {calendarTargetComponent} from './calendar-target.component';
const template = `
        <h2>{{data.date.month}}.{{data.date.number}}.{{data.date.year}}</h2><div (click)="onBackButton()" class="btn btn-primary p-abs calendar__current_back">Back</div>
        <form #newDoingForm="ngForm" class="col-xs-5 calendar__current_form">
            <h3>New Doing</h3>
            <div class="col-xs-12">
                <div>
                    <label class="calendar__current_form-label" for="newdoing-important">Is it important?</label>
                    <input type="checkbox" id="newdoing-important"
                        ngControl="importantControl"
                        [(ngModel)]="newDoing.important"
                    />
                </div>
                <div>
                    <label class="calendar__current_form-label" for="newdoing-urgent">Is it urgent?</label>
                    <input type="checkbox" id="newdoing-urgent"
                        ngControl="urgentControl" 
                        [(ngModel)]="newDoing.urgent"
                    />
                </div>
                <div>
                    <label class="calendar__current_form-label" for="newdoing-description">Description</label>
                    <input type="text" id="newdoing-description" 
                        required 
                        ngControl="descriptionControl" 
                        [(ngModel)]="newDoing.description"
                    />
                </div>
                <div>
                    <label class="calendar__current_form-label" for="newdoing-time">Plan Time</label>
                    <input type="number" id="newdoing-time" 
                        required 
                        ngControl="timeControl" 
                        [(ngModel)]="newDoing.time"
                    />
                </div>
                <div>
                    <label class="calendar__current_form-label" for="newdoing-target">Choose target</label>
                    <input id="newdoing-target" 
                        required 
                        ngControl="targetControl" 
                        [(ngModel)]="newDoing.target" 
                        *ngIf="!selectTargetIsActive"
                        (focus)="selectTargetIsActive = true"
                    />
                    <select-target class="calendar__current_form-select" *ngIf="selectTargetIsActive" [data]="lifeTarget" (selectedTarget)="onSelectShortTarget($event)"></select-target>
                    
                    
                </div>
            </div>
            <div (click)="onDoingAdd(data.index, newDoing, $event)" class="btn btn-success calendar__current_add-doing">Plan Doing</div>
        </form>
        <div class="col-xs-7 calendar__current_details">
            <h3>Doings</h3>
            <div class="col-xs-12">
                <div *ngFor="#doing of data.doings; #i = index" class="calendar__current_line">
                    <input class="calendar__current_doing" [(ngModel)]="doing.description" />
                    <span class="calendar__current_doing_label calendar__current_doing_important-{{doing.important}}">I</span>
                    <span class="calendar__current_doing_label calendar__current_doing_urgent-{{doing.urgent}}">U</span>
                    <input class="calendar__current_plantime" value="{{doing.planTime}}" />
                    <div (click)="onDoingDelete(i)" class="btn btn-danger calendar__current_delete">X</div>
                </div>
            </div>
            
        </div>`
@Component({
    selector:'current-day',
    template:template,
    providers:[LifetargetService],
    directives:[calendarTargetComponent]
})
export class calendarDayComponent{
    selectTargetIsActive: boolean;
    lifeTarget: ILifeTarget;
    globalIndex;
    longIndex;
    shortIndex;
    @Output() backToMonth = new EventEmitter<boolean>();
    @Input() data;
    newDoing: IDoing = {description:'',important: false, target:'', urgent: false, global: 0, time: 0};
    constructor(private _daysService: DaysService, private _lifetargetService: LifetargetService){}
    
    ngOnInit(){
        this.lifeTarget = this._lifetargetService.getTargets();
    }
    
    onBackButton(){
        this.backToMonth.emit(false);
    }
    
    onDoingDelete(i){
        this.data.doings.splice(i,1);
        this._daysService.updateDay();
    }
    
    onSelectShortTarget(obj){
        this.newDoing.target = obj.content.target;
        this.selectTargetIsActive = false;
        console.log(obj);
        this.globalIndex = obj.global;
        this.longIndex = obj.long;
        this.shortIndex = obj.short;
    }
    
    onDoingAdd(i, newDo, event){
        var targets = this.lifeTarget.globalTargets;
        for(let i in targets){
            if(targets[i].target == newDo.target){
            }
        }
        let newDoing = {
            description:newDo.description,
            important: newDo.important,
            urgent: newDo.urgent,
            global: this.globalIndex,
            target:newDo.target,
            time: newDo.time
        }
        this.lifeTarget.globalTargets[this.globalIndex].longTargets[this.longIndex].shortTargets[this.shortIndex].doings.push(newDoing);
        this._daysService.insertDoing(i, newDoing);
        this._lifetargetService.updateLifeTarget(this.lifeTarget);
    }
    
    
}