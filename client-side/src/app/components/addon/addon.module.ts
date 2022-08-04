import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PepUIModule } from '../../modules/pepperi.module';
import { MaterialModule } from '../../modules/material.module';
import { AddonComponent } from './addon.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AddonComponent

    ],
    imports: [
        CommonModule,
        PepUIModule,
        MaterialModule,
        FormsModule

    ],
    providers: []
})
export class AddonModule {
}




