


import { CategoriaService } from '../servicios/Categoria.service'
import * as _ from 'lodash'

export class Categoria {
    id: number;


    productos : any;//6
    atributos : any;
    nombre : string;
    nivel : number;
    status : number;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
    // producto
    obtenerProductos(){
        return new Promise(resolve => {
            CategoriaService.productos(this.id)
            .then(response => this.productos = response)
            .then(response => resolve(response))
        })
    }//6
    // atributo
    obtenerAtributos(){
        return new Promise(resolve => {
            CategoriaService.atributos(this.id)
            .then(response => this.atributos = response)
            .then(response => resolve(response))
        })
    }
    //- Finalizo
}