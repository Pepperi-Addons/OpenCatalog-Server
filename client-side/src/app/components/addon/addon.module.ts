import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PepUIModule } from '../../modules/pepperi.module';
import { MaterialModule } from '../../modules/material.module';
import { SchedulerJobModule } from '../scheduler-job/scheduler-job.module';

import { AddonService } from './addon.service'; 

import { AddonComponent } from './addon.component';

@NgModule({
    declarations: [
        AddonComponent

    ],
    imports: [
        CommonModule,
        PepUIModule,
        MaterialModule,
        FormsModule,
        SchedulerJobModule
    ],
    providers: [ ]
})
export class AddonModule {
}




