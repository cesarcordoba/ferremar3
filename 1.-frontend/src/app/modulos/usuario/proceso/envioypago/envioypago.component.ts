
import { Component, OnInit } from '@angular/core';

import { Input } from '@angular/core';
import { DireccionService, TarjetaService, AuthService, UsuarioService, OrdenService } from '../../../../servicios';

import { BolsaBridge } from '../../../main/compartidos/bolsa.bridge';
import * as _ from 'lodash'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'envioypago',
  templateUrl: './envioypago.component.pug',
  styleUrls: ['./envioypago.component.styl']
})
export class EnvioypagoComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}



    direccion: any
    tarjeta : any
    usuario : any
    favoritos : any = []
    sucursal : any
    total : number = 0

    constructor(
        private us: AuthService,
        private bolsabridge: BolsaBridge,
        private router: Router
    ) {

        this.us.obtenerUsuario()
        .subscribe(user => {
            if(_.isObject(user)){

                this.usuario = user

                UsuarioService.sucursal(user.id)
                .then(response => this.sucursal = response)
                .then(response => console.log(response))


                DireccionService.xUsuario(user.id)
                .then(response => this.direccion = response.filter(n => n.principal === 1)[0])
                .then(response => console.log(response))

                TarjetaService.xUsuario(user.id)
                .then(response => this.tarjeta = response.filter(n => n.principal === 1)[0])
                .then(response => console.log(response))

            }
        })

        this.bolsabridge.bridge.subscribe(items => {
            if(_.isObject(items)){
                this.favoritos = items.items
                this.calcularTotal()
                console.log(this.total)
            }
        })

    }

    ngOnInit() {}

    calcularTotal(){

        console.log('siiiii')

        this.total =  this.favoritos.reduce((ac , v ) => {

            return ac + v.precio
        }, 0)
    }

    finalizar(){
        OrdenService.crearOrden({
            usuario : this.usuario.id,
            tipo : 1
        })
        .then(response => this.bolsabridge.vaciar())
        .then(() => this.router.navigate([ 'usuario/pedidos' ]))
    }
}
