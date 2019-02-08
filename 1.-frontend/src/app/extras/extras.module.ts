
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SafeHtmlPipe } from '../pipes/safe-html.pipe';
import { SafeImagePipe } from '../pipes/safe-image.pipe';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { DropifyComponent } from './dropify/dropify.component';
import { CroppieComponent } from './croppie/croppie.component';
import { SweetimageComponent } from './sweetimage/sweetimage.component';
import { VideoJSComponent } from './videojs/videojs.component';;
import { SlickModule } from 'ngx-slick';
// import { ImagenComponent } from './imagen/imagen.component';
// import { PreviewImageComponent } from './preview-image/preview-image.component';
// import { MultimediaComponent } from './multimedia/multimedia.component';


import { NotificacionComponent } from './notificacion/notificacion.component';
import { ConfirmDelDialogComponent } from './confirm-del-dialog/confirm-del-dialog.component';



@NgModule({
	imports: [
		CommonModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		SlickModule,
	],
	declarations: [
		SafeHtmlPipe,
		SafeImagePipe,
		AutocompleteComponent,
		DropifyComponent,
		CroppieComponent,
		SweetimageComponent,
		VideoJSComponent,
		// ImagenComponent,
		// PreviewImageComponent,
		// MultimediaComponent,
		NotificacionComponent,
		ConfirmDelDialogComponent,


	],
	exports: [
		AutocompleteComponent,
		DropifyComponent,
		CroppieComponent,
		SweetimageComponent,
		VideoJSComponent,
		SafeHtmlPipe,
		// ImagenComponent,
		// PreviewImageComponent,
		// MultimediaComponent,
		NotificacionComponent,
		ConfirmDelDialogComponent,

	],
	providers: [
	],
	entryComponents: [
		NotificacionComponent,
		ConfirmDelDialogComponent,
		// PreviewImageComponent
	]
})

export class ExtrasModule { }
