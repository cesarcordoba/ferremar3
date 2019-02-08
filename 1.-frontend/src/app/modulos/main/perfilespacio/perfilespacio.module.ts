
// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtrasModule } from '../../../extras/extras.module'
import { MaterialModule } from '../../../extras/material.module';
import { SlickModule } from 'ngx-slick';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { PerfilespacioComponent } from './perfilespacio.component';


import { FichaespacioModule } from './../compartidos/fichaespacio/fichaespacio.module';


@NgModule({
    imports: [
        SlickModule.forRoot(),
        CommonModule,
        ExtrasModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2ImgMaxModule,

        FichaespacioModule, ],
    declarations: [
        PerfilespacioComponent,
    ],
    entryComponents : [
    ],
    exports: []
})
export class PerfilespacioModule {}

