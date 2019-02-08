
import { Component, OnInit, Input } from '@angular/core';

import { AtributosBridge } from '../../../atributos.bridge'
//    4
import { AtributoService, CategoriaService, ProductoService } from '../../../../../../servicios';
import * as _ from 'lodash'

@Component({
  selector: 'atributos',
  templateUrl: './atributos.component.pug',
  styleUrls: ['./atributos.component.styl']
})
export class AtributosComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() opciones
    @Input() version

    atributos: any

    constructor(
        private atributosbridge: AtributosBridge
    ) {

        // AtributoService.obtener()
        // .then(response => this.atributos = response)

  }

  ngOnInit() {

    this.atributosbridge.bridge.subscribe(atributos => {
        if(_.isArray(atributos)){
            this.atributos = atributos
        }
    })

    setTimeout(() => {
        if(_.isUndefined(this.atributos)) this.obtenerAtributos()
    }, 1000)


  }

  obtenerAtributos(){

      ProductoService.one(this.version.IdProducto)
      .then((producto : any) => CategoriaService.padres(producto.IdCategoria))
      .then(response => Promise.all(response.map(async (c) => await CategoriaService.atributos(c.id)
          .then(response => new Object({categoria : c,  atributos : response }))
        )))
        .then(response => this.atributos = response)

  }



}
