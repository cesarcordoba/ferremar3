import { Component, OnInit, Input} from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ConfirmDelDialogComponent } from '../../../../../extras/confirm-del-dialog/confirm-del-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash'
import * as jimp from 'jimp'

import {AWSService,AvatarService, UsuarioService } from '../../../../../servicios';
interface Escala {
	width: number;
	height: number;
}
interface Configuracion {
	orientacion: string
	escalas: Escala[]
}
@Component({
  selector: 'imagenavatar',
  templateUrl: './imagenavatar.component.pug',
  styleUrls: ['./imagenavatar.component.styl'],
providers: [AWSService]
})
export class ImagenavatarComponent implements OnInit {
    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}
    @Input() id: number;

    @Input() avatares: any[] = [];
	file: File | string
	configuracion: Configuracion = {
		orientacion: 'cuadrado',
		escalas: [
			{ width: 400, height: 400 },
			{ width: 200, height: 200 },
			{ width: 100, height: 100 },
			{ width: 50, height: 50 }
		]
	}
	carga = false;
	tamano_x_defecto = '400x400'
    formulario: FormGroup;
    items : any
    edicion : boolean = false
	progreso : number = 0

    constructor(
		private _aws: AWSService,
		public snack: MatSnackBar,
		public _dialog: MatDialog,
        private fb: FormBuilder,
    ) {
        this.formulario = this.fb.group({
			height : null,
			width : null,
			escala_w : null,
			escala_h : null,
		})
    }

    aceptar(){

        this.tamano_x_defecto = this.formulario.controls.height.value + 'x' + this.formulario.controls.width.value

        let resultado =  Object.keys(this.formulario.controls)
            .map(n => new Object({ [ n ] :  this.formulario.controls[n].value  }))
            .reduce((ac, v) => Object.assign(ac, v), {})

        this.configuracion.escalas = _.reverse(_.times( 4, (n) => {

            let escala_w = this.formulario.controls.escala_w.value
            let escala_h = this.formulario.controls.escala_h.value
            let height = this.formulario.controls.height.value
            let width = this.formulario.controls.width.value
            let t = ( n + 1 ) / 4

            let escala = escala_w > escala_h  ? ( escala_w / escala_h ) :  ( escala_h / escala_w )

            return {
                width : escala_h < escala_w ? ( height * t * escala ) : ( width * t ),
                height : escala_w < escala_h ? (  width * t * escala  ) : ( height * t  )
            }

        }))
        console.log(this.configuracion.escalas)
    }
	cambiarEscala($event) {
		this.configuracion.orientacion = $event.value
		switch (this.configuracion.orientacion) {
			case 'cuadrado':
				this.configuracion.escalas = [
					{ width: 400, height: 400 },
					{ width: 200, height: 200 },
					{ width: 100, height: 100 },
					{ width: 50, height: 50 }
				]
				break;
			case 'vertical':
				this.configuracion.escalas = [
					{ width: 400, height: 800 },
					{ width: 200, height: 400 },
					{ width: 100, height: 200 },
					{ width: 50, height: 100 }
				]
				break;
			case 'horizontal':
				this.configuracion.escalas = [
					{ width: 800, height: 400 },
					{ width: 400, height: 200 },
					{ width: 200, height: 100 },
					{ width: 100, height: 50 }
				]
				break;
			default:
				break;
		}
	}
	guardar() {

		this.carga = true
        let folio = _.random(0, 100000)

		console.log('empezar')

		Promise.all(
			this.items.map(async (item ) => Promise.all(
				item.imagenes.map( async (imagen) => await AvatarService.eliminar(imagen.id))
		)))
		.then(() => Promise.all(
			this.configuracion.escalas.map( async (escala, index ) =>
				await this.subir(index, folio, escala.width, escala.height )
		)))
		.then(response => {
			this.carga = false
			this.progreso = 0
			this.edicion = false
		 	this.snack.open('Se ha subido la imagen', 'Listo', {
				duration: 2000,
			})
		})


	}

	private subir(index, folio, width, height){
		return new Promise((resolve) => {
			if (typeof this.file === 'string') {
				jimp.read(this.file)
					.then(image => {
						height ? null : height = width / 2;
						image.resize(width, height).quality(100).getBuffer(jimp.MIME_PNG, (err, value) =>
							this._aws.subirArchivo(value, 'bull-imagenes', 'ferrenar-portadas/', ('avatares-id-' + this.id + width + '-' + height + '.png'))
								.subscribe(archivo => {
									console.log('si')

									AvatarService.crear({
										link: archivo[0],
										key: archivo[1],
										dimension: width + 'x' + height,
										folio : folio,
										height : height,
										width : width
									})
									.then(portadota => UsuarioService.ligaravatar(this.id, portadota.id)
										.then(progreso => this.progreso = this.progreso + 25)
										.then(progreso => resolve(progreso)))


								// console.log(archivo)
								// if (archivo == true) {
								// 	this.carga = true;
								// 	resolve('this.carga.true')
								// } else {
								// 	if (archivo == false) {
								// 		this.carga = false;
								//
								//
								// 		resolve('carga false')
								// 	}
								// 	else {
								//
								// 	}
								// }
						}))
					})
			}else{
				resolve('ni paso el primero')
			}

		})
	}
    ngOnInit() {

        this.avatares ? null : this.avatares = [];
        setTimeout(() => this.obtener(), 2000)

    }

	imprimir(){
		console.log(this)
	}


    obtener(){

        UsuarioService.avatares(this.id)
        .then(response => this.items = Object.entries(_.groupBy(response, (x) => x.folio )).map(n =>
			new Object( { folio : Number(n[0]), imagenes : n[1] })))


    }

	borrar() {
		this._dialog.open(ConfirmDelDialogComponent, {
			disableClose: true,
		}).afterClosed().subscribe(result => {
			if (result) {
				this.empezandoBorrado()
			}
		});
    }

	private empezandoBorrado() {
		this.avatares.forEach((portada, index) => {
			this._aws.borrarArchivo(portada.key, 'bull-imagenes', 'tryadd-portadas/').subscribe(eliminado => {
				this.carga = true;
				if (eliminado && index == 3) {
					this.carga = false;
					this.avatares = [];
				}
				if (eliminado == true) {
					AvatarService.eliminar(portada.id)
				} else {
					this.carga == false
					this.snack.open('Error al eliminar algunos de los archivos', '', {
						duration: 2000,
					});
				}
			})
		})
	}

    obtenerImagen(imagenes){
		if(_.isArray(imagenes)){

			let x = imagenes.find(n => n.dimension === '200x200')
			return  !_.isUndefined(x) ? x.link : null

		}
	}
}
