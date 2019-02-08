
import { Component, Input, OnInit } from '@angular/core';


import { AtributoService, OpcionService, AuthService, AccionService } from '../../../../../../../../servicios';
@Component({
  selector: 'atributo',
  templateUrl: './atributo.component.pug',
  styleUrls: ['./atributo.component.styl']
})
export class AtributoComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() atributo
    @Input() opcionesversion
    @Input() version

    opciones : any
    opcion : any

    constructor(private auth : AuthService) {

    // AtributoService.one()
    // .then(response => this.atributos = response)
    // .then(response => console.log(response))

    }

    ngOnInit() {



        AtributoService.opciones(this.atributo.id)
        .then(response => this.opciones = response )
        .then(response => {
            this.opcionesversion.forEach(n => {
                response.forEach(o => {
                    if(o.id === n.id)
                        this.opcion = o
                })

            })


        })

    }

    cambio(){


    }

    aceptar(){
        OpcionService.ligarversion(  this.opcion.id, this.version.id )

        this.auth.obtenerUsuario()
        .subscribe(usuario => {
            AccionService.crear({
                seccion : 'version', contenido : 'se ligo la opcion ' + this.opcion.nombre, objeto : this.version.id, IdUsuario : usuario.id
            })
        })

    }

    eliminar(){
        OpcionService.desligarversion( this.opcion.id, this.version.id )
        .then(response => delete this.opcion)
    }
}
