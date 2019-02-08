// Angular Imports
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../../../extras/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, ReactiveFormsModule } from "@angular/forms";
import { ExtrasModule } from '../../../../extras/extras.module';

import { FichaversionComponent } from './fichaversion.component';


import { VersionComponent } from './version/version.component';
import { AtributosComponent } from './version/atributos/atributos.component';
import { CategoriaComponent } from './version/atributos/categoria/categoria.component';
import { AtributoComponent } from './version/atributos/categoria/atributo/atributo.component';
import { PrecioComponent } from './version/precio/precio.component';
import { ExistenciaComponent } from './version/existencia/existencia.component';
import { MargenComponent } from './version/margen/margen.component';
import { AtributosBridge  } from '../atributos.bridge';
import { CambiarstatusComponent } from './version/cambiarstatus/cambiarstatus.component';

import { AsignarversionComponent } from './version/asignarversion/asignarversion.component';
import { CrearversionComponent } from './version/crearversion/crearversion.component';

import { AutoproductoComponent } from './version/asignarversion/autoproducto/autoproducto.component';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ExtrasModule,
        ReactiveFormsModule,],
    declarations: [
        FichaversionComponent,
        VersionComponent,
        AtributosComponent,
        CategoriaComponent,
        AtributoComponent,
        PrecioComponent,
        ExistenciaComponent,
        MargenComponent,
        CambiarstatusComponent,
        AsignarversionComponent,
        CrearversionComponent,
        AutoproductoComponent
    ],
    exports: [FichaversionComponent],
    providers : [
        AtributosBridge
    ],
    entryComponents : [
        CambiarstatusComponent,
        AsignarversionComponent,
        CrearversionComponent
    ]
})
export class FichaversionModule {}
