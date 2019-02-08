
// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../extras/material.module';
import { SlickModule } from 'ngx-slick';
import { FormsModule, FormControl, ReactiveFormsModule } from "@angular/forms";
import { RangeSliderModule } from 'ngx-range-slider'

import { SucursalComponent } from './sucursal.component';


import { FichasucursalModule } from './../compartidos/fichasucursal/fichasucursal.module';


@NgModule({
    imports: [
        SlickModule.forRoot(),
        CommonModule,
        MaterialModule,
        RangeSliderModule,
        FormsModule,
        ReactiveFormsModule,

        FichasucursalModule, ],
    declarations: [
        SucursalComponent,
    ],
    exports: []
})
export class SucursalModule {}

