


import { OpcionService } from '../servicios/Opcion.service'
import * as _ from 'lodash'

export class Opcion {
    id: number;


    versiones : any;
    atributo : any;
    nombre : string;
    status : number;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
    // version
    obtenerVersiones(){
        return new Promise(resolve => {
            OpcionService.versiones(this.id)
            .then(response => this.versiones = response)
            .then(response => resolve(response))
        })
    }
    // atributo
    obtenerAtributo(){
        return new Promise(resolve => {
            OpcionService.atributo(this.id)
            .then(response => this.atributo = response)
            .then(response => resolve(response))
        })
    }
    //- Finalizo
}