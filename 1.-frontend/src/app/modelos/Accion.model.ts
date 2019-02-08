


import { AccionService } from '../servicios/Accion.service'
import * as _ from 'lodash'

export class Accion {
    id: number;


    usuario : any;
    seccion : string;
    contenido : string;
    objeto : string;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
    // usuario
    obtenerUsuario(){
        return new Promise(resolve => {
            AccionService.usuario(this.id)
            .then(response => this.usuario = response)
            .then(response => resolve(response))
        })
    }
    //- Finalizo
}