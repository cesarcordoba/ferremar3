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
        .subscribe(response => this.usuario = response)

        this.registroForm = this.formBuilder.group({
            nombre: ['', Validators.required],
            apellido: ['', Validators.required],
            correo: ['', Validators.required],
            password: ['', Validators.required],
            repeatpassword: ['', Validators.required]
        });


    }

    registrar(form: FormGroup){

        if (form.controls.correo.valid &&
            form.controls.nombre.valid &&
            form.controls.apellido.valid &&
            form.controls.password.valid &&
            form.controls.repeatpassword.valid &&
            (form.controls.password.value == form.controls.repeatpassword.value)) {

            let usuario = {
                nombre: form.controls.nombre.value,
                apellido: form.controls.apellido.value,
                correo: form.controls.correo.value,
                Llave : {
                        'password' : form.controls.password.value
                    }
                }

            this.auth.registrar(usuario)
                // .then(response => response ? this.registroIncorecto = false : this.registroIncorecto = true)
                .then(response => {

                    // console.log(response)

                    // response ? null : this.auth.obtenerRedirect().subscribe(path => this.router.navigate([path]))


                })
        }

    }


}
