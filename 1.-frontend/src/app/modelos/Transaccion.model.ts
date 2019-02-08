


import { TransaccionService } from '../servicios/Transaccion.service'
import * as _ from 'lodash'

export class Transaccion {
    id: number;


    version : any;
    margenes : any;
    promo : any;
    descuentos : any;
    precio : any;
    orden : any;
    entrega : any;
    cantidad : number;
    total : number;
    status : number;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
    // version
    obtenerVersion(){
        return new Promise(resolve => {
            TransaccionService.version(this.id)
            .then(response => this.version = response)
            .then(response => resolve(response))
        })
    }
    // margen
    obtenerMargenes(){
        return new Promise(resolve => {
            TransaccionService.margenes(this.id)
            .then(response => this.margenes = response)
            .then(response => resolve(response))
        })
    }
    // promo
    obtenerPromo(){
        return new Promise(resolve => {
            TransaccionService.promo(this.id)
            .then(response => this.promo = response)
            .then(response => resolve(response))
        })
    }
    // descuento
    obtenerDescuentos(){
        return new Promise(resolve => {
            TransaccionService.descuentos(this.id)
            .then(response => this.descuentos = response)
            .then(response => resolve(response))
        })
    }
    // precio
    obtenerPrecio(){
        return new Promise(resolve => {
            TransaccionService.precio(this.id)
            .then(response => this.precio = response)
            .then(response => resolve(response))
        })
    }
    // orden
    obtenerOrden(){
        return new Promise(resolve => {
            TransaccionService.orden(this.id)
            .then(response => this.orden = response)
            .then(response => resolve(response))
        })
    }
    // entrega
    obtenerEntrega(){
        return new Promise(resolve => {
            TransaccionService.entrega(this.id)
            .then(response => this.entrega = response)
            .then(response => resolve(response))
        })
    }
    //- Finalizo
}