import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService, AuthService } from '../../../../servicios';
import {  BehaviorSubject, Observable  } from 'rxjs'
import * as _ from 'lodash'


@Component({
  selector: 'fichausuario',
  templateUrl: './fichausuario.component.pug',
  styleUrls: ['./fichausuario.component.styl']
})
export class FichausuarioComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() usuario


    pasar : BehaviorSubject<any>


    constructor( private us: AuthService) {

        this.pasar = new BehaviorSubject({});

    // UsuarioService.one()
    // .then(response => this.usuarios = response)
    // .then(response => console.log(response))

  }

    ngOnInit() {

        this.us.obtenerUsuario().subscribe(user => {
            this.usuario = user

            console.log(user)

            this.pasar.next(user)


        })

    }
}
