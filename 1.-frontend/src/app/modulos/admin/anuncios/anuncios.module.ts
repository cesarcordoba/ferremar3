
// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../extras/material.module';
import { SlickModule } from 'ngx-slick';
import { FormsModule, FormControl, ReactiveFormsModule } from "@angular/forms";
import { RangeSliderModule } from 'ngx-range-slider'

import { AnunciosComponent } from './anuncios.component';


import { PaginacionanunciosComponent } from './paginacionanuncios/paginacionanuncios.component';
import { CrearanuncioComponent } from './paginacionanuncios/crearanuncio/crearanuncio.component';


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
        CrearanuncioComponent
    ],
    declarations: [
        AnunciosComponent,
        PaginacionanunciosComponent,
        CrearanuncioComponent,
    ],
    exports: []
})
export class AnunciosModule {}
