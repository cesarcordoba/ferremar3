import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

/* Importamos los componentes que se usarán en las rutas
 */
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
// import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';

// import { UsuarioComponent } from './usuario/usuario.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { EspaciosComponent } from './espacios/espacios.component';

import { PerfilproductoComponent } from './perfilproducto/perfilproducto.component';
import { PerfilespacioComponent } from './perfilespacio/perfilespacio.component';


import { LoginComponent } from './login/login.component';


import { RegistroComponent } from './registro/registro.component';
import { SocialGuard } from '../../guards/social.guard';

import { SocialComponent } from '../../guards/social/social.component';
import { AvisoComponent } from './aviso/aviso.component';

import { LegalesComponent } from './legales/legales.component';
import { TerminosComponent } from './legales/terminos/terminos.component';
import { CondicionesComponent } from './legales/condiciones/condiciones.component';
import { PrivacidadComponent } from './legales/privacidad/privacidad.component';
import { DevolucionesComponent } from './legales/devoluciones/devoluciones.component';


const main_routers: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'busqueda',
                component: BusquedaComponent
            },
            {
                path: 'producto/:id',
                component: PerfilproductoComponent
            },
            {
                path: 'espacios',
                component: EspaciosComponent
            },
            {
                path: 'espacio/:id',
                component: PerfilespacioComponent
            },
            {
                path: 'registro',
                component: RegistroComponent
            },
            {
                path: 'aviso',
                component: AvisoComponent
            },
            {
                path: 'legales',
                component: LegalesComponent,
                children: [
                    {
                        path: 'terminos',
                        component: TerminosComponent
                    },
                    {
                        path: 'condiciones',
                        component: CondicionesComponent
                    },
                    {
                        path: 'privacidad',
                        component: PrivacidadComponent
                    },
                    {
                        path: 'devoluciones',
                        component: DevolucionesComponent
                    },
                ]
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path : 'social/:token',
        // canActivate: [ SocialGuard ],
        component : SocialComponent,


    },
];

@NgModule({
	imports: [
		RouterModule.forChild(main_routers),
		CommonModule,
	],
	exports: [
		RouterModule
	],
	providers: []
})
export class MainRoutingModule { }
