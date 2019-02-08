


import { OfertaService } from '../servicios/Oferta.service'
import * as _ from 'lodash'

export class Oferta {
    id: number;


    promo : any;
    salientes : any;
    entrantes : any;

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         
    // promo
    obtenerPromo(){
        return new Promise(resolve => {
            OfertaService.promo(this.id)
            .then(response => this.promo = response)
            .then(response => resolve(response))
        })
    }
        
        
        // saliente
        obtenerSalientes(){
            return new Promise(resolve => {
                OfertaService.salientes(this.id)
                .then(response => this.salientes = response)
                .then(response => resolve(response))
            })
        }
        // entrante
        obtenerEntrantes(){
            return new Promise(resolve => {
                OfertaService.entrantes(this.id)
                .then(response => this.entrantes = response)
                .then(response => resolve(response))
            })
        }
    //- Finalizo
}