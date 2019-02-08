
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


import { AnuncioService } from '../../../../servicios';
@Component({
  selector: 'formularioanuncio',
  templateUrl: './formularioanuncio.component.pug',
  styleUrls: ['./formularioanuncio.component.styl']
})
export class FormularioanuncioComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() anuncio
    formulario: FormGroup;



    anuncios: any

    constructor(private fb: FormBuilder) {

        
        
  }

    ngOnInit() {

    }


    aceptar(){

        console.log(this.anuncio)

        AnuncioService.editar(this.anuncio)

    }


}