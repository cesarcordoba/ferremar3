
// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../extras/material.module';
import { SlickModule } from 'ngx-slick';
import { FormsModule, FormControl, ReactiveFormsModule } from "@angular/forms";
import { RangeSliderModule } from 'ngx-range-slider'

import { ProductosComponent } from './productos.component';


import { AutoproductoComponent } from './autoproducto/autoproducto.component';
import { AutocategoriaComponent } from './autocategoria/autocategoria.component';
import { AutoversionComponent } from './autoversion/autoversion.component';
import { AutomarcaComponent } from './automarca/automarca.component';
import { AutolineaComponent } from './autolinea/autolinea.component';
import { AutogamaComponent } from './autogama/autogama.component';
import { ListaproductosComponent } from './listaproductos/listaproductos.component';
import { VersionesComponent } from './listaproductos/versiones/versiones.component';
import { DetalleversionComponent } from './listaproductos/versiones/detalleversion/detalleversion.component';
import { DetalleproductoComponent } from './listaproductos/detalleproducto/detalleproducto.component';
import { ProductoComponent } from './listaproductos/producto/producto.component';

import { FichaproductoModule } from './../compartidos/fichaproducto/fichaproducto.module';
import { FichaversionModule } from './../compartidos/fichaversion/fichaversion.module';


@NgModule({
    imports: [
        SlickModule.forRoot(),
        CommonModule,
        MaterialModule,
        RangeSliderModule,
        FormsModule,
        ReactiveFormsModule,
        FichaproductoModule,
        FichaversionModule,
    ],
    entryComponents : [
        DetalleproductoComponent,
        DetalleversionComponent
    ],
    declarations: [
        ProductosComponent,
        AutoproductoComponent,
        AutocategoriaComponent,
        AutoversionComponent,
        AutomarcaComponent,
        AutolineaComponent,
        AutogamaComponent,
        ListaproductosComponent,
        VersionesComponent,
        DetalleversionComponent,
        DetalleproductoComponent,
        ProductoComponent,
    ],
    exports: [
        ProductosComponent
    ]
})
export class ProductosModule {}
