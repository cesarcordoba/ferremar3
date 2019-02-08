


import { VariacionmargenService } from '../servicios/Variacionmargen.service'
import * as _ from 'lodash'

export class Variacionmargen {
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