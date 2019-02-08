
// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../extras/material.module';
import { SlickModule } from 'ngx-slick';
import { FormsModule, FormControl, ReactiveFormsModule } from "@angular/forms";
import { RangeSliderModule } from 'ngx-range-slider'

import { MetodosComponent } from './metodos.component';


import { FichatarjetasModule } from './../compartidos/fichatarjetas/fichatarjetas.module';


@NgModule({
    imports: [
        SlickModule.forRoot(),
        CommonModule,
        MaterialModule,
        RangeSliderModule,
        FormsModule,
        ReactiveFormsModule,

        FichatarjetasModule, ],
    declarations: [
        MetodosComponent,
    ],
    exports: []
})
export class MetodosModule {}

