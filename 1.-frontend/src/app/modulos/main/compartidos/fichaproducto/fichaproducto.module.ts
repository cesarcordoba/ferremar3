
// Angular Imports
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../../../extras/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, ReactiveFormsModule } from "@angular/forms";


import { FichaproductoComponent } from './fichaproducto.component';


import { VersionComponent } from './version/version.component';
@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,],
    declarations: [
        FichaproductoComponent,
        VersionComponent,
    ],
    exports: [FichaproductoComponent]
})
export class FichaproductoModule {}

