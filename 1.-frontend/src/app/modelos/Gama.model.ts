


import { GamaService } from '../servicios/Gama.service'
import * as _ from 'lodash'

export class Gama {
    id: number;


    productos : any;
    marca : any;
    nombre : string;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
    // producto
    obtenerProductos(){
        return new Promise(resolve => {
            GamaService.productos(this.id)
            .then(response => this.productos = response)
            .then(response => resolve(response))
        })
    }
    // marca
    obtenerMarca(){
        return new Promise(resolve => {
            GamaService.marca(this.id)
            .then(response => this.marca = response)
            .then(response => resolve(response))
        })
    }
    //- Finalizo
}