import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


/* Importamos los componentes que se usarán en las rutas
 */
import { UsuarioComponent } from './usuario.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../../guards/auth.guard';
// import { LoginComponent } from './login/login.component';


import { PerfilComponent } from './perfil/perfil.component';

import { DireccionesComponent } from './direcciones/direcciones.component';

import { MetodosComponent } from './metodos/metodos.component';

import { PedidosComponent } from './pedidos/pedidos.component';

import { PerfilpedidoComponent } from './perfilpedido/perfilpedido.component';



import { ProcesoComponent } from './proceso/proceso.component';


const admin_routers: Routes = [
	{
		path: '',
		component: UsuarioComponent,
		canActivate: [AuthGuard],
		canActivateChild: [AuthGuard],
		children: [
			{
				path: '',
				component: HomeComponent
			},
			{
				path: 'perfil',
				component: PerfilComponent
			},
			{
				path: 'direcciones',
				component: DireccionesComponent
			},
			{
				path: 'metodos',
				component: MetodosComponent
			},
			{
				path: 'pedidos',
				component: PedidosComponent
			},
			{
				path: 'pedido/:id',
				component: PerfilpedidoComponent
			},
			{
				path: 'proceso',
				component: ProcesoComponent
			},
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(admin_routers),
		CommonModule
	],
	exports: [
		RouterModule
	],
})
export class UsuarioRoutingModule { }
