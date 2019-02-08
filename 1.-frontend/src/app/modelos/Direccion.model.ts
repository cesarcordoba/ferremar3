


import { DireccionService } from '../servicios/Direccion.service'
import * as _ from 'lodash'

export class Direccion {
    id: number;


    usuario : any;
    ordenes : any;
    calle : string;
    ciudad : string;
    codigopostal : number;
    colonia : string;
    estado : string;
    numero : string;
    principal : number;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
    // usuario
    obtenerUsuario(){
        return new Promise(resolve => {
            DireccionService.usuario(this.id)
            .then(response => this.usuario = response)
            .then(response => resolve(response))
        })
    }
    // orden
    obtenerOrdenes(){
        return new Promise(resolve => {
            DireccionService.ordenes(this.id)
            .then(response => this.ordenes = response)
            .then(response => resolve(response))
        })
    }
    //- Finalizo
}