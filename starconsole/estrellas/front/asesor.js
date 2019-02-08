var fs = require('fs');
const _ = require('lodash');


module.exports = (data, documento) => {
return new Promise(resolve => {

documento.write(`

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { MaterialModule } from './../../extras/material.module';
import { ExtrasModule } from './../../extras/extras.module';


import { AsesorComponent } from './asesor.component';
import { HomeComponent } from './home/home.component'
import { AsesorRoutingModule } from './asesor-routing.module';

import { PerfilComponent } from './perfil/perfil.component';

import { FichausuarioModule } from '../admin/compartidos/fichausuario/fichausuario.module';

import { PerfilproductoModule } from '../admin/perfilproducto/perfilproducto.module';


`)
// Especiales
documento.write(`
import { ProductosModule } from '../admin/productos/productos.module';
`)



data.forEach(n =>
documento.write(`
import { `+   _.capitalize(n.nombre)   +`Module } from './`+  (n.tipo === 'ficha' ? 'compartidos/' : '')   +    n.nombre   +`/`+   n.nombre   +`.module';
`)
)

documento.write(`
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		AsesorRoutingModule,
		SlickCarouselModule,
		FroalaEditorModule,
		FroalaViewModule,
		ExtrasModule,
		MaterialModule,
		FichausuarioModule,
		PerfilproductoModule,
		`)

//Especiales
documento.write(`
		ProductosModule,`)

data.forEach(n =>
documento.write(`
        `+_.capitalize(n.nombre)+`Module,`))

documento.write(`
		],
	entryComponents: [

	],
	declarations: [
		AsesorComponent,
		PerfilComponent
	]
})
export class AsesorModule { }
`, (algo) => resolve(true))
    })
}
