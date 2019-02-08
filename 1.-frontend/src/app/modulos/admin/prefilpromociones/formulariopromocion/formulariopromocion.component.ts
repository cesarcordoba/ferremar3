
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


import { PromoService } from '../../../../servicios';
import * as _ from 'lodash'

@Component({
  selector: 'formulariopromocion',
  templateUrl: './formulariopromocion.component.pug',
  styleUrls: ['./formulariopromocion.component.styl']
})
export class FormulariopromocionComponent implements OnInit, AfterViewInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() promo = {
        nombre : '',
        status : 0,
        inicio : '',
        final : ''
    }

    formulario: FormGroup;

    @Input() pasarPromo

    promos: any

    constructor(private fb: FormBuilder) {



  }

    ngOnInit() {

    }


    aceptar(){

        console.log(this.promo)

        PromoService.editar(this.promo)
        .then(response => console.log(response))

    }

    ngAfterViewInit(){
      this.pasarPromo.subscribe((value) => {
          if(_.isObject(value)){
              this.promo = value
          }
      })
    }


}
