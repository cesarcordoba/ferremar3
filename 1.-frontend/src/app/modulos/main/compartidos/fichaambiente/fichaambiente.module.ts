
// Angular Imports
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../../../extras/material.module';


import { FichaambienteComponent } from './fichaambiente.component';


@NgModule({
    imports: [
        MaterialModule,
    ],
    declarations: [
        FichaambienteComponent,
    ],
    exports: [
        FichaambienteComponent
    ]
})
export class FichaambienteModule {}

