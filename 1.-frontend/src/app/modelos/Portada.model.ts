


import { PortadaService } from '../servicios/Portada.service'
import * as _ from 'lodash'

export class Portada {
    id: number;


    producto : any;
    link : string;
    key : string;
    dimension : string;
    folio : number;
    width : number;
    height : number;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
    // producto
    obtenerProducto(){
        return new Promise(resolve => {
            PortadaService.producto(this.id)
            .then(response => this.producto = response)
            .then(response => resolve(response))
        })
    }
    //- Finalizo
}