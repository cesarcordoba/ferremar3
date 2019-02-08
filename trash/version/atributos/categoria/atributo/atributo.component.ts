
import { Component, Input, OnInit } from '@angular/core';
import { AtributoService, OpcionService } from '../../../../../../../../servicios';

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

    constructor() {

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

        console.log(this.version)
        console.log(this.opcion)

        OpcionService.ligarversion(  this.opcion.id, this.version.id )
        .then(response => console.log(response))

    }

    eliminar(){
        OpcionService.desligarversion( this.opcion.id, this.version.id )
        .then(response => delete this.opcion)
    }
}
