
import { Component, OnInit, Input} from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ConfirmDelDialogComponent } from '../../../../extras/confirm-del-dialog/confirm-del-dialog.component';
import * as jimp from 'jimp'
import { FormBuilder, FormGroup } from '@angular/forms';
import {AWSService,AnuncioService, CartelService } from '../../../../servicios';
import * as _ from 'lodash'

interface Escala {
	width: number;
	height: number;
}
interface Configuracion {
	orientacion: string
	escalas: Escala[]
}
@Component({
  selector: 'imagenanuncio',
  templateUrl: './imagenanuncio.component.pug',
  styleUrls: ['./imagenanuncio.component.styl'],
providers: [AWSService]
})
export class ImagenanuncioComponent implements OnInit {
    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}
    @Input() id: number;

    @Input() anuncios: any[] = [];
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
		this.configuracion.escalas.forEach((escala, index )=> {
			this.subir(index,escala.width, escala.height);
		})
	}
	private subir(nombre, width, height?) {
		if (typeof this.file === 'string') {
			jimp.read(this.file)
				.then(image => {
					height ? null : height = width / 2;
					image.resize(width, height).quality(100).getBuffer(jimp.MIME_PNG, (err, value) => {
						this._aws.subirArchivo(value, 'bull-imagenes', 'tryadd-portadas/', 'anuncios-id-' + this.id +'-nombre-'+nombre+'-'+ width +'-'+height+'.png').subscribe(archivo => {
							if (archivo == true) {
								this.carga = true;
							} else {
								if (archivo == false) {
									this.carga = false;
									this.snack.open('Error al subir algunos de los archivos', '', {
										duration: 2000,
									});
								}
								else {
									CartelService.crear({
										url: archivo[0],
										key: archivo[1],
										tamano: width + 'x' + height
									})
										.then(portadota => CartelService.ligaranuncio(portadota.id, this.id)
											.then(portada => this.anuncios.push(portadota)).then(algomas => this.carga = false))
								}
							}
						})
					})
				})
				.catch(err => console.log(err))
		}
	}
    ngOnInit() {
        this.anuncios ? null : this.anuncios = [];

		setTimeout(() => {
			AnuncioService.carteles(this.id)
			.then(response => this.anuncios = response)
			.then(response => console.log(response))
		}, 2000)



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
		this.anuncios.forEach((portada, index) => {

			console.log(portada)
			this._aws.borrarArchivo(portada.key, 'bull-imagenes', 'tryadd-portadas/').subscribe(eliminado => {
				this.carga = true;
				if (eliminado && index == 3) {
					this.carga = false;
					this.anuncios = [];
				}
				if (eliminado == true) {
					CartelService.eliminar(portada.id)
				} else {
					this.carga == false
					this.snack.open('Error al eliminar algunos de los archivos', '', {
						duration: 2000,
					});
				}
			})
		})
	}
}
