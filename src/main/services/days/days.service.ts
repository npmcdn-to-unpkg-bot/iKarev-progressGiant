import {Injectable} from 'angular2/core'
import {IDay, IDoing, IMonth, IIdealRoutine, IWeek} from '../app-types'

export const DAYS: IDay[] = [];
export const MONTH: IMonth[] = [{index:0,days:[],weeks:[],doings:[]}];
export const WEEK: IWeek[] = [{month:MONTH[0].index, doings:[{month:MONTH[0].index,description:'',important:true,urgent:true,global:0,target:'',main:false,time:0}]}];
export const IDEAL_ROUTINE: IIdealRoutine[] = [];

@Injectable()
export class DaysService{
    days:IDay[] = DAYS;
    month:IMonth[] = MONTH;
    idealRoutine: IIdealRoutine[] = IDEAL_ROUTINE;
    
    getMonth() : IMonth[] {
        if (window.localStorage["doings"] != undefined && window.localStorage["doings"]) {
            this.month[0].doings = JSON.parse(window.localStorage["doings"]);
            
        } else {
            this.month[0].doings = [{month:this.month[0].index,description:'',important:true,urgent:true,main:false,target:'',global:0,time:0}];
        }
        if (window.localStorage["days"] != undefined && window.localStorage["days"]) {
            var days = JSON.parse(window.localStorage["days"]);
            var n = days[0].date.month;
            if(this.month[days[0].date.month-n].days.length == 0){
                for(var d in days){
                    if(this.month[days[d].date.month-n] == undefined){
                        this.month[days[d].date.month-n] = {index:0,days:[],weeks:[],doings:[]};
                    }
                    this.month[days[d].date.month-n].days.push(days[d]);
                }
            }
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
                this.month[0].days[i] = {index:i, date:{year:2016,month:newMonth,number:i+1,weekday:(i+1)%7},doings:[],done:false, routine:[{doing:'',time:0}]};
            }  
        }
        if (window.localStorage["weeks"] != undefined && window.localStorage["weeks"]) {
            var weeks = JSON.parse(window.localStorage["weeks"]);
            var n = weeks[0].month;
            if(this.month[weeks[0].month-n].weeks.length == 0){
                for(var w in weeks){
                    this.month[weeks[w].month-n].weeks.push(weeks[w]);
                }
            }
        } else {
            for(var i = 0; i < 5; i++){
                this.month[0].weeks.push({month:this.month[0].index, doings:[]});
            }
        }
        return this.month;
    }
    
    insertDay(day:IDay){
        Promise.resolve(this.month[0].days).then((days: IDay[])=>days.push(day));
    }
    
    insertDoing(index:number, doing:IDoing, monthIndex:number){
        let doingsArray = this.days;
        Promise.resolve(this.month[monthIndex - this.month[0].days[0].date.month].days).then((days: IDay[])=> {days[index].doings.push(doing); doingsArray = days});
        setTimeout(()=>{
            this.updateDay();        
        })
    }
    
    updateDay(){
        var days = [];
        for(var m in this.month){
            for(var d in this.month[m].days){
                days.push(this.month[m].days[d]);
            }
        }
        window.localStorage["days"] = JSON.stringify(days, function (key, val) {
            if (key == '$$hashKey') {
                return undefined;
            }
            return val;
        });
    }
    
    updateWeeks(){
        var weeksArray = [];
        for(var m in this.month){
            for(var w in this.month[m].weeks){
                weeksArray.push(this.month[m].weeks[w]);
            }
        }
        window.localStorage["weeks"] = JSON.stringify(weeksArray, function (key, val) {
            if (key == '$$hashKey') {
                return undefined;
            }
            return val;
        });
    }
    
    updateMonthDoings(doings){
        this.month[0].doings = doings;
        window.localStorage["doings"] = JSON.stringify(this.month[0].doings, function (key, val) {
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