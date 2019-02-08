
// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../extras/material.module';
import { SlickModule } from 'ngx-slick';
import { FormsModule, FormControl, ReactiveFormsModule } from "@angular/forms";
import { RangeSliderModule } from 'ngx-range-slider'

import { TutorialesComponent } from './tutoriales.component';


import { PaginaciontutorialesComponent } from './paginaciontutoriales/paginaciontutoriales.component';


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
        TutorialesComponent,
        PaginaciontutorialesComponent,
    ],
    exports: []
})
export class TutorialesModule {}

