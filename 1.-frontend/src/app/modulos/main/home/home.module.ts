
// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../extras/material.module';
import { SlickModule } from 'ngx-slick';
import { FormsModule, FormControl, ReactiveFormsModule } from "@angular/forms";
import { RangeSliderModule } from 'ngx-range-slider'

import { HomeComponent } from './home.component';


import { SlidersComponent } from './sliders/sliders.component';
import { OfertasComponent } from './sliders/ofertas/ofertas.component';
import { EspaciosComponent } from './sliders/espacios/espacios.component';
import { EspacioComponent } from './sliders/espacios/espacio/espacio.component';
//-import { CategoriasComponent } from './sliders/categorias/categorias.component';
import { CategoriaComponent } from './sliders/categorias/categoria/categoria.component';
import { AnunciosComponent } from './anuncios/anuncios.component';
import { AnuncioComponent } from './anuncios/anuncio/anuncio.component';
import { BannersComponent } from './banners/banners.component';
import { BannerComponent } from './banners/banner/banner.component';
import { SliderprincipalComponent } from './sliderprincipal/sliderprincipal.component';
import { SliderproductosComponent } from './sliderprincipal/sliderproductos/sliderproductos.component';
import { PromocionesComponent } from './promociones/promociones.component';
import { SliderpromocionesComponent } from './promociones/sliderpromociones/sliderpromociones.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { SlidercategoriasComponent } from './categorias/slidercategorias/slidercategorias.component';
import { MasvendidosComponent } from './masvendidos/masvendidos.component';
import { GridproductosComponent } from './masvendidos/gridproductos/gridproductos.component';
import { FichacategoriaModule } from './../compartidos/fichacategoria/fichacategoria.module';
import { FichaproductoModule } from './../compartidos/fichaproducto/fichaproducto.module';


@NgModule({
    imports: [
        SlickModule.forRoot(),
        CommonModule,
        MaterialModule,
        RangeSliderModule,
        FormsModule,
        ReactiveFormsModule,

        FichacategoriaModule, 
        FichaproductoModule, ],
    declarations: [
        HomeComponent,
        SlidersComponent,
        OfertasComponent,
        EspaciosComponent,
        EspacioComponent,
        CategoriasComponent,
        CategoriaComponent,
        AnunciosComponent,
        AnuncioComponent,
        BannersComponent,
        BannerComponent,
        SliderprincipalComponent,
        SliderproductosComponent,
        PromocionesComponent,
        SliderpromocionesComponent,
        CategoriasComponent,
        SlidercategoriasComponent,
        MasvendidosComponent,
        GridproductosComponent,
    ],
    exports: []
})
export class HomeModule {}

