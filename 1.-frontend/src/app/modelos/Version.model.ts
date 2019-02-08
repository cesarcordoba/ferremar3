


import { VersionService } from '../servicios/Version.service'
import * as _ from 'lodash'

export class Version {
    id: number;


    producto : any;
    opciones : any;
    descuentos : any;
    transacciones : any;
    salientes : any;
    entrantes : any;
    sucursales : any;
    usuarios : any;
    nombre : string;
    linea : string;
    status : number;
    precio : number;
    existencia : number;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
    // producto
    obtenerProducto(){
        return new Promise(resolve => {
            VersionService.producto(this.id)
            .then(response => this.producto = response)
            .then(response => resolve(response))
        })
    }
    // opcion
    obtenerOpciones(){
        return new Promise(resolve => {
            VersionService.opciones(this.id)
            .then(response => this.opciones = response)
            .then(response => resolve(response))
        })
    }
    // descuento
    obtenerDescuentos(){
        return new Promise(resolve => {
            VersionService.descuentos(this.id)
            .then(response => this.descuentos = response)
            .then(response => resolve(response))
        })
    }
        
        
        
    // transaccion
    obtenerTransacciones(){
        return new Promise(resolve => {
            VersionService.transacciones(this.id)
            .then(response => this.transacciones = response)
            .then(response => resolve(response))
        })
    }
        
        // saliente
        obtenerSalientes(){
            return new Promise(resolve => {
                VersionService.salientes(this.id)
                .then(response => this.salientes = response)
                .then(response => resolve(response))
            })
        }
        // entrante
        obtenerEntrantes(){
            return new Promise(resolve => {
                VersionService.entrantes(this.id)
                .then(response => this.entrantes = response)
                .then(response => resolve(response))
            })
        }
        // inventario
        obtenerSucursales(){
            return new Promise(resolve => {
                VersionService.sucursales(this.id)
                .then(response => this.sucursales = response)
                .then(response => resolve(response))
            })
        }
        // favorito
        obtenerUsuarios(){
            return new Promise(resolve => {
                VersionService.usuarios(this.id)
                .then(response => this.usuarios = response)
                .then(response => resolve(response))
            })
        }
    //- Finalizo
}