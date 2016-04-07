export interface IDay{
    index:number,
    date:IDate,
    doings: IDoing[]
};

export interface IWeek{
    days:IDay[];
    doing:IDoing;
}

export interface IMonth{
    weeks:IWeek[];
    doing:IDoing;
}

export interface IDoing{
    description:string,
    important: boolean,
    urgent: boolean,
    target: string
};

export interface IIdealRoutine{
    doing:string;
    time:number;
    fullTime:number;
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
    longTargets: ILongTarget[]
};

export interface ILongTarget{
    target:string,
    shortTargets: IShortTarget[]
};