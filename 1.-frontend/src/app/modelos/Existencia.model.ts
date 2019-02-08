


import { ExistenciaService } from '../servicios/Existencia.service'
import * as _ from 'lodash'

export class Existencia {
    id: number;


    inventarios : any;
    cantidad : number;
    status : number;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
    // inventario
    obtenerInventarios(){
        return new Promise(resolve => {
            ExistenciaService.inventarios(this.id)
            .then(response => this.inventarios = response)
            .then(response => resolve(response))
        })
    }
    //- Finalizo
}