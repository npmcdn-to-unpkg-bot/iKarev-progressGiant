import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {ILifeTarget, IShortTarget} from '../../../services/app-types'

const template = `
    <label class="calendar__routine_label">{{doing.description}}</label>
    <input type="checkbox" *ngIf="!data.done" [(ngModel)]="doing.done" />
    <input type="number" *ngIf="!data.done" (change)="onTimeChanged()" [(ngModel)]="doing.time" />
    <input type="checkbox" *ngIf="data.done" disabled [(ngModel)]="doing.done" />
    <input type="number" *ngIf="data.done" disabled [(ngModel)]="doing.time" />`
    
@Component({
    selector:'doing',
    template:template
})
export class calendarDoingComponent{
    @Input() data;
    @Input() doing;
    @Output() doingChanged = new EventEmitter<IShortTarget>();
    constructor(){
        
    }
    ngOnInit(){
        
    }
    onTimeChanged(obj){
        this.doingChanged.emit(obj);
    }
}