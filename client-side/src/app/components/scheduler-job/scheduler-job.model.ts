export type PepSchedulerJobFrequency = 'daily' |
    'weekly'

export type PepWeekDays = 'monday' |
    'tuesday' |
    'wednesday' |
    'thursday' |
    'friday' |
    'saterday' |
    'sunday'

export interface IScheduledJob {
    Frequency: PepSchedulerJobFrequency | null;
    Day?: PepWeekDays;
    Time?: string;
}