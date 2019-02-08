


import { AnuncioService } from '../servicios/Anuncio.service'
import * as _ from 'lodash'

export class Anuncio {
    id: number;


    carteles : any;
    link : string;
    tipo : string;
    posicion : number;
    nombre : string;
    status : number;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
    // cartel
    obtenerCarteles(){
        return new Promise(resolve => {
            AnuncioService.carteles(this.id)
            .then(response => this.carteles = response)
            .then(response => resolve(response))
        })
    }
    //- Finalizo
}