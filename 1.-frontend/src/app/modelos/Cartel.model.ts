


import { CartelService } from '../servicios/Cartel.service'
import * as _ from 'lodash'

export class Cartel {
    id: number;


    anuncio : any;
    url : string;
    key : string;
    tamano : string;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
    // anuncio
    obtenerAnuncio(){
        return new Promise(resolve => {
            CartelService.anuncio(this.id)
            .then(response => this.anuncio = response)
            .then(response => resolve(response))
        })
    }
    //- Finalizo
}