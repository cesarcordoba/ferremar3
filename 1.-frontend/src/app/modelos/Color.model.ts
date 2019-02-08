


import { ColorService } from '../servicios/Color.service'
import * as _ from 'lodash'

export class Color {
    id: number;


    productos : any;
    nombre : string;
    hex : string;
    status : number;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
    // producto
    obtenerProductos(){
        return new Promise(resolve => {
            ColorService.productos(this.id)
            .then(response => this.productos = response)
            .then(response => resolve(response))
        })
    }
    //- Finalizo
}