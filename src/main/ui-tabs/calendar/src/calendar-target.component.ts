import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {ILifeTarget, IShortTarget} from '../../../services/app-types'

const template = `
    <div class="calendar__current_form-select-global-block" *ngFor="#global of data.globalTargets; #iGlob = index">
        <p class="calendar__current_form-select-global-button" (click)="onShowSwitch($event, global)">{{global.target}}</p>
        <div class="calendar__current_form-select-global-content disabled p-abs" *ngIf="global.show">
            <div class="calendar__current_form-select-long-block" *ngFor="#long of global.longTargets; #iLong = index">
                <p class="calendar__current_form-select-long-button" (click)="onShowSwitch($event, long)">{{long.target}}</p>
                <div class="calendar__current_form-select-long-content disabled p-abs" *ngIf="long.show">
                    <div class="calendar__current_form-select-short-block" *ngFor="#short of long.shortTargets; #iShort = index">
                        <p class="calendar__current_form-select-short-button" (click)="onSelectShortTarget({global:iGlob,long:iLong,short:iShort,content:short})">{{short.target}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    
@Component({
    selector:'select-target',
    template:template
})
export class calendarTargetComponent{
    @Input() data;
    @Output() selectedTarget = new EventEmitter<IShortTarget>();
    onShowSwitch(event, block){
        if(block.show){
            event.target.classList.remove("activating");
            setTimeout(() => {
                block.show = !block.show;
            },350); 
        }else{
            block.show = !block.show;
            setTimeout(() => {
                event.target.classList.add("activating");
            });
        }
    }
    onSelectShortTarget(obj){
        this.selectedTarget.emit(obj);
    }
}