import { APILOCAL } from './../environments/environment.prod';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { ImagenService, ServiciosModule } from 'common';
import { AdminModule } from './modulos/admin/admin.module';
import { MainModule } from './modulos/main/main.module';
import { UsuarioModule } from './modulos/usuario/usuario.module';
import { AsesorModule } from './modulos/asesor/asesor.module';
import { AuthService } from './servicios/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { SocialGuard } from './guards/social.guard';


import { SucursalService } from './servicios/Sucursal.service';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		NgtUniversalModule,
		AppRoutingModule,
		// AdminModule,
		// MainModule,
		// UsuarioModule,
		// AsesorModule,
		FroalaEditorModule.forRoot(),
		FroalaViewModule.forRoot()
		// ServiciosModule.forRoot(APILOCAL.url),
	],
	providers: [
		AuthService,
		AuthGuard,
		SocialGuard,
		SucursalService
	],
})
export class AppModule { }
