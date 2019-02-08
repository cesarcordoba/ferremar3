


import { EntregaService } from '../servicios/Entrega.service'
import * as _ from 'lodash'

export class Entrega {
    id: number;


    transacciones : any;
    orden : any;
    fecha : Date;
    status : number;
    descripcion : string;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
    // transaccion
    obtenerTransacciones(){
        return new Promise(resolve => {
            EntregaService.transacciones(this.id)
            .then(response => this.transacciones = response)
            .then(response => resolve(response))
        })
    }
    // orden
    obtenerOrden(){
        return new Promise(resolve => {
            EntregaService.orden(this.id)
            .then(response => this.orden = response)
            .then(response => resolve(response))
        })
    }
    //- Finalizo
}