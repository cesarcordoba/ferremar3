import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../servicios/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SucursalService, CategoriaService, DireccionService, UsuarioService } from '../../../servicios';
// import { GoogleMaps, Marker } from '../../../modelos/google-maps.model';
import { Router } from '@angular/router';

// import { google } from "google-maps";

import * as _ from 'lodash'


@Component({
    selector: 'registro',
    templateUrl: 'registro.component.pug',
    styleUrls: ['registro.component.styl'],
    encapsulation: ViewEncapsulation.None
})
export class RegistroComponent implements OnInit, AfterViewInit {

    usuario : any
    formulario : FormGroup;

    primeroFormGroup : FormGroup
    segundoFormGroup : FormGroup
    terceroFormGroup : FormGroup

    constructor(
        private auth : AuthService,
        private fb: FormBuilder,
    	private router: Router
    ){

        this.auth.obtenerUsuario()
        .subscribe(response => this.usuario = response)

    }


    ngOnInit(){



    }

    ngAfterViewInit(): void {

    }

    acepto(){
        UsuarioService.editar(Object.assign(this.usuario, {status : 1}))
        .then(response => this.router.navigate([ '/usuario' ]))

    }


}
