import {Injectable} from 'angular2/core'
import {ILifeTarget} from '../app-types'

export const LIFETARGET: ILifeTarget = {target:'',globalTargets:[{target:'',role:'',longTargets:[{target:'',shortTargets:[{target:'',deadline: {year:0,month:0,weekday:0,number:0}, doings: [],why: ''}]}]}]};


@Injectable()
export class LifetargetService{
    lifetarget:ILifeTarget = LIFETARGET;
    getTargets() {
        if (window.localStorage["lifetarget"] != undefined && window.localStorage["lifetarget"]) {
            this.lifetarget = JSON.parse(window.localStorage["lifetarget"]);
        }
        return this.lifetarget;
    }
    
    updateLifeTarget(newLifetarget:ILifeTarget){
        Promise.resolve(this.lifetarget).then((lifetarget: ILifeTarget)=>lifetarget = newLifetarget);
        setTimeout(()=>{this.updateTargets();})
    }
    
    updateTargets(){
        window.localStorage["lifetarget"] = JSON.stringify(this.lifetarget, function (key, val) {
            if (key == '$$hashKey') {
                return undefined;
            }
            return val;
        });
    }
    
}