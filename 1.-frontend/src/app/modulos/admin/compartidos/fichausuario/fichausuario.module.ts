
// Angular Imports
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../../../extras/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, ReactiveFormsModule } from "@angular/forms";
import { ExtrasModule } from '../../../../extras/extras.module';

import { FichausuarioComponent } from './fichausuario.component';


import { FormulariousuarioComponent } from './formulariousuario/formulariousuario.component';
import { FormulariollaveComponent } from './formulariollave/formulariollave.component';
import { ImagenavatarComponent } from './imagenavatar/imagenavatar.component';
@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ExtrasModule,
        ReactiveFormsModule,],
    declarations: [
        FichausuarioComponent,
        FormulariousuarioComponent,
        FormulariollaveComponent,
        ImagenavatarComponent,
    ],
    exports: [FichausuarioComponent]
})
export class FichausuarioModule {}

