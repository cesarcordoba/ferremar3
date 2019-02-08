


import { ImagenService } from '../servicios/Imagen.service'
import * as _ from 'lodash'

export class Imagen {
    id: number;


    producto : any;
    link : string;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
    // producto
    obtenerProducto(){
        return new Promise(resolve => {
            ImagenService.producto(this.id)
            .then(response => this.producto = response)
            .then(response => resolve(response))
        })
    }
    //- Finalizo
}