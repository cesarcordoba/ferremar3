


import { SucursalService } from '../servicios/Sucursal.service'
import * as _ from 'lodash'

export class Sucursal {
    id: number;

//3
    ordenes : any;
    versiones : any;
    clave : number;
    nombre : string;
    status : number;
    calle : string;
    colonia : string;
    estado : string;
    codigopostal : string;
    latitude : number;
    longitude : number;
    numero : number;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
        //3
    // orden
    obtenerOrdenes(){
        return new Promise(resolve => {
            SucursalService.ordenes(this.id)
            .then(response => this.ordenes = response)
            .then(response => resolve(response))
        })
    }
        // inventario
        obtenerVersiones(){
            return new Promise(resolve => {
                SucursalService.versiones(this.id)
                .then(response => this.versiones = response)
                .then(response => resolve(response))
            })
        }
    //- Finalizo
}