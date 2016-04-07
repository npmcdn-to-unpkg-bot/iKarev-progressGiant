import {Injectable} from 'angular2/core'
import {IDay, IDoing} from '../app-types'

export const DOINGS: IDoing[] = [];

@Injectable()
export class DoingService{
    doings = DOINGS;
    getContacts() {
        return Promise.resolve(this.doings);
    }
    
    insertContact(doing:IDoing){
        Promise.resolve(this.doings).then((doings: IDoing[])=>doings.push(doing));
    }
    
}