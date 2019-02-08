


import { DescuentoService } from '../servicios/Descuento.service'
import * as _ from 'lodash'

export class Descuento {
    id: number;


    versiones : any;
    promo : any;
    transacciones : any;
    cantidad : number;
    status : number;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
    // version
    obtenerVersiones(){
        return new Promise(resolve => {
            DescuentoService.versiones(this.id)
            .then(response => this.versiones = response)
            .then(response => resolve(response))
        })
    }
    // promo
    obtenerPromo(){
        return new Promise(resolve => {
            DescuentoService.promo(this.id)
            .then(response => this.promo = response)
            .then(response => resolve(response))
        })
    }
    // transaccion
    obtenerTransacciones(){
        return new Promise(resolve => {
            DescuentoService.transacciones(this.id)
            .then(response => this.transacciones = response)
            .then(response => resolve(response))
        })
    }
    //- Finalizo
}