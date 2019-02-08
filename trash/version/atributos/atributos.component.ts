
import { Component, OnInit, Input } from '@angular/core';
import { AtributosBridge } from '../../../atributos.bridge'

//    4
import { AtributoService } from '../../../../../../servicios';
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

    constructor(private atributosbridge: AtributosBridge) {

    // AtributoService.obtener()
    // .then(response => this.atributos = response)
    // .then(response => console.log(response))

  }

  ngOnInit() {

      this.atributosbridge.bridge.subscribe(atributos => {
          if(_.isArray(atributos)) this.atributos = atributos
      })


  }
}
