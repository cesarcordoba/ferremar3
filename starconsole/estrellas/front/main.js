var fs = require('fs');
const _ = require('lodash');


module.exports = (data, documento) => {
return new Promise(resolve => {

documento.write(`

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

`)

data.forEach(n =>
documento.write(`
import { `+   _.capitalize(n.nombre)   +`Module } from './`+   n.nombre   +`/`+   n.nombre   +`.module';
`))

documento.write(`
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
`)

data.forEach(n =>
documento.write(`
        `+_.capitalize(n.nombre)+`Module,`))

documento.write(`
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
`, (algo) => resolve(true))
    })
}
