


import { InventarioService } from '../servicios/Inventario.service'
import * as _ from 'lodash'

export class Inventario {
    id: number;

//5//5
    existencias : any;
    margenes : any;
    precios : any;
    clave : string;
    status : number;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         //5//5
    // existencia
    obtenerExistencias(){
        return new Promise(resolve => {
            InventarioService.existencias(this.id)
            .then(response => this.existencias = response)
            .then(response => resolve(response))
        })
    }
        
        
        // variacionmargen
        obtenerMargenes(){
            return new Promise(resolve => {
                InventarioService.margenes(this.id)
                .then(response => this.margenes = response)
                .then(response => resolve(response))
            })
        }
        // variacionprecio
        obtenerPrecios(){
            return new Promise(resolve => {
                InventarioService.precios(this.id)
                .then(response => this.precios = response)
                .then(response => resolve(response))
            })
        }
    //- Finalizo
}