
// Angular Imports
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../../../extras/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, ReactiveFormsModule } from "@angular/forms";
import { ExtrasModule } from '../../../../extras/extras.module';

import { FichaproductoComponent } from './fichaproducto.component';


import { ProductoComponent } from './producto/producto.component';
import { AutocategoriaComponent } from './producto/autocategoria/autocategoria.component';
import { AutomarcaComponent } from './producto/automarca/automarca.component';
import { AutolineaComponent } from './producto/autolinea/autolinea.component';
import { AutogamaComponent } from './producto/autogama/autogama.component';
import { ColoresComponent } from './producto/colores/colores.component';
import { MargenesComponent } from './producto/margenes/margenes.component';
@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ExtrasModule,
        ReactiveFormsModule,],
    declarations: [
        FichaproductoComponent,
        ProductoComponent,
        AutocategoriaComponent,
        AutomarcaComponent,
        AutolineaComponent,
        AutogamaComponent,
        ColoresComponent,
        MargenesComponent,
    ],
    exports: [FichaproductoComponent]
})
export class FichaproductoModule {}

