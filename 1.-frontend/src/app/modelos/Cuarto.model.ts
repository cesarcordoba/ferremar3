


import { CuartoService } from '../servicios/Cuarto.service'
import * as _ from 'lodash'

export class Cuarto {
    id: number;


    ambientes : any;
    nombre : string;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
    // ambiente
    obtenerAmbientes(){
        return new Promise(resolve => {
            CuartoService.ambientes(this.id)
            .then(response => this.ambientes = response)
            .then(response => resolve(response))
        })
    }
    //- Finalizo
}