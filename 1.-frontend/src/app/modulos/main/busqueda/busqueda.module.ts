
// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../extras/material.module';
import { SlickModule } from 'ngx-slick';
import { FormsModule, FormControl, ReactiveFormsModule } from "@angular/forms";
import { RangeSliderModule } from 'ngx-range-slider'

import { BusquedaComponent } from './busqueda.component';


import { ModulosComponent } from './modulos/modulos.component';
import { ModuloComponent } from './modulos/modulo/modulo.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { CategoriaComponent } from './categorias/categoria/categoria.component';
import { ProductosComponent } from './productos/productos.component';
import { PrecioComponent } from './precio/precio.component';
import { FichaproductoModule } from './../compartidos/fichaproducto/fichaproducto.module';


@NgModule({
    imports: [
        SlickModule.forRoot(),
        CommonModule,
        MaterialModule,
        RangeSliderModule,
        FormsModule,
        ReactiveFormsModule,

        FichaproductoModule, ],
    declarations: [
        BusquedaComponent,
        ModulosComponent,
        ModuloComponent,
        CategoriasComponent,
        CategoriaComponent,
        ProductosComponent,
        PrecioComponent,
    ],
    exports: []
})
export class BusquedaModule {}

