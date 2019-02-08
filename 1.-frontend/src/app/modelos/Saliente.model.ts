


import { SalienteService } from '../servicios/Saliente.service'
import * as _ from 'lodash'

export class Saliente {
    id: number;

//5//5
    cantidad : number;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         //5//5
    //- Finalizo
}