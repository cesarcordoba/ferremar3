

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



import { ProductosModule } from '../admin/productos/productos.module';

import { HomeModule } from './home/home.module';

import { PedidosModule } from './pedidos/pedidos.module';

import { SucursalModule } from './sucursal/sucursal.module';

import { PerfilpedidoModule } from './perfilpedido/perfilpedido.module';

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
		
		ProductosModule,
        HomeModule,
        PedidosModule,
        SucursalModule,
        PerfilpedidoModule,
		],
	entryComponents: [

	],
	declarations: [
		AsesorComponent,
		PerfilComponent
	]
})
export class AsesorModule { }
