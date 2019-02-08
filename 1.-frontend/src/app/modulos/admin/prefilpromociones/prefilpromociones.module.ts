
// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtrasModule } from '../../../extras/extras.module'
import { MaterialModule } from '../../../extras/material.module';
import { SlickModule } from 'ngx-slick';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { PrefilpromocionesComponent } from './prefilpromociones.component';


import { PaginacionproductospromosComponent } from './paginacionproductospromos/paginacionproductospromos.component';
import { PaginaciondescuentosComponent } from './paginaciondescuentos/paginaciondescuentos.component';
import { PaginacionofertaComponent } from './paginacionoferta/paginacionoferta.component';
import { BuscarproductoComponent } from './buscarproducto/buscarproducto.component';
import { BuscarversionComponent } from './buscarversion/buscarversion.component';
import { AjustarcantidadComponent } from './ajustarcantidad/ajustarcantidad.component';
import { FormulariopromocionComponent } from './formulariopromocion/formulariopromocion.component';


@NgModule({
    imports: [
        SlickModule.forRoot(),
        CommonModule,
        ExtrasModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2ImgMaxModule,
    ],
    entryComponents : [
        BuscarproductoComponent,
        BuscarversionComponent,
        AjustarcantidadComponent
    ],
    declarations: [
        PrefilpromocionesComponent,
        FormulariopromocionComponent,
        PaginacionproductospromosComponent,
        PaginaciondescuentosComponent,
        PaginacionofertaComponent,
        BuscarproductoComponent,
        BuscarversionComponent,
        AjustarcantidadComponent
    ],
    exports: []
})
export class PrefilpromocionesModule {}
