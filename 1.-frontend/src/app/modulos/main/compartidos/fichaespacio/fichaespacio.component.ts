import { Component, Input, OnInit } from '@angular/core';


import { EspacioService, AmbienteService } from '../../../../servicios';
import * as _ from 'lodash'


@Component({
selector: 'fichaespacio',
templateUrl: './fichaespacio.component.pug',
styleUrls: ['./fichaespacio.component.styl']
})
export class FichaespacioComponent implements OnInit {

  borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}


  @Input() pasarAmbiente

  ambiente : any
  espacio : any

    constructor() {

        // EspacioService.one()
        // .then(response => this.espacios = response)
        // .then(response => console.log(response))

    }

    ngOnInit() {
    }

ngAfterViewInit(){
    this.pasarAmbiente.subscribe((value) => {
        if(_.isObject(value)){
              this.ambiente = value
              console.log(this.ambiente)
              this.ambiente.obtenerEspacios()
              AmbienteService.productos(this.ambiente.id)
              .then(response => this.ambiente.productos = response)
          }

        // if(!_.isUndefined(value) && value[0] && value[0].Disponible.descuento > 0)
        //     this.ObtenerDescuento()
    })
}
}
