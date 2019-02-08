
import { Component, OnInit } from '@angular/core';

import { Input } from '@angular/core';
import { FavoritoService } from '../../../../servicios';

import { BolsaBridge } from '../../../main/compartidos/bolsa.bridge';
import * as _ from 'lodash'
@Component({
  selector: 'confirmacion',
  templateUrl: './confirmacion.component.pug',
  styleUrls: ['./confirmacion.component.styl']
})
export class ConfirmacionComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}
    favoritos: any

    total : any

    constructor(private bolsabridge: BolsaBridge) {


        this.bolsabridge.bridge.subscribe(items => {
            if(_.isObject(items)){
                this.favoritos = items.items
                this.calcularTotal()
            }
        })

    }

    calcularTotal(){
        this.total =  this.favoritos.reduce((ac , v ) => {

            return ac + v.precio
        }, 0)
    }

    ngOnInit() {}

}
