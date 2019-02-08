
// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../extras/material.module';
import { SlickModule } from 'ngx-slick';
import { FormsModule, FormControl, ReactiveFormsModule } from "@angular/forms";
import { RangeSliderModule } from 'ngx-range-slider'

import { DireccionesComponent } from './direcciones.component';


import { FichadireccionesModule } from './../compartidos/fichadirecciones/fichadirecciones.module';


@NgModule({
    imports: [
        SlickModule.forRoot(),
        CommonModule,
        MaterialModule,
        RangeSliderModule,
        FormsModule,
        ReactiveFormsModule,

        FichadireccionesModule, ],
    declarations: [
        DireccionesComponent,
    ],
    exports: []
})
export class DireccionesModule {}

