
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LlaveService, UsuarioService } from '../../../../../servicios';

import { Usuario } from '../../../../../modelos';


import * as _ from 'lodash'

@Component({
  selector: 'formulariollave',
  templateUrl: './formulariollave.component.pug',
  styleUrls: ['./formulariollave.component.styl']
})
export class FormulariollaveComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    // @Input() llave = {
    //     IdTwitter : null,
    //     IdFacebook : null,
    //     IdGoogle : null,
    //     IdInstagram : null,
    //     password : null
    // }

    formulario: FormGroup;
    llaves: any

    llave : any

    @Input() pasar

    constructor(private fb: FormBuilder) {



    }

    ngOnInit() {

        this.pasar.subscribe((value : Usuario) => {
            if(!_.isUndefined(value) && value.id){

                UsuarioService.llave(value.id)
                .then(response => this.llave = response)

            }
        })
    }


    aceptar(){

        console.log(this.llave)

        LlaveService.editar(this.llave)

    }


}
