
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import * as _ from 'lodash'
import { TweenMax } from 'gsap';
import { Router } from '@angular/router';

import { VersionService } from '../../../../../servicios';

import { BolsaBridge } from '../../bolsa.bridge';
declare var $: any;
@Component({
  selector: 'version',
  templateUrl: './version.component.pug',
  styleUrls: ['./version.component.styl']
})
export class VersionComponent implements OnInit, AfterViewInit {

    @Input() producto
    @Input() version
    @Input() promo

    // versiones: any
    opciones : any = []
    descuentos : any = []
    descuento : any
    oferta : boolean = false
    visible : boolean

    constructor(private bolsabridge: BolsaBridge, public route : Router) {

    }
    accion(){
        TweenMax.to($('#' + this.version.id + ' .accion'), .3, { left : this.visible ? '-100%' : 0   })
        this.visible = !this.visible
    }

    ngOnInit() {

        VersionService.opcionesdisponibles(this.version.id)
        .then(response => this.opciones = response)

    }

    ngAfterViewInit(){
        this.promo.subscribe((value) => {
            if(!_.isUndefined(value) && value[0] && value[0].Disponible.descuento > 0)
                this.ObtenerDescuento()
        })
    }

    ir(){
        this.route.navigate(['producto/' + this.producto.id ], { queryParams: { nombre: _.snakeCase(this.producto.nombre) } } )
    }

    ObtenerDescuento(){

        VersionService.descuentos(this.version.id)
        .then(response => {

            if(response.length > 0)
                this.descuento = response[0],
                this.oferta = true

        })
    }

    agregar(){
        this.bolsabridge.agregar(this.version)
    }
}
