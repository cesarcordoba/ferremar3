import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: './modulos/main/main.module#MainModule'
	},
	{
		path: 'admin',
		loadChildren: './modulos/admin/admin.module#AdminModule'
	},
	{
		path: 'asesor',
		loadChildren: './modulos/asesor/asesor.module#AsesorModule'
	},
	{
		path: 'usuario',
		loadChildren: './modulos/usuario/usuario.module#UsuarioModule'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
