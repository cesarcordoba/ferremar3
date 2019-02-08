


import { ProductoService } from '../servicios/Producto.service'
import * as _ from 'lodash'

export class Producto {
    id: number;


    categoria : any;
    colores : any;
    imagenes : any;
    portadas : any;
    versiones : any;
    marca : any;
    gama : any;
    linea : any;
    margenes : any;
    promos : any;
    ambientes : any;
    nombre : string;
    status : number;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
    // categoria
    obtenerCategoria(){
        return new Promise(resolve => {
            ProductoService.categoria(this.id)
            .then(response => this.categoria = response)
            .then(response => resolve(response))
        })
    }
    // color
    obtenerColores(){
        return new Promise(resolve => {
            ProductoService.colores(this.id)
            .then(response => this.colores = response)
            .then(response => resolve(response))
        })
    }
    // imagen
    obtenerImagenes(){
        return new Promise(resolve => {
            ProductoService.imagenes(this.id)
            .then(response => this.imagenes = response)
            .then(response => resolve(response))
        })
    }
    // portada
    obtenerPortadas(){
        return new Promise(resolve => {
            ProductoService.portadas(this.id)
            .then(response => this.portadas = response)
            .then(response => resolve(response))
        })
    }
    // version
    obtenerVersiones(){
        return new Promise(resolve => {
            ProductoService.versiones(this.id)
            .then(response => this.versiones = response)
            .then(response => resolve(response))
        })
    }
    // marca
    obtenerMarca(){
        return new Promise(resolve => {
            ProductoService.marca(this.id)
            .then(response => this.marca = response)
            .then(response => resolve(response))
        })
    }
    // gama
    obtenerGama(){
        return new Promise(resolve => {
            ProductoService.gama(this.id)
            .then(response => this.gama = response)
            .then(response => resolve(response))
        })
    }
    // linea
    obtenerLinea(){
        return new Promise(resolve => {
            ProductoService.linea(this.id)
            .then(response => this.linea = response)
            .then(response => resolve(response))
        })
    }
    // margen
    obtenerMargenes(){
        return new Promise(resolve => {
            ProductoService.margenes(this.id)
            .then(response => this.margenes = response)
            .then(response => resolve(response))
        })
    }
        
        
        // disponible
        obtenerPromos(){
            return new Promise(resolve => {
                ProductoService.promos(this.id)
                .then(response => this.promos = response)
                .then(response => resolve(response))
            })
        }
        // posicion
        obtenerAmbientes(){
            return new Promise(resolve => {
                ProductoService.ambientes(this.id)
                .then(response => this.ambientes = response)
                .then(response => resolve(response))
            })
        }
    //- Finalizo
}