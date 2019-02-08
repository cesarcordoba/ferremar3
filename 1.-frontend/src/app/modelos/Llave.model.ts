


import { LlaveService } from '../servicios/Llave.service'
import * as _ from 'lodash'

export class Llave {
    id: number;


    usuario : any;
    IdTwitter : string;
    IdFacebook : string;
    IdGoogle : string;
    IdInstagram : string;
    password : string;
    IdOpenpay : string;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
    // usuario
    obtenerUsuario(){
        return new Promise(resolve => {
            LlaveService.usuario(this.id)
            .then(response => this.usuario = response)
            .then(response => resolve(response))
        })
    }
    //- Finalizo
}