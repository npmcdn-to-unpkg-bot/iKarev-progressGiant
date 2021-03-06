import {Component, View, OnInit, Input, Output, EventEmitter} from 'angular2/core'
import {LifetargetService, LIFETARGET} from '../../services/targets/targets.service';
import {ILifeTarget, IGlobalTarget, ILongTarget, IShortTarget} from '../../services/app-types'
import {shortTargetComponent} from './src/lifetarget-shorttargets.component'

@Component({
  selector: 'lifetarget',
  providers:[LifetargetService],
  template: `
  <div>
    <div class="lifetarget__set" *ngIf="!showPlan">
        <h4 class="lifetarget__plot">{{text}}</h4> 
        <form *ngIf="!lifeTargetIsSet" #lifetargetForm="ngForm" class="col-xs-5 calendar__current_form">
            <div>
                <label class="lifetarget__form_label" for="lifetarget">Please, type the target of your life</label>
                <input class="lifetarget__form_input" type="text" id="lifetarget"
                    ngControl="lifeTargetControl"
                    [(ngModel)]="lifeTarget.target"
                />
            </div>
            <div (click)="onLifeTargetAdd()" class="lifetarget__form_button-add-main btn btn-primary">Plan life target</div>
        </form>
        <form *ngIf="lifeTargetIsSet && !globalTargetsIsSet" #globalTargetsForm="ngForm" class="col-xs-5 calendar__current_form">
            <label class="lifetarget__form_label">Please, type the global targets, that will help you to reach your life target</label>
            <div class="calendar__current_line" *ngFor="#globalTarget of lifeTarget.globalTargets; #i = index">
                <input class="lifetarget__form_input" type="text" id="globaltarget-i"
                    ngControl="globalTargetControl"
                    [(ngModel)]="globalTarget.target"
                />
                <div (click)="onTargetDelete(i)" class="btn btn-default calendar__current_delete"></div>
                <span class="btn btn-primary calendar__current_add-doing" *ngIf="lifeTarget.globalTargets.length == i+1" (click)="onGlobalTargetAdd()"></span>
            </div>
            <div class="fleft w-100 lifetarget__form_button-block">
                <div class="btn btn-default" (click)="lifeTargetIsSet = false">Back</div>
                <div (click)="onGlobalTargetsFinish()" class="btn btn-primary calendar__current_button-add-main">Plan global targets</div>
            </div>
        </form>
        
        <form *ngIf="lifeTargetIsSet && globalTargetsIsSet && !longTargetsIsSet" #longTargetsForm="ngForm" class="col-xs-5 lifetarget__longtargets">
            <label class="lifetarget__form_label">For the each of global targets, you need to enter targets of long (3-5 years) targets.</label>
            <div class="lifetarget__longtargets_block" *ngFor="#globalTarget of lifeTarget.globalTargets; #iglob = index">
                <div class="w-100 btn btn-info">{{globalTarget.target}}</div>
                <div class="calendar__current_line" *ngFor="#longTarget of globalTarget.longTargets; #i = index">
                    <input
                        class="lifetarget__form_input" 
                        type="text"
                        ngControl="longTargetControl"
                        [(ngModel)]="longTarget.target"
                    />
                    <div (click)="onTargetDelete(iglob, i)" class="btn btn-default calendar__current_delete"></div>
                    <p class="calendar__current_add-doing btn btn-primary" *ngIf="globalTarget.longTargets.length == i+1" (click)="onLongTargetAdd(globalTarget, longTarget)"></p>
                </div>
            </div>
            <div class="fleft w-100 lifetarget__form_button-block">
                <div class="btn btn-default" (click)="globalTargetsIsSet = false">Back</div>
                <div (click)="onLongTargetsFinish()" class="btn btn-primary calendar__current_button-add-main">Plan long targets</div>
            </div>
        </form>
        
        <div *ngIf="lifeTargetIsSet && globalTargetsIsSet && longTargetsIsSet && !showLong">
            <div class="fleft lifetarget__longtargets_block-list col-xs-4" *ngFor="#globaltarget of lifeTarget.globalTargets">
                <h4 class="lifetarget__longtargets_block-list-title">{{globaltarget.target}}</h4>
                <div class="llifetarget__longtargets_block-list-list" *ngFor="#longTarget of globaltarget.longTargets">
                    <p class="lifetarget__longtargets_block-list-item btn-default" (click)="onLongTargetSelect(longTarget)">{{longTarget.target}}</p>
                </div>
            </div>
            <div class="fleft w-100 lifetarget__form_button-block">
                <div class="btn btn-default" (click)="longTargetsIsSet = false">Back</div>
            </div>
        </div>
        <short-targets (saveShortTargets)="onSaveShortTargets(boo)" *ngIf="showLong" (backToLongTargets)="onBackToLongTargets()" [data]="selectedLongTarget"></short-targets>
        
    </div>
  </div>
  `,
  styles:[`
    .btn-info{width:230px;}
  `],
  directives:[shortTargetComponent]
})
export class LifetargetComponent {
    showLong:boolean = false;
    showPlan:boolean = false;
    text:string = 'Today you starts the path to the target of your whole life';
    lifeTargetIsSet:boolean;
    globalTargetsIsSet:boolean;
    longTargetsIsSet:boolean;
    lifeTarget:ILifeTarget = LIFETARGET;
    selectedLongTarget: ILongTarget = {target:'',shortTargets:[{target:'',deadline: {year:0,month:0,weekday:0,number:0}, doings: [],why: '',done:false}]}
    constructor(private _lifetargetService: LifetargetService){
        this.lifeTarget = _lifetargetService.getTargets();
    }
    
    ngOnInit(){
        this.lifeTargetIsSet = this.lifeTarget.target ? true : false; 
        this.globalTargetsIsSet = this.lifeTarget.globalTargets[0].target ? true : false;
        this.longTargetsIsSet = this.lifeTarget.globalTargets[0].longTargets[0].target ? true : false;  
    }
    
    onTargetDelete(global, long){
        if(long) this.lifeTarget.globalTargets[global].longTargets.splice(long,1)
        else this.lifeTarget.globalTargets.splice(global,1);
    }
    
    onLifeTargetAdd(){
        this.lifeTargetIsSet = true;
        this.text = 'Cool! Now you have to divide the life target to several global targets';
        this._lifetargetService.updateLifeTarget(this.lifeTarget);
    }
    
    onGlobalTargetAdd(){
        this.lifeTarget.globalTargets.push({target:'',time:0,role:'',longTargets:[{target:'',shortTargets:[{target:'',deadline: {year:0,month:0,weekday:0,number:0}, doings: [],why: '',done:false}]}]});
    }
    
    onLongTargetAdd(global, long){
        global.longTargets.push({target:'',shortTargets:[{deadline: {year:0,month:0,weekday:0,number:0}, doings: [],why: ''}]});
    }
    
    onGlobalTargetsFinish(){
        this.text = 'Cool! Now devide each of the global targets to the long targets';
        this.globalTargetsIsSet = true;
        this._lifetargetService.updateLifeTarget(this.lifeTarget);
    }
    
    onLongTargetsFinish(){
        this.text = 'Great! So now you need to fill each of the long targets by short targets - step by step';
        this.longTargetsIsSet = true;
        this._lifetargetService.updateLifeTarget(this.lifeTarget);
    }
    
    onSaveShortTargets(boo){
        this._lifetargetService.updateLifeTarget(this.lifeTarget);
    }
    
    onLongTargetSelect(long){
        this.showLong = true;
        this.selectedLongTarget = long;
    }
    
    onBackToLongTargets(){
        this.showLong = false;
    }
    
}
