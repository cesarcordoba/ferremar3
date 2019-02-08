
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../../../../servicios';


import * as _ from 'lodash'

@Component({
  selector: 'formulariousuario',
  templateUrl: './formulariousuario.component.pug',
  styleUrls: ['./formulariousuario.component.styl']
})
export class FormulariousuarioComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() usuario
    formulario: FormGroup;

    @Input() pasar

    usuarios: any



    constructor(private fb: FormBuilder) {

        this.formulario = this.fb.group({
            nombre : null,
            apellido : null,
            correo : null,
        })

    }

    ngOnInit() {
        this.pasar.subscribe((value) => {
            if(!_.isUndefined(value) && value.id){

                this.formulario = this.fb.group({
                    nombre : value.nombre,
                    apellido : value.apellido,
                    correo : value.correo,
                })

            }
        })
    }


    aceptar(){

        console.log(this.usuario)

        UsuarioService.editar(this.usuario)

    }


}
