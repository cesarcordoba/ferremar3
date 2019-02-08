import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';

import { SlickCarouselModule } from 'ngx-slick-carousel';

import { MaterialModule } from '../../extras/material.module';
import { ExtrasModule } from '../../extras/extras.module';


import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

// insertados
import { SocialComponent } from '../../guards/social/social.component';
import { FichatarjetasModule } from './../usuario/compartidos/fichatarjetas/fichatarjetas.module';
import { FichadireccionesModule } from './../usuario/compartidos/fichadirecciones/fichadirecciones.module';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

import { LegalesComponent } from './legales/legales.component';
import { TerminosComponent } from './legales/terminos/terminos.component';
import { CondicionesComponent } from './legales/condiciones/condiciones.component';
import { PrivacidadComponent } from './legales/privacidad/privacidad.component';
import { DevolucionesComponent } from './legales/devoluciones/devoluciones.component';


import { HomeModule } from './home/home.module';

import { BusquedaModule } from './busqueda/busqueda.module';

import { PerfilproductoModule } from './perfilproducto/perfilproducto.module';

import { EspaciosModule } from './espacios/espacios.module';

import { MenuModule } from './menu/menu.module';

import { BolsaModule } from './bolsa/bolsa.module';

import { PerfilespacioModule } from './perfilespacio/perfilespacio.module';

import { AvisoModule } from './aviso/aviso.module';

import { BarramenuhomeModule } from './barramenuhome/barramenuhome.module';

import { BuscadormainModule } from './buscadormain/buscadormain.module';

@NgModule({
	imports: [
		CommonModule,
		MainRoutingModule,
		SlickCarouselModule,
		MaterialModule,
		ExtrasModule,
		FormsModule,
		ReactiveFormsModule,
		FichatarjetasModule,
		FichadireccionesModule,

        HomeModule,
        BusquedaModule,
        PerfilproductoModule,
        EspaciosModule,
        MenuModule,
        BolsaModule,
        PerfilespacioModule,
        AvisoModule,
        BarramenuhomeModule,
        BuscadormainModule,
	],
	declarations: [
		LegalesComponent,
		TerminosComponent,
		CondicionesComponent,
		PrivacidadComponent,
		DevolucionesComponent,
		MainComponent,
		// IniciarSesionComponent,
		LoginComponent,
		RegistroComponent,
		SocialComponent
	],
	entryComponents : [
        LoginComponent
    ],
})
export class MainModule { }
