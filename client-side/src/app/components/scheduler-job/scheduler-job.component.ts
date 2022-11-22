import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchedulerJobService } from './scheduler-job.service';
import { PepSchedulerJobFrequency, PepWeekDays, IScheduledJob } from './scheduler-job.model';
import { DateConverterService } from '../../services/date-converter.service';


@Component({
    selector: 'addon-scheduler-job',
    templateUrl: './scheduler-job.component.html',
    styleUrls: ['./scheduler-job.component.scss'],
    providers: [SchedulerJobService]
})
export class SchedulerJobComponent implements OnInit {
    @Input() set
        job(val: IScheduledJob) {
        if (val) {
            this.setJob(val);
        }
    }

    @Output() saveCatalog = new EventEmitter<IScheduledJob>();

    get schedulerJobOptions() {
        return this._schedulerJobService.schedulerJobOptions;
    }

    get weekDays() {
        return this._schedulerJobService.weekDays;
    }

    schedulerForm: FormGroup;
    jobFrequencyType: PepSchedulerJobFrequency | '' = '';
    jobDay: PepWeekDays | '' = '';
    jobPublishTime = '';
    timeRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

    constructor(
        private _fb: FormBuilder,
        private _schedulerJobService: SchedulerJobService,
        private _dateConverterService: DateConverterService
    ) {

    }

    ngOnInit(): void {
        this.schedulerForm = this._fb.group({
            type: ['', Validators.required]
        });
    }

    setJob(val: IScheduledJob) {
        this.jobFrequencyType = val.Frequency || '';

        if (val.Frequency === 'weekly' && val.Day) {
            this.jobDay = val.Day;
        }

        if (val.Frequency === 'daily' || val.Frequency === 'weekly' && val.Time) {            
            this.jobPublishTime = this._dateConverterService.getLocalTime(val.Time);
        }
    }

    onSchedulerJobChanged(key: PepSchedulerJobFrequency) {
        this.jobFrequencyType = key;
        if (!key) {
            this.jobPublishTime = '';
        }
        if (key !== 'weekly') {
            this.jobDay = '';
        }
    }

    onWeekDayChanged(day: PepWeekDays) {
        this.jobDay = day;
    }

    onPublishTimeChanged(time: string) {
        if (time.match(this.timeRegex)) {
            this.jobPublishTime = time;
        } else {
            this.jobPublishTime = '';
        }
    }

    onSchedulerSaveClicked() {
        let job: IScheduledJob = {
            Frequency: this.jobFrequencyType || null
        }
        if (this.jobDay) {
            job.Day = this.jobDay;
        }
        if (this.jobPublishTime) {            
            job.Time = this._dateConverterService.getUtcTime(this.jobPublishTime);
        }

        this.saveCatalog.emit(job);
    }

}