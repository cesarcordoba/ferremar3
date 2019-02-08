


import { MargenService } from '../servicios/Margen.service'
import * as _ from 'lodash'

export class Margen {
    id: number;


    productos : any;
    marca : any;
    transacciones : any;
    inventarios : any;
    cantidad : number;
    nivel : number;
    status : number;
    nombre : string;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
    // producto
    obtenerProductos(){
        return new Promise(resolve => {
            MargenService.productos(this.id)
            .then(response => this.productos = response)
            .then(response => resolve(response))
        })
    }
    // marca
    obtenerMarca(){
        return new Promise(resolve => {
            MargenService.marca(this.id)
            .then(response => this.marca = response)
            .then(response => resolve(response))
        })
    }
    // transaccion
    obtenerTransacciones(){
        return new Promise(resolve => {
            MargenService.transacciones(this.id)
            .then(response => this.transacciones = response)
            .then(response => resolve(response))
        })
    }
        
        // variacionmargen
        obtenerInventarios(){
            return new Promise(resolve => {
                MargenService.inventarios(this.id)
                .then(response => this.inventarios = response)
                .then(response => resolve(response))
            })
        }
    //- Finalizo
}