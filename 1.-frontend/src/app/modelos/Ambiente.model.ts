


import { AmbienteService } from '../servicios/Ambiente.service'
import * as _ from 'lodash'

export class Ambiente {
    id: number;


    cuarto : any;
    espacios : any;
    productos : any;
    nombre : string;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
        
    // cuarto
    obtenerCuarto(){
        return new Promise(resolve => {
            AmbienteService.cuarto(this.id)
            .then(response => this.cuarto = response)
            .then(response => resolve(response))
        })
    }
    // espacio
    obtenerEspacios(){
        return new Promise(resolve => {
            AmbienteService.espacios(this.id)
            .then(response => this.espacios = response)
            .then(response => resolve(response))
        })
    }
        // posicion
        obtenerProductos(){
            return new Promise(resolve => {
                AmbienteService.productos(this.id)
                .then(response => this.productos = response)
                .then(response => resolve(response))
            })
        }
    //- Finalizo
}