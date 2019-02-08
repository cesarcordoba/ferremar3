


import { MarcaService } from '../servicios/Marca.service'
import * as _ from 'lodash'

export class Marca {
    id: number;


    productos : any;
    gamas : any;
    lineas : any;
    margenes : any;
    catalogos : any;
    nombre : string;
    clave : string;
    status : number;
    razon : string;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
    // producto
    obtenerProductos(){
        return new Promise(resolve => {
            MarcaService.productos(this.id)
            .then(response => this.productos = response)
            .then(response => resolve(response))
        })
    }
    // gama
    obtenerGamas(){
        return new Promise(resolve => {
            MarcaService.gamas(this.id)
            .then(response => this.gamas = response)
            .then(response => resolve(response))
        })
    }
    // linea
    obtenerLineas(){
        return new Promise(resolve => {
            MarcaService.lineas(this.id)
            .then(response => this.lineas = response)
            .then(response => resolve(response))
        })
    }
    // margen
    obtenerMargenes(){
        return new Promise(resolve => {
            MarcaService.margenes(this.id)
            .then(response => this.margenes = response)
            .then(response => resolve(response))
        })
    }
    // catalogo
    obtenerCatalogos(){
        return new Promise(resolve => {
            MarcaService.catalogos(this.id)
            .then(response => this.catalogos = response)
            .then(response => resolve(response))
        })
    }
    //- Finalizo
}