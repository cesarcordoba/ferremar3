


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


import { ProductosModule } from '../admin/productos/productos.module';

import { HomeModule } from './home/home.module';

import { MetodosModule } from './metodos/metodos.module';

import { DireccionesModule } from './direcciones/direcciones.module';

import { PedidosModule } from './pedidos/pedidos.module';

import { ProcesoModule } from './proceso/proceso.module';

import { FichapedidosModule } from './compartidos/fichapedidos/fichapedidos.module';

import { PerfilpedidoModule } from './perfilpedido/perfilpedido.module';

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
		BolsaModule,
        HomeModule,
        MetodosModule,
        DireccionesModule,
        PedidosModule,
        ProcesoModule,
        FichapedidosModule,
        PerfilpedidoModule,
		],
	entryComponents: [
	],
	declarations: [
		UsuarioComponent,
		PerfilComponent
	]
})
export class UsuarioModule { }
