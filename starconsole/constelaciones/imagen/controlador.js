const _ = require('lodash');
const { planeta, meteoro } = require('../../ovnis/relaciones.js')

module.exports = (documento, componente, nivel) => {
return new Promise(resolve => {
documento.write(`
import { Component, OnInit, Input} from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ConfirmDelDialogComponent } from '../../`+ _.repeat('../', nivel) + `extras/confirm-del-dialog/confirm-del-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash'
import * as jimp from 'jimp'
`)
console.log(componente)

Promise.all([
    componente.getPlaneta({include: [{model: planeta, as: 'SubPlanetas'}]}),
    // componente.getSubConstelaciones()
]).then(response => {

    let planeta = response[0]

if(planeta){
documento.write(`
import {AWSService,`+ _.capitalize(planeta.singular) + `Service, `+_.capitalize(planeta.SubPlanetas[0].singular)+`Service } from '../../`+ _.repeat('../', nivel) + `servicios';`)
}

documento.write(`
interface Escala {
	width: number;
	height: number;
}
interface Configuracion {
	orientacion: string
	escalas: Escala[]
}
@Component({
  selector: '` + componente.nombre + `',
  templateUrl: './` + componente.nombre + `.component.pug',
  styleUrls: ['./` + componente.nombre + `.component.styl'],
providers: [AWSService]
})
export class `+ _.capitalize(componente.nombre) + `Component implements OnInit {
    borde = ` +  _.isEqual( componente.status, 1 )  + ` ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}
    @Input() id: number;
`)


if(planeta)
documento.write(`
    @Input() ` + planeta.plural + `: any[] = [];
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
        let folio = _.random(0, 100000)
		this.configuracion.escalas.forEach((escala, index )=> {
			this.subir(index, folio, escala.width, escala.height );
		})
	}
	private subir(index, folio, width, height){

		if (typeof this.file === 'string') {
			jimp.read(this.file)
				.then(image => {
					height ? null : height = width / 2;
					image.resize(width, height).quality(100).getBuffer(jimp.MIME_PNG, (err, value) => {
						this._aws.subirArchivo(value, 'bull-imagenes', 'tryadd-portadas/', ('`+planeta.plural+`-id-' + this.id + width + '-' + height + '.png')).subscribe(archivo => {
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
									`+ _.capitalize(planeta.singular) + `Service.crear({
                                        link: archivo[0],
										key: archivo[1],
										dimension: width + 'x' + height,
										folio : folio,
										height : height,
										width : width
									})
										.then(portadota => `+_.capitalize(planeta.SubPlanetas[0].singular)+`Service.ligar`+planeta.singular+`(this.id, portadota.id)
											.then(portada => this.`+planeta.plural+`.push(portadota)).then(algomas => this.carga = false))
								}
							}
						})
					})
				})
				.catch(err => console.log(err))
		}
	}
    ngOnInit() {

        this.`+planeta.plural+` ? null : this.`+planeta.plural+` = [];
        setTimeout(() => this.obtener(), 2000)

    }


    obtener(){

        `+_.capitalize(planeta.SubPlanetas[0].singular)+`Service.`+ planeta.plural + `(this.id)
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
		this.`+planeta.plural+`.forEach((portada, index) => {
			this._aws.borrarArchivo(portada.key, 'bull-imagenes', 'tryadd-portadas/').subscribe(eliminado => {
				this.carga = true;
				if (eliminado && index == 3) {
					this.carga = false;
					this.`+planeta.plural+` = [];
				}
				if (eliminado == true) {
					`+ _.capitalize(planeta.singular) + `Service.eliminar(portada.id)
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
		if(_.isArray(imagenes))
			return imagenes.find(n => n.dimension === '200x200').link
	}
}`, (algo) => resolve(true))
    })
})
}
