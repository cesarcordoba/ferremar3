


import { VariacionprecioService } from '../servicios/Variacionprecio.service'
import * as _ from 'lodash'

export class Variacionprecio {
    id: number;

//5//5
    status : number;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         //5//5
    //- Finalizo
}