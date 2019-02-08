import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


/* Importamos los componentes que se usarán en las rutas
 */
import { AsesorComponent } from './asesor.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../../guards/auth.guard';
// import { LoginComponent } from './login/login.component';

import { ProductosComponent } from './../admin/productos/productos.component';

import { PerfilComponent } from './perfil/perfil.component';

import { PedidosComponent } from './pedidos/pedidos.component';

import { SucursalComponent } from './sucursal/sucursal.component';

import { PerfilpedidoComponent } from './perfilpedido/perfilpedido.component'

import { PerfilproductoComponent  } from '../admin/perfilproducto/perfilproducto.component';


const admin_routers: Routes = [
	{
		path: '',
		component: AsesorComponent,
		canActivate: [AuthGuard],
		// canActivateChild: [AuthGuard],
		children: [
			{
				path: '',
				component: HomeComponent
			},
			{
				path: 'productos',
				component: ProductosComponent
			},
			{
				path: 'producto/:id',
				component: PerfilproductoComponent
			},
			{
				path: 'perfil',
				component: PerfilComponent
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
				path: 'sucursal',
				component: SucursalComponent
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
export class AsesorRoutingModule { }
