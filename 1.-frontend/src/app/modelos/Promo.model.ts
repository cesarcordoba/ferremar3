


import { PromoService } from '../servicios/Promo.service'
import * as _ from 'lodash'

export class Promo {
    id: number;


    descuentos : any;
    ofertas : any;
    transacciones : any;
    productos : any;
    nombre : string;
    status : number;
    inicio : Date;
    final : Date;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
        
    // descuento
    obtenerDescuentos(){
        return new Promise(resolve => {
            PromoService.descuentos(this.id)
            .then(response => this.descuentos = response)
            .then(response => resolve(response))
        })
    }
    // oferta
    obtenerOfertas(){
        return new Promise(resolve => {
            PromoService.ofertas(this.id)
            .then(response => this.ofertas = response)
            .then(response => resolve(response))
        })
    }
    // transaccion
    obtenerTransacciones(){
        return new Promise(resolve => {
            PromoService.transacciones(this.id)
            .then(response => this.transacciones = response)
            .then(response => resolve(response))
        })
    }
        // disponible
        obtenerProductos(){
            return new Promise(resolve => {
                PromoService.productos(this.id)
                .then(response => this.productos = response)
                .then(response => resolve(response))
            })
        }
    //- Finalizo
}