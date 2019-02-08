


import { LogService } from '../servicios/Log.service'
import * as _ from 'lodash'

export class Log {
    id: number;


    usuario : any;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
    // usuario
    obtenerUsuario(){
        return new Promise(resolve => {
            LogService.usuario(this.id)
            .then(response => this.usuario = response)
            .then(response => resolve(response))
        })
    }
    //- Finalizo
}