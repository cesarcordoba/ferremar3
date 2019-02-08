


import { CatalogoService } from '../servicios/Catalogo.service'
import * as _ from 'lodash'

export class Catalogo {
    id: number;


    marca : any;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
    // marca
    obtenerMarca(){
        return new Promise(resolve => {
            CatalogoService.marca(this.id)
            .then(response => this.marca = response)
            .then(response => resolve(response))
        })
    }
    //- Finalizo
}