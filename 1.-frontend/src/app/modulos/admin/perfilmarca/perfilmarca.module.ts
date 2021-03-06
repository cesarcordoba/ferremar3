
// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtrasModule } from '../../../extras/extras.module'
import { MaterialModule } from '../../../extras/material.module';
import { SlickModule } from 'ngx-slick';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { PerfilmarcaComponent } from './perfilmarca.component';


import { ChipmargenesComponent } from './chipmargenes/chipmargenes.component';
import { CrearmargenComponent } from './chipmargenes/crearmargen/crearmargen.component';


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
    declarations: [
        PerfilmarcaComponent,
        ChipmargenesComponent,
        CrearmargenComponent,
    ],
    entryComponents : [
        CrearmargenComponent,
    ],
    exports: []
})
export class PerfilmarcaModule {}

