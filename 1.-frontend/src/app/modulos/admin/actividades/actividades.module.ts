
// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../extras/material.module';
import { SlickModule } from 'ngx-slick';
import { FormsModule, FormControl, ReactiveFormsModule } from "@angular/forms";
import { RangeSliderModule } from 'ngx-range-slider'

import { ActividadesComponent } from './actividades.component';


import { PaginacionacccionesComponent } from './paginacionaccciones/paginacionaccciones.component';
import { PaginacionlogsComponent } from './paginacionlogs/paginacionlogs.component';


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
        ActividadesComponent,
        PaginacionacccionesComponent,
        PaginacionlogsComponent,
    ],
    exports: []
})
export class ActividadesModule {}

