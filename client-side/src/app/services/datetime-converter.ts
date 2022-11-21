import { Injectable } from "@angular/core";


@Injectable({
  providedIn: "root",
})
export class DateTimeConverterService {   

    getLocalDateTime(utcDatetime: string) {        
        const utcDTTM = new Date(utcDatetime);        
        const offset = (utcDTTM.getTimezoneOffset() * -1) * 60 * 1000;        
        const localDTTM = new Date(utcDTTM.getTime() + offset);        
        return localDTTM.toISOString();       
    }

    getUtcTime(localTime: string) {
        const timeArr = localTime.split(':');
        const offset = (new Date().getTimezoneOffset() / 60);
        const utcTime: string = this.addHours(parseInt(timeArr[0]), offset) + ':' + timeArr[1];

        return utcTime;
    }

    getLocalTime(utcTime: string) {
        const timeArr = utcTime.split(':');
        const offset = ((new Date().getTimezoneOffset() * -1) / 60);
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