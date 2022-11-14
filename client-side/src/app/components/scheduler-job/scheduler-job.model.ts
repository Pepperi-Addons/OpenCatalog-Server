export type PepSchedulerJobFrequency = 'daily' |
    'weekly'

export type PepWeekDays = 'monday' |
    'tuesday' |
    'wednesday' |
    'thursday' |
    'friday' |
    'saterday' |
    'sunday'

export enum JobTypes {
    Create =  1,
    Update,
    Delete
}

export interface IScheduledJob {
    Frequency: PepSchedulerJobFrequency | null;
    Day?: PepWeekDays;
    Time?: string;
}

export interface IScheduledJobRequest {
    Type?: JobTypes;
    Key?: string;
    AccessKey?: string;
    CodeJobId?: string;
    Job?: IScheduledJob;
    CronExpression?: string;
}