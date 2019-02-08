


import { AvatarService } from '../servicios/Avatar.service'
import * as _ from 'lodash'

export class Avatar {
    id: number;


    usuario : any;
    link : string;
    key : string;
    dimension : string;
    folio : string;
    height : number;
    width : number;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
    // usuario
    obtenerUsuario(){
        return new Promise(resolve => {
            AvatarService.usuario(this.id)
            .then(response => this.usuario = response)
            .then(response => resolve(response))
        })
    }
    //- Finalizo
}