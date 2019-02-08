


import { PosicionService } from '../servicios/Posicion.service'
import * as _ from 'lodash'

export class Posicion {
    id: number;

//5//5
    x : number;
    y : number;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         //5//5
    //- Finalizo
}