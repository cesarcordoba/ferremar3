
// Angular Imports
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../../../extras/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, ReactiveFormsModule } from "@angular/forms";
import { ExtrasModule } from '../../../../extras/extras.module';

import { FichaespacioComponent } from './fichaespacio.component';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ExtrasModule,
        ReactiveFormsModule,],
    declarations: [
        FichaespacioComponent,
    ],
    exports: [FichaespacioComponent]
})
export class FichaespacioModule {}

