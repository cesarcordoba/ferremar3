


import { EspacioService } from '../servicios/Espacio.service'
import * as _ from 'lodash'

export class Espacio {
    id: number;


    ambiente : any;
    link : string;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
    // ambiente
    obtenerAmbiente(){
        return new Promise(resolve => {
            EspacioService.ambiente(this.id)
            .then(response => this.ambiente = response)
            .then(response => resolve(response))
        })
    }
    //- Finalizo
}