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

    getUtcTime(localTime: string) {               
        const timeArr = localTime.split(':'); 
        const offset = ((new Date().getTimezoneOffset() * -1) / 60);        
        const utcTime: string = this.addHours(parseInt(timeArr[0]), offset) + ':' + timeArr[1];
        
        return utcTime;       
    }

    getLocalTime(utcTime: string) {                    
        const timeArr = utcTime.split(':'); 
        const offset = (new Date().getTimezoneOffset() / 60);    
        const localTime: string = this.addHours(parseInt(timeArr[0]), offset) + ':' + timeArr[1];
               
        return localTime;               
    }

    /**
     * adds an addition of hours to a given hour in a 24-hour format, and pad with leading zero if nexessary
     * @param hour the original hour in 24-hour format
     * @param addition an addition
     * @returns the result in a 24-hour format
     */
    private addHours(hour: number, addition: number) {
        const remainder = (hour + addition) % 24;
        return (remainder < 0 ? 24 + remainder : remainder).toString().padStart(2, '0');     
    }
}