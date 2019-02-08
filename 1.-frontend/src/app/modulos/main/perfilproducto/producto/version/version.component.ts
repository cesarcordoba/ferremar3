
import { Component, OnInit } from '@angular/core';

import { Input } from '@angular/core';
import { VersionService, OfertaService } from '../../../../../servicios';
@Component({
  selector: 'version',
  templateUrl: './version.component.pug',
  styleUrls: ['./version.component.styl']
})
export class VersionComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}


    @Input() promociones

    @Input() version

    descuento : any
    oferta : any

    ofertas : any = []
    opciones : any = []

    tag = {
        descuento : false,
        oferta : false
    }

    constructor() {



    }

    ngOnInit() {

        this.descuento = this.promociones.filter(n => n.status === 1).reduce((ac, v) => {
            return ac === true ? true : v.Disponible.descuento === 1 ? true : false
        }, false)

        this.oferta = this.promociones.filter(n => n.status === 1).reduce((ac, v) => {
            return ac === true ? true : v.Disponible.oferta === 1 ? true : false
        }, false)

        if(this.descuento === true) this.ObtenerDescuento()
        if(this.oferta === true) this.obtenerOfertas()


        VersionService.opcionesdisponibles(this.version.id)
        .then(response => this.opciones = response)


    }

    obtenerOfertas(){
        this.tag.oferta = true
        VersionService.entrantes(this.version.id)
        .then(entrante => Promise.all(
            entrante.data.map(n =>
                OfertaService.salientes(n.entrantes.IdOferta).then(res =>
                    res.data )))
        .then(saliente =>
                this.ofertas = new Object({
                entrantes : entrante.data,
                salientes : saliente
        })))
    }

    ObtenerDescuento(){
        this.tag.descuento = true
        VersionService.descuentos(this.version.id)
        .then(response => {
            this.descuento = response.length > 0 ? response[0].cantidad : false
        })

    }
}
