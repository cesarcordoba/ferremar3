import { OPENPAYKEYS } from "../../../../environments/environment";
import { Component, OnInit } from '@angular/core';
import { Title , Meta }     from '@angular/platform-browser';
import { ActivatedRoute} from '@angular/router'
import {  BehaviorSubject, Observable  } from 'rxjs'

import { CrearentregaComponent } from './crearentrega/crearentrega.component';

import { CambiardireccionComponent } from './cambiardireccion/cambiardireccion.component';
import { CambiartarjetaComponent } from './cambiartarjeta/cambiartarjeta.component';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
declare var $: any;
import { OrdenService, TransaccionService, EntregaService } from '../../../servicios';
import * as _ from 'lodash'

@Component({
  selector: 'perfilpedido',
  templateUrl: './perfilpedido.component.pug',
  styleUrls: [
      './perfilpedido.component.styl'
  ]
})
export class PerfilpedidoComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}
    //
    // pasarOrden : BehaviorSubject<any>

    private MERCHANT_ID: string = OPENPAYKEYS.MERCHANT_ID;
    private PUBLIC_API_KEY: string = OPENPAYKEYS.PUBLIC_API_KEY;
    private produccion: boolean;

    orden: any = {}
    procesando : boolean = false

    constructor(private dialog: MatDialog, public route : ActivatedRoute, private titleService: Title, private meta : Meta, public snackBar: MatSnackBar ) {

        OpenPay.setId('mzbzo4aoqvcld7vl9f9s');
        ​OpenPay.setApiKey(this.PUBLIC_API_KEY);
        OpenPay.setSandboxMode(false);

    route.params.subscribe(async (res) =>
        OrdenService.one(Number(res.id))
        .then(response => this.orden = response)
        .then(response => {
            this.orden.obtenerEntregas()
                .then(entregas => {
                    entregas.forEach(entrega => {
                        entrega.obtenerTransacciones()
                            .then(transacciones => Promise.all(
                                transacciones.map(
                                    async (transaccion) => transaccion.obtenerVersion()
                                    .then( version => version.obtenerProducto())
                                    .then(producto => producto.obtenerPortadas())
                            )))
                    })
                })
            this.orden.obtenerDireccion()
            this.orden.obtenerTarjeta()
            this.orden.obtenerUsuario()
            this.orden.obtenerCargos()
            this.orden.obtenerTransacciones()
            .then(transacciones => {
                transacciones.forEach(transaccion => {
                    transaccion.obtenerPrecio()
                    transaccion.obtenerMargenes()
                    transaccion.obtenerDescuentos()
                    transaccion.obtenerVersion()
                    transaccion.obtenerPromo()
                    transaccion.obtenerVersion()
                    .then(version => version.obtenerProducto())
                    .then(producto => producto.obtenerPortadas())
                })
            })

            console.log(this.orden)

            // this.pasarOrden.next(response);

            this.titleService.setTitle( this.orden.nombre );
        // this.meta.updateTag({ name: 'description', content: _.replace( this.proyecto.resumen, '<p>', '')  })
        // this.meta.updateTag({ name: 'keywords', content: 'pagina web, presupuesto web, cotizador online, cotizador paginas web, presupuesto tienda online,' + this.proyecto.nombre })

        })

    )


    }

    ngOnInit() {



    }

    cambiarTarjeta(){
        this.dialog.open(CambiartarjetaComponent, {
            width :  '600px',
            height :  '600px',
            data :  {
                orden : this.orden
            }
        }).afterClosed().subscribe(tarjeta => {
            if(_.isObject(tarjeta)) OrdenService.ligartarjeta(this.orden.id, tarjeta.id)
                .then(response => this.orden.tarjeta = tarjeta)
        });
    }

    cambiarDireccion(){
        this.dialog.open(CambiardireccionComponent, {
            width :  '600px',
            height :  '600px',
            data :  {
                orden : this.orden
            }
        }).afterClosed().subscribe(response => {

        });
    }


  imprimir(){
      console.log(this)
  }

  guardarTransaccion(transaccion){
      TransaccionService.editar(Object.assign(transaccion, { status : 1}))
      .then(response => this.notificacion('se asigno una entrega'))

  }

  agregar(){
      this.dialog.open(CrearentregaComponent, {
          // position : {
          //     top : '25px'
          // },
          width :  '600px',
          height :  '600px',
          data :  {
              orden : this.orden.id
          }
      }).afterClosed().subscribe(response => {
            this.orden.obtenerEntregas()
      });
  }

    primero(){

        this.procesando = true
        if(

            // si en algun momento tira falso, ya valio verga
            this.orden.transacciones.reduce((ac, v) =>
                ac === false ?  false : ((v.status === 0 || v.status === null ) ? false : true)
            , true)

        ){

            OrdenService.editar(Object.assign(this.orden, { status : 1 }))
            .then(() => {
                this.notificacion('Es hora de confirmar el pago')
                this.procesando = false
            })
        }else{
            this.notificacion('Todas las transacciones deben de tener fecha')
        }
    }
  segundo(){
      this.procesando = true
       this.notificacion('Se esta generando el pago')
      OrdenService.crearCargo({
            id : this.orden.id,
            device : OpenPay.deviceData.setup("payment-form", "divice_id_token")
        })
      .then(response => {
          console.log(response)
          if(response.status === 'completed'){

              OrdenService.editar(Object.assign(this.orden, { status : 2 }))
              .then(() => {
                  this.notificacion('Se ha confirmado el pago y ahora tienen que llegar los productos')
                  this.procesando = false
              })
          }else{
               this.notificacion('Hubo un error con el pago, es necesario cambiar de tarjeta')
                this.procesando = false
          }
      })
  }

  tercero(){

       this.procesando = true

      if(

        this.orden.entregas.reduce((ac, v) =>
            ac === false ? false : (v.status < 1 ? false : true)
        , true)

      ){
          OrdenService.editar(Object.assign(this.orden, { status : 3 }))
          .then(() => {
              this.notificacion('Todos los productos han llegado y ahora hay que entregarlos')
              this.procesando = false
          })
      }else{
           this.notificacion('Faltan productos por llegar')
           this.procesando = false
      }

  }

  cuarto(){
      if(

        this.orden.entregas.reduce((ac, v) =>
            ac === false ? false : (v.status < 2 ? false : true)
        , true)

      ){
          OrdenService.editar(Object.assign(this.orden, { status : 4 }))
          .then(() => {
              this.notificacion('Orden completa')
              this.procesando = false
          })
      }else{
           this.notificacion('Faltan por entregar')
           this.procesando = false
      }
  }

  obtenerColor(status){
      switch (status) {
          case 0:
              return 'rgb(244, 67, 54)'
              break;
          case 1:
              return 'rgb(255, 193, 7)'
              break;
          case 2:
              return 'rgb(76, 175, 80)'
              break;
      }
  }

  notificacion(x){
      this.snackBar.open(x, 'Listo', {
          duration: 5000,
          verticalPosition: 'top', horizontalPosition: 'center'
      });
  }

    recibido( entrega ){

        EntregaService.editar(Object.assign(entrega, {status : 1}))

    }

    entregado( entrega ){

        EntregaService.editar(Object.assign(entrega, {status : 2}))

    }
}
