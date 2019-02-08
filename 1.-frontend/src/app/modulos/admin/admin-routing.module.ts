import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


/* Importamos los componentes que se usarán en las rutas
 */
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../../guards/auth.guard';


import { ProductosComponent } from './productos/productos.component';

import { OtrosComponent } from './otros/otros.component';

import { AmbientesComponent  } from './ambientes/ambientes.component';

import { SucursalesComponent } from './sucursales/sucursales.component';

import { PromocionesComponent  } from './promociones/promociones.component';

import { UsuariosComponent  } from './usuarios/usuarios.component';

import { PerfilproductoComponent  } from './perfilproducto/perfilproducto.component';

import { PerfilComponent } from './perfil/perfil.component';

import { ActividadesComponent } from './actividades/actividades.component';

import { PrefilpromocionesComponent  } from './prefilpromociones/prefilpromociones.component';

import { MarcasComponent  } from './marcas/marcas.component';

import { PerfilmarcaComponent  } from './perfilmarca/perfilmarca.component';

import { AnunciosComponent  } from './anuncios/anuncios.component';

import { PerfilanuncioComponent  } from './perfilanuncio/perfilanuncio.component';

import { TutorialesComponent  } from './tutoriales/tutoriales.component';


import { CategoriasComponent  } from './categorias/categorias.component';

import { PerfilcategoriaComponent  } from './perfilcategoria/perfilcategoria.component';

import { AsesoresComponent } from './asesores/asesores.component';

import { PerfilasesorComponent } from './perfilasesor/perfilasesor.component';


const admin_routers: Routes = [
	{
		path: '',
		component: AdminComponent,
		canActivate: [AuthGuard],
		canActivateChild: [AuthGuard],
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
				path: 'ambientes',
				component: AmbientesComponent
			},
			{
				path: 'marcas',
				component: MarcasComponent
			},
			{
				path: 'marca/:id',
				component: PerfilmarcaComponent
			},
			{
				path: 'sucursales',
				component: SucursalesComponent
			},
			{
				path: 'promociones',
				component: PromocionesComponent
			},
			{
				path: 'promocion/:id',
				component: PrefilpromocionesComponent
			},
			{
				path: 'anuncios',
				component: AnunciosComponent
			},
			{
				path: 'anuncio/:id',
				component: PerfilanuncioComponent
			},
			{
				path: 'usuarios',
				component: UsuariosComponent
			},
			{
				path: 'perfil',
				component: PerfilComponent
			},
			{
				path: 'actividades',
				component: ActividadesComponent
			},
			{
				path: 'usuarios',
				component: UsuariosComponent
			},
			{
				path: 'asesores',
				component: AsesoresComponent
			},
			{
				path: 'asesor/:id',
				component: PerfilasesorComponent
			},
			{
				path: 'tutoriales',
				component: TutorialesComponent
			},
			{
				path: 'categorias',
				component: CategoriasComponent
			},
			{
				path: 'categoria/:id',
				component: PerfilcategoriaComponent
			}
		]
	},
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
export class AdminRoutingModule { }
