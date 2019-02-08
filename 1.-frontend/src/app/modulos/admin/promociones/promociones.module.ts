// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../extras/material.module';
import { SlickModule } from 'ngx-slick';
import { FormsModule, FormControl, ReactiveFormsModule } from "@angular/forms";
import { RangeSliderModule } from 'ngx-range-slider'

import { PromocionesComponent } from './promociones.component';


import { PaginacionpromocionesComponent } from './paginacionpromociones/paginacionpromociones.component';
import { CrearpromocionComponent } from './paginacionpromociones/crearpromocion/crearpromocion.component';


@NgModule({
    imports: [
        SlickModule.forRoot(),
        CommonModule,
        MaterialModule,
        RangeSliderModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    entryComponents : [
        CrearpromocionComponent
    ],
    declarations: [
        PromocionesComponent,
        PaginacionpromocionesComponent,
        CrearpromocionComponent,
    ],
    exports: []
})
export class PromocionesModule {}
