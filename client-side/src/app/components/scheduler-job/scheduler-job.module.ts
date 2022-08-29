import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { PepUIModule } from '../../modules/pepperi.module';

import { PepSelectModule } from '@pepperi-addons/ngx-lib/select';
import { PepTextboxModule } from '@pepperi-addons/ngx-lib/textbox';
import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';

import { SchedulerJobComponent } from './scheduler-job.component';

@NgModule({
    declarations: [
        SchedulerJobComponent
    ],
    imports: [
        CommonModule,  
        ReactiveFormsModule,
        //TranslateModule.forChild(),
        PepUIModule
        /*PepSelectModule,
        PepTextboxModule,
        PepButtonModule*/
    ],
    exports: [SchedulerJobComponent]
})
export class SchedulerJobModule {
}




