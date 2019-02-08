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


import { UsuarioComponent } from './usuario.component';
import { HomeComponent } from './home/home.component'
import { UsuarioRoutingModule } from './usuario-routing.module';


import { FichausuarioModule } from '../admin/compartidos/fichausuario/fichausuario.module';
import { PerfilComponent } from './perfil/perfil.component';


import { MenuModule } from '../main/menu/menu.module';
import { BolsaModule } from '../main/bolsa/bolsa.module';

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
		UsuarioRoutingModule,
		SlickCarouselModule,
		FroalaEditorModule,
		FroalaViewModule,
		ExtrasModule,
		FichausuarioModule,
		MaterialModule,
		MenuModule,
		BolsaModule,`)
//
// // Especiales
// documento.write(`
// 		ProductosModule,`)

data.forEach(n =>
documento.write(`
        `+_.capitalize(n.nombre)+`Module,`))

documento.write(`
		],
	entryComponents: [
	],
	declarations: [
		UsuarioComponent,
		PerfilComponent
	]
})
export class UsuarioModule { }
`, (algo) => resolve(true))
    })
}
