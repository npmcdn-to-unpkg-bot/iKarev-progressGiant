import {Injectable} from 'angular2/core'
import {IDay,IDoing, IIdealRoutine} from '../app-types'

export const DAYS: IDay[] = [];
export const IDEAL_ROUTINE: IIdealRoutine[] = [];

@Injectable()
export class DaysService{
    days:IDay[] = DAYS;
    idealRoutine: IIdealRoutine[] = IDEAL_ROUTINE;
    
    getDays() {
        if (window.localStorage["days"] != null && window.localStorage["days"]) {
            this.days = JSON.parse(window.localStorage["days"]);
        } else {
            var daysQty: number;
            var month = new Date().getMonth();
            switch (month){
                case 1: daysQty = 28; break;
                case 3: daysQty = 30; break;
                case 5: daysQty = 30; break;
                case 7: daysQty = 30; break;
                case 9: daysQty = 30; break;
                case 11: daysQty = 30; break;
                default: daysQty = 31;
            }
            for(var i = 0; i < daysQty; i++){
                this.days[i] = {index:i, date:{year:2016,month:month,number:i+1,weekday:(i+1)%7},doings:[]};
            }  
        }
        return this.days;
    }
    
    insertDay(day:IDay){
        Promise.resolve(this.days).then((days: IDay[])=>days.push(day));
    }
    
    insertDoing(index:number, doing:IDoing){
        let doingsArray = this.days;
        Promise.resolve(this.days).then((days: IDay[])=> {days[index].doings.push(doing); doingsArray = days});
        setTimeout(()=>{
            this.updateDay();        })
    }
    
    updateDay(){
        window.localStorage["days"] = JSON.stringify(this.days, function (key, val) {
            if (key == '$$hashKey') {
                return undefined;
            }
            return val;
        });
    }
    
    updateIdealRoutine(idealRoutine){
        this.idealRoutine = idealRoutine;
        window.localStorage["ideal-routine"] = JSON.stringify(this.idealRoutine, function (key, val) {
            if (key == '$$hashKey') {
                return undefined;
            }
            return val;
        });
        console.log(this.idealRoutine);
    }
    
    getIdealRoutine() {
        if (window.localStorage["ideal-routine"] != null && window.localStorage["ideal-routine"]) {
            this.idealRoutine = JSON.parse(window.localStorage["ideal-routine"]);
        }else{
            this.idealRoutine = [{doing:'',time:0, fullTime:0}];
        }
        return this.idealRoutine;
    }
    
}