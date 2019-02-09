

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { MaterialModule } from './../../extras/material.module';
import { ExtrasModule } from './../../extras/extras.module';


import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component'
import { AdminRoutingModule } from './admin-routing.module';

import { PerfilComponent } from './perfil/perfil.component';
import { HomeModule } from './home/home.module';

import { ProductosModule } from './productos/productos.module';

import { OtrosModule } from './otros/otros.module';

import { AmbientesModule } from './ambientes/ambientes.module';

import { SucursalesModule } from './sucursales/sucursales.module';

import { PromocionesModule } from './promociones/promociones.module';

import { UsuariosModule } from './usuarios/usuarios.module';

import { PerfilproductoModule } from './perfilproducto/perfilproducto.module';

import { FichausuarioModule } from './compartidos/fichausuario/fichausuario.module';

import { ActividadesModule } from './actividades/actividades.module';

import { PrefilpromocionesModule } from './prefilpromociones/prefilpromociones.module';

import { MarcasModule } from './marcas/marcas.module';

import { PerfilmarcaModule } from './perfilmarca/perfilmarca.module';

import { AnunciosModule } from './anuncios/anuncios.module';

import { PerfilanuncioModule } from './perfilanuncio/perfilanuncio.module';

import { AsesoresModule } from './asesores/asesores.module';

import { CategoriasModule } from './categorias/categorias.module'

import { PerfilasesorModule } from './perfilasesor/perfilasesor.module';

import { TutorialesModule } from './tutoriales/tutoriales.module';

import { PerfiltutorialesModule } from './perfiltutoriales/perfiltutoriales.module';

import { PerfilcategoriaModule } from './perfilcategoria/perfilcategoria.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule, ReactiveFormsModule,
		AdminRoutingModule,
		SlickCarouselModule,
		FroalaEditorModule, FroalaViewModule,
		ExtrasModule,
		MaterialModule,
        HomeModule,
        ProductosModule,
        OtrosModule,
        AmbientesModule,
        SucursalesModule,
        PromocionesModule,
        UsuariosModule,
        PerfilproductoModule,
        FichausuarioModule,
        ActividadesModule,
        PrefilpromocionesModule,
        MarcasModule,
        PerfilmarcaModule,
        AnunciosModule,
        PerfilanuncioModule,
        AsesoresModule,
        PerfilasesorModule,
        TutorialesModule,
        PerfiltutorialesModule,
        CategoriasModule,
        PerfilcategoriaModule
		],
	entryComponents: [

	],
	declarations: [
		AdminComponent,
		
		PerfilComponent
	]
})
export class AdminModule { }
