


import { TutorialService } from '../servicios/Tutorial.service'
import * as _ from 'lodash'

export class Tutorial {
    id: number;


    nombre : string;
    contenido : string;
    video : string;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
    //- Finalizo
}