
// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../extras/material.module';
import { SlickModule } from 'ngx-slick';
import { FormsModule, FormControl, ReactiveFormsModule } from "@angular/forms";
import { RangeSliderModule } from 'ngx-range-slider'

import { ProcesoComponent } from './proceso.component';


import { ConfirmacionComponent } from './confirmacion/confirmacion.component';
import { EnvioypagoComponent } from './envioypago/envioypago.component';


@NgModule({
    imports: [
        SlickModule.forRoot(),
        CommonModule,
        MaterialModule,
        RangeSliderModule,
        FormsModule,
        ReactiveFormsModule,
],
    declarations: [
        ProcesoComponent,
        ConfirmacionComponent,
        EnvioypagoComponent,
    ],
    exports: []
})
export class ProcesoModule {}
