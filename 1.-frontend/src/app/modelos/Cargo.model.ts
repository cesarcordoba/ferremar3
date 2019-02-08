


import { CargoService } from '../servicios/Cargo.service'
import * as _ from 'lodash'

export class Cargo {
    id: number;


    orden : any;
    tarjeta : any;
    descripcion : string;
    request : string;
    status : string;
    fee : number;
    tax : number;
    amount : number;
    autorizacion : string;
    error : number;
    http : number;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
    // orden
    obtenerOrden(){
        return new Promise(resolve => {
            CargoService.orden(this.id)
            .then(response => this.orden = response)
            .then(response => resolve(response))
        })
    }
    // tarjeta
    obtenerTarjeta(){
        return new Promise(resolve => {
            CargoService.tarjeta(this.id)
            .then(response => this.tarjeta = response)
            .then(response => resolve(response))
        })
    }
    //- Finalizo
}