import {Injectable} from 'angular2/core'
import {IDay, IDoing, IMonth, IIdealRoutine, IWeek} from '../app-types'

export const DAYS: IDay[] = [];
export const MONTH: IMonth = {days:[],weeks:[],doings:[]};
export const WEEK: IWeek[] = [{doings:[{description:'',important:true,urgent:true,target:''}]}];
export const IDEAL_ROUTINE: IIdealRoutine[] = [];

@Injectable()
export class DaysService{
    days:IDay[] = DAYS;
    month:IMonth = MONTH;
    idealRoutine: IIdealRoutine[] = IDEAL_ROUTINE;
    
    getMonth() : IMonth {
        if (window.localStorage["weeks"] != undefined && window.localStorage["weeks"]) {
            this.month.weeks = JSON.parse(window.localStorage["weeks"]);
        } else {
            this.month.weeks = [{doings:[{description:'',important:true,urgent:true,target:''}]},{doings:[{description:'',important:true,urgent:true,target:''}]},{doings:[{description:'',important:true,urgent:true,target:''}]},{doings:[{description:'',important:true,urgent:true,target:''}]},{doings:[{description:'',important:true,urgent:true,target:''}]}];
        }
        if (window.localStorage["doings"] != undefined && window.localStorage["doings"]) {
            this.month.doings = JSON.parse(window.localStorage["doings"]);
        } else {
            this.month.doings = [{description:'Go ahead',important:true,urgent:true,target:'gogo'}];
        }
        
        if (window.localStorage["days"] != undefined && window.localStorage["days"]) {
            this.month.days = JSON.parse(window.localStorage["days"]);
            console.log(this.month.days)
        } else {
            var daysQty: number;
            var newMonth = new Date().getMonth();
            switch (newMonth){
                case 1: daysQty = 28; break;
                case 3: daysQty = 30; break;
                case 5: daysQty = 30; break;
                case 7: daysQty = 30; break;
                case 9: daysQty = 30; break;
                case 11: daysQty = 30; break;
                default: daysQty = 31;
            }
            for(var i = 0; i < daysQty; i++){
                this.month.days[i] = {index:i, date:{year:2016,month:newMonth,number:i+1,weekday:(i+1)%7},doings:[],done:false, routine:[{doing:'',time:0}]};
            }  
        }
        return this.month;
    }
    
    insertDay(day:IDay){
        Promise.resolve(this.month.days).then((days: IDay[])=>days.push(day));
    }
    
    insertDoing(index:number, doing:IDoing){
        let doingsArray = this.days;
        Promise.resolve(this.month.days).then((days: IDay[])=> {days[index].doings.push(doing); doingsArray = days});
        setTimeout(()=>{
            this.updateDay();        
        })
    }
    
    updateDay(){
        window.localStorage["days"] = JSON.stringify(this.month.days, function (key, val) {
            if (key == '$$hashKey') {
                return undefined;
            }
            return val;
        });
    }
    
    updateWeeks(weeks){
        this.month.weeks = weeks;
        window.localStorage["weeks"] = JSON.stringify(this.month.weeks, function (key, val) {
            if (key == '$$hashKey') {
                return undefined;
            }
            return val;
        });
    }
    
    updateMonthDoings(doings){
        this.month.doings = doings;
        window.localStorage["doings"] = JSON.stringify(this.month.doings, function (key, val) {
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
    }
    
    getIdealRoutine() {
        if (window.localStorage["ideal-routine"] != null && window.localStorage["ideal-routine"]) {
            this.idealRoutine = JSON.parse(window.localStorage["ideal-routine"]);
        }else{
            this.idealRoutine = [{doing:'',time:0, fullTime:0, fullDays: 0}];
        }
        return this.idealRoutine;
    }
    
}