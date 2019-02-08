
// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtrasModule } from '../../../extras/extras.module'
import { MaterialModule } from '../../../extras/material.module';
import { SlickModule } from 'ngx-slick';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { PerfilproductoComponent } from './perfilproducto.component';


import { RelacionadosComponent } from './relacionados/relacionados.component';
import { ProductoComponent } from './producto/producto.component';
import { LineaComponent } from './producto/linea/linea.component';
import { GamaComponent } from './producto/gama/gama.component';
import { VersionComponent } from './producto/version/version.component';
import { ImagenesComponent } from './producto/imagenes/imagenes.component';
import { AmbientesComponent } from './ambientes/ambientes.component';
import { AmbienteComponent } from './ambientes/ambiente/ambiente.component';
import { TablainfoproductoComponent } from './tablainfoproducto/tablainfoproducto.component';
import { FichaproductoModule } from './../compartidos/fichaproducto/fichaproducto.module';


@NgModule({
    imports: [
        SlickModule.forRoot(),
        CommonModule,
        ExtrasModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2ImgMaxModule,

        FichaproductoModule, ],
    declarations: [
        PerfilproductoComponent,
        RelacionadosComponent,
        ProductoComponent,
        LineaComponent,
        GamaComponent,
        VersionComponent,
        ImagenesComponent,
        AmbientesComponent,
        AmbienteComponent,
        TablainfoproductoComponent,
    ],
    entryComponents : [
    ],
    exports: []
})
export class PerfilproductoModule {}

