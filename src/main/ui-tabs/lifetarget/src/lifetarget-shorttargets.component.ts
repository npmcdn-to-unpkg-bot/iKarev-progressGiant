import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {IShortTarget} from '../../../services/app-types'

@Component({
    selector:'short-targets',
    template:`
        <h2>Add short targets to the long target "{{data.target}}"</h2>
        <div class="fleft col-xs-5 lifetaget__shorttarget_block">
            <form #newDoingForm="ngForm" class="lifetarget__short_block">
                <p>Target title: <input class="lifetarget__short_target" [(ngModel)]="selectedShortTargets.target" /></p>
                <div class="lifetarget__short_deadline">
                    <h4 lifetarget__short_deadline-target>Deadline:</h4>
                    <p>Month: <input class="lifetarget__short_deadline-input" [(ngModel)]="selectedShortTargets.deadline.month" />
                    Day: <input class="lifetarget__short_deadline-input" [(ngModel)]="selectedShortTargets.deadline.number" />
                    Year: <input class="lifetarget__short_deadline-input" [(ngModel)]="selectedShortTargets.deadline.year" /></p>
                </div>
                <p>Why? Explain in a several words how this taget can help you to reach the long target</p>
                <textarea class="lifetarget__short_why" [(ngModel)]="selectedShortTargets.why"></textarea>
                <div class="col-xs-12">
                    <div (click)="onBackToLongTargets()" class="btn btn-default">Back</div>
                    <div (click)="onAddShortTarget(selectedShortTargets)" class="btn btn-primary lifetarget__short_save">Add short target</div>
                </div>
            </form>
        </div>
        <div class="col-xs-7">
            <table class="table table-striped">
                <thead class="thead" class="lifetarget__short_table-header">
                    <tr>
                        <td rowspan="2" class="lifetarget__short_table-header-td">Name of target</td>
                        <td rowspan="2" class="lifetarget__short_table-header-td">Quantity of doings</td>
                        <td colspan="3">Deadline</td>
                        <td rowspan="2" class="lifetarget__short_table-header-td">Why you need it?</td>
                        <td rowspan="2"></td>
                    </tr>
                    <tr>
                        <td>Month</td>
                        <td>Number</td>
                        <td>Year</td>
                    </tr>
                </thead>
                <tbody *ngIf="data.shortTargets[0].target">
                    <tr *ngFor="#shortTarget of data.shortTargets; #i = index">
                        <td>{{shortTarget.target}}</td>
                        <td>{{shortTarget.doings.length}}</td>
                        <td class="ta-center">{{shortTarget.deadline.month}}</td>
                        <td class="ta-center">{{shortTarget.deadline.number}}</td>
                        <td class="ta-center">{{shortTarget.deadline.year}}</td>
                        <td>{{shortTarget.why}}</td>
                        <td><div (click)="onTargetDelete(i)" class="btn btn-danger calendar__current_delete">X</div></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
})
export class shortTargetComponent{
    selectedShortTargets: IShortTarget = {target:'',deadline: {year:0,month:0,weekday:0,number:0}, doings: [],why: ''};
    @Output() backToLongTargets = new EventEmitter<boolean>();
    @Output() saveShortTargets = new EventEmitter<boolean>();
    @Input() data;
    constructor(){}
    
    onBackToLongTargets(){
        this.backToLongTargets.emit(false);
    }
    
    onAddShortTarget(short){
        if(!this.data.shortTargets[0].target) this.data.shortTargets[0] = short; else this.data.shortTargets.push(short);
        this.selectedShortTargets = {target:'',deadline: {year:0,month:0,weekday:0,number:0}, doings: [],why: ''};
        this.saveShortTargets.emit(true);
    }
    
    onTargetDelete(i){
        this.data.shortTargets.splice(i,1);
        this.saveShortTargets.emit(true);
    }
        
}