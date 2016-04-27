export interface IDay{
    index: number;
    date: IDate;
    doings: IDoing[];
    routine: IDayRoutine[];
    done: boolean;
};

export interface IDayRoutine{
    doing:string;
    time:number;
}

export interface IWeek{
    month:number;
    doings:IDoing[]
}

export interface IMonth{
    index: number;
    days:IDay[];
    weeks:IWeek[];
    doings:IDoing[];
}

export interface ISaveDay {
    day: IDay;
    done: boolean;
}

export interface IDoing{
    month:number;
    description:string,
    important: boolean,
    global: number;
    urgent: boolean,
    main: boolean,
    target: string,
    time:number;
};

export interface IIdealRoutine{
    doing:string;
    time:number;
    fullTime:number;
    fullDays:number;
}

export interface IHighCharts {}

export interface IShortTarget{
    target: string,
    deadline: IDate,
    doings: IDoing[],
    why: string
};

export interface IDate{
    year:number,
    month:number,
    weekday: number,
    number:number
};

export interface IRoutine{
    title:string,
    time:number
}

export interface ILifeTarget{
    target:string,
    rationale?: string,
    globalTargets: IGlobalTarget[]
};

export interface IGlobalTarget{
    target:string,
    role: string,
    time:number,
    longTargets: ILongTarget[]
};

export interface ILongTarget{
    target:string,
    shortTargets: IShortTarget[]
};