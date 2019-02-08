
// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtrasModule } from '../../../extras/extras.module'
import { MaterialModule } from '../../../extras/material.module';
import { SlickModule } from 'ngx-slick';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { PerfilpedidoComponent } from './perfilpedido.component';


import { CrearentregaComponent } from './crearentrega/crearentrega.component';
import { CambiardireccionComponent } from './cambiardireccion/cambiardireccion.component';
import { CambiartarjetaComponent } from './cambiartarjeta/cambiartarjeta.component';


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
        PerfilpedidoComponent,
        CrearentregaComponent,
        CambiardireccionComponent,
        CambiartarjetaComponent,
    ],
    entryComponents : [
        CrearentregaComponent,
        CambiardireccionComponent,
        CambiartarjetaComponent,
    ],
    exports: []
})
export class PerfilpedidoModule {}

