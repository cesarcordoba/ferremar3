
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ProductoService } from '../../../../servicios';

import * as _ from 'lodash'

@Component({
  selector: 'relacionados',
  templateUrl: './relacionados.component.pug',
  styleUrls: ['./relacionados.component.styl']
})
export class RelacionadosComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() pasarProducto


    productos: any
    peticion : any
    producto : any

    constructor() {



    }

    ngOnInit() {}

    ngAfterViewInit(){
        this.pasarProducto.subscribe((value) => {
            if(_.isObject(value)){
                this.producto = value
                this.obtener()
            }
        })
    }

    obtener(){
        ProductoService.filtro({
                pagina : 1,
                limite :  (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? 6 :  4,
                order : ['nombre'],
                Where : [
                    { status : 1 },
                    { IdCategoria : this.producto.IdCategoria }
                ],
                include : []
            })
        .then(response => {
          this.productos = response
        })
    }
}
