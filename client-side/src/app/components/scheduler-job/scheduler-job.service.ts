import { Injectable } from '@angular/core';
import { PepSchedulerJobFrequency, PepWeekDays } from './scheduler-job.model';
import * as moment from 'moment';


@Injectable()
export class SchedulerJobService {
    private _schedulerJobOptions: { key: PepSchedulerJobFrequency, value: string }[] = [];
    private _weekDays: { key: PepWeekDays, value: string }[] = [];

    get schedulerJobOptions() {
        return this._schedulerJobOptions;
    }

    get weekDays() {
        return this._weekDays;
    }

    constructor() {
        this.loadSchedulerOptions();
        this.loadWeekDays();
    }

    private loadSchedulerOptions() {
        this._schedulerJobOptions = [
            {
                key: 'daily',
                value: 'Daily'
            },
            {
                key: 'weekly',
                value: 'Weekly'
            }
        ]
    }

    private loadWeekDays() {
        this._weekDays = [
            {
                key: 'monday',
                value: 'Monday'
            },
            {
                key: 'tuesday',
                value: 'Tuesday'
            },
            {
                key: 'wednesday',
                value: 'Wednesday'
            },
            {
                key: 'thursday',
                value: 'Thursday'
            },
            {
                key: 'friday',
                value: 'Friday'
            },
            {
                key: 'saterday',
                value: 'Saterday'
            },
            {
                key: 'sunday',
                value: 'Sunday'
            }
        ]
    }  

}