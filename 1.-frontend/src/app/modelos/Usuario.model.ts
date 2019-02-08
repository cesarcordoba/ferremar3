


import { UsuarioService } from '../servicios/Usuario.service'
import * as _ from 'lodash'

export class Usuario {
    id: number;


    sucursal : any;
    ordenes : any;//3
    avatares : any;
    logs : any;
    acciones : any;
    direcciones : any;
    tarjetas : any;
    versiones : any;
    nombre : string;
    apellido : string;
    correo : string;
    status : number;
    tipo : string;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
    // sucursal
    obtenerSucursal(){
        return new Promise(resolve => {
            UsuarioService.sucursal(this.id)
            .then(response => this.sucursal = response)
            .then(response => resolve(response))
        })
    }
    // orden
    obtenerOrdenes(){
        return new Promise(resolve => {
            UsuarioService.ordenes(this.id)
            .then(response => this.ordenes = response)
            .then(response => resolve(response))
        })
    }//3
    // avatar
    obtenerAvatares(){
        return new Promise(resolve => {
            UsuarioService.avatares(this.id)
            .then(response => this.avatares = response)
            .then(response => resolve(response))
        })
    }
        
    // log
    obtenerLogs(){
        return new Promise(resolve => {
            UsuarioService.logs(this.id)
            .then(response => this.logs = response)
            .then(response => resolve(response))
        })
    }
    // accion
    obtenerAcciones(){
        return new Promise(resolve => {
            UsuarioService.acciones(this.id)
            .then(response => this.acciones = response)
            .then(response => resolve(response))
        })
    }
    // direccion
    obtenerDirecciones(){
        return new Promise(resolve => {
            UsuarioService.direcciones(this.id)
            .then(response => this.direcciones = response)
            .then(response => resolve(response))
        })
    }
    // tarjeta
    obtenerTarjetas(){
        return new Promise(resolve => {
            UsuarioService.tarjetas(this.id)
            .then(response => this.tarjetas = response)
            .then(response => resolve(response))
        })
    }
        // favorito
        obtenerVersiones(){
            return new Promise(resolve => {
                UsuarioService.versiones(this.id)
                .then(response => this.versiones = response)
                .then(response => resolve(response))
            })
        }
    //- Finalizo
}