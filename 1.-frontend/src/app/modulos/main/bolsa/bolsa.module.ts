// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../extras/material.module';
import { SlickModule } from 'ngx-slick';
import { FormsModule, FormControl, ReactiveFormsModule } from "@angular/forms";
import { RangeSliderModule } from 'ngx-range-slider'

import { BolsaComponent } from './bolsa.component';
import { BolsaBridge } from '../compartidos/bolsa.bridge';


import { ListadecomprasComponent } from './listadecompras/listadecompras.component';


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
        ListadecomprasComponent
    ],
    declarations: [
        BolsaComponent,
        ListadecomprasComponent,
    ],
    exports: [
        BolsaComponent
    ],
    providers : [
        BolsaBridge
    ]
})
export class BolsaModule {}
