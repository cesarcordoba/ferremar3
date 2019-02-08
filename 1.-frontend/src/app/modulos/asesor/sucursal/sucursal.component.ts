
import { Component, OnInit } from '@angular/core';

import { SucursalService, AuthService } from '../../../servicios';

import { Usuario  } from '../../../modelos';

@Component({
  selector: 'sucursal',
  templateUrl: './sucursal.component.pug',
  styleUrls: [
      './sucursal.component.styl'
  ]
})
export class SucursalComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}


    usuario : any = {
        IdUsuario : null
    }

    sucursal : any

    constructor( private us: AuthService) {

        this.us.obtenerUsuario().subscribe((user : Usuario) => {

            if(typeof Usuario){
                this.usuario = user
                console.log(user)
                this.usuario.obtenerSucursal()
                .then(sucursal => this.sucursal = sucursal)
            }
			// user && user.getTipo() == 'admin'? this.navLinks.push({ path: '/admin/usuarios', label: 'Usuarios', icon: 'supervised_user_circle' }) : null;
		})

        // SucursalService.obtener()
        // .then(response => this.sucursales = response)
        // .then(response => console.log(response))

    }

  ngOnInit() {

    console.log( this.borde )

  }
}
