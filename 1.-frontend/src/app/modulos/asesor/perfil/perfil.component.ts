import { Component } from '@angular/core';
import { AuthService } from '../../../servicios/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'perfil',
    templateUrl: 'perfil.component.pug',
    styleUrls: ['perfil.component.styl']
})
export class PerfilComponent {

    usuario : any
    registroForm: FormGroup;

    constructor(private auth : AuthService, private formBuilder: FormBuilder){

        this.auth.obtenerUsuario()
        .subscribe(response => {
            
            this.usuario = response
            this.usuario.obtenerAcciones()
            this.usuario.obtenerLogs()

        })



    }



}
