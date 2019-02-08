


import { OrdenService } from '../servicios/Orden.service'
import * as _ from 'lodash'

export class Orden {
    id: number;


    sucursal : any;
    usuario : any;
    transacciones : any;
    direccion : any;
    tarjeta : any;
    entregas : any;
    cargos : any;
    status : number;
    IdOpenpay : string;
    total : number;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
    // sucursal
    obtenerSucursal(){
        return new Promise(resolve => {
            OrdenService.sucursal(this.id)
            .then(response => this.sucursal = response)
            .then(response => resolve(response))
        })
    }
    // usuario
    obtenerUsuario(){
        return new Promise(resolve => {
            OrdenService.usuario(this.id)
            .then(response => this.usuario = response)
            .then(response => resolve(response))
        })
    }
    // transaccion
    obtenerTransacciones(){
        return new Promise(resolve => {
            OrdenService.transacciones(this.id)
            .then(response => this.transacciones = response)
            .then(response => resolve(response))
        })
    }
    // direccion
    obtenerDireccion(){
        return new Promise(resolve => {
            OrdenService.direccion(this.id)
            .then(response => this.direccion = response)
            .then(response => resolve(response))
        })
    }
    // tarjeta
    obtenerTarjeta(){
        return new Promise(resolve => {
            OrdenService.tarjeta(this.id)
            .then(response => this.tarjeta = response)
            .then(response => resolve(response))
        })
    }
    // entrega
    obtenerEntregas(){
        return new Promise(resolve => {
            OrdenService.entregas(this.id)
            .then(response => this.entregas = response)
            .then(response => resolve(response))
        })
    }
    // cargo
    obtenerCargos(){
        return new Promise(resolve => {
            OrdenService.cargos(this.id)
            .then(response => this.cargos = response)
            .then(response => resolve(response))
        })
    }
    //- Finalizo
}