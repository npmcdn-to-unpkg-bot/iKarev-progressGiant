import {Pipe} from "angular2/core";

@Pipe({name: "sortdate"})
export class SortDatePipe {
  transform(array, args): Array<string> {
    array.sort((a: any, b: any) => {
        var ad = a.deadline;
        var bd = b.deadline;
        var aDate = new Date(ad.year, ad.month, ad.number).getTime();
        var bDate = new Date(bd.year, bd.month, bd.number).getTime();
        return aDate > bDate;
    });
    return array;
  }
}