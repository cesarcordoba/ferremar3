
// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../extras/material.module';
import { SlickModule } from 'ngx-slick';
import { FormsModule, FormControl, ReactiveFormsModule } from "@angular/forms";
import { RangeSliderModule } from 'ngx-range-slider'

import { MenuComponent } from './menu.component';


import { CategoriasComponent } from './categorias/categorias.component';
import { CategoriaComponent } from './categorias/categoria/categoria.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { PortadaComponent } from './buscador/portada/portada.component';




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
        CategoriasComponent
    ],
    declarations: [
        MenuComponent,
        CategoriasComponent,
        CategoriaComponent,
        BuscadorComponent,
        PortadaComponent,
    ],
    exports: [
        MenuComponent
    ]
})
export class MenuModule {}
