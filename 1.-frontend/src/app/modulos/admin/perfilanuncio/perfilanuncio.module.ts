
// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtrasModule } from '../../../extras/extras.module'
import { MaterialModule } from '../../../extras/material.module';
import { SlickModule } from 'ngx-slick';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { PerfilanuncioComponent } from './perfilanuncio.component';


import { ImagenanuncioComponent } from './imagenanuncio/imagenanuncio.component';
import { FormularioanuncioComponent } from './formularioanuncio/formularioanuncio.component';


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
        PerfilanuncioComponent,
        ImagenanuncioComponent,
        FormularioanuncioComponent,
    ],
    entryComponents : [
    ],
    exports: []
})
export class PerfilanuncioModule {}

