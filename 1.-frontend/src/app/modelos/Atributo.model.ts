


import { AtributoService } from '../servicios/Atributo.service'
import * as _ from 'lodash'

export class Atributo {
    id: number;


    categorias : any;
    opciones : any;
    nombre : string;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
    // categoria
    obtenerCategorias(){
        return new Promise(resolve => {
            AtributoService.categorias(this.id)
            .then(response => this.categorias = response)
            .then(response => resolve(response))
        })
    }
    // opcion
    obtenerOpciones(){
        return new Promise(resolve => {
            AtributoService.opciones(this.id)
            .then(response => this.opciones = response)
            .then(response => resolve(response))
        })
    }
    //- Finalizo
}