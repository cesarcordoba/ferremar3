


import { TarjetaService } from '../servicios/Tarjeta.service'
import * as _ from 'lodash'

export class Tarjeta {
    id: number;


    usuario : any;
    ordenes : any;
    cargos : any;
    marca : string;
    numero : string;
    mes : string;
    periodo : string;
    nombre : string;
    IdOpenpay : string;
    principal : number;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
    // usuario
    obtenerUsuario(){
        return new Promise(resolve => {
            TarjetaService.usuario(this.id)
            .then(response => this.usuario = response)
            .then(response => resolve(response))
        })
    }
    // orden
    obtenerOrdenes(){
        return new Promise(resolve => {
            TarjetaService.ordenes(this.id)
            .then(response => this.ordenes = response)
            .then(response => resolve(response))
        })
    }
    // cargo
    obtenerCargos(){
        return new Promise(resolve => {
            TarjetaService.cargos(this.id)
            .then(response => this.cargos = response)
            .then(response => resolve(response))
        })
    }
    //- Finalizo
}