
import { Component, OnInit } from '@angular/core';
import {  AuthService, UsuarioService } from '../../../servicios';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BolsaBridge } from '../../main/compartidos/bolsa.bridge';

@Component({
    selector: 'proceso',
    templateUrl: './proceso.component.pug',
    styleUrls: [
        './proceso.component.styl'
    ]
})
export class ProcesoComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    primeroFormGroup : FormGroup

    constructor(private us: AuthService, private bolsabridge: BolsaBridge,) {
        this.us.obtenerUsuario()
        .subscribe(user => {

        })
    }

    ngOnInit() {

        // this.bolsabridge.sincronizar()

        // console.log( JSON.parse(localStorage.getItem("bolsa")) )
        //
        // console.log( this.borde )

    }

}
