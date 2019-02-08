


import { DisponibleService } from '../servicios/Disponible.service'
import * as _ from 'lodash'

export class Disponible {
    id: number;

//5//5
    oferta : number;
    descuento : number;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         //5//5
    //- Finalizo
}