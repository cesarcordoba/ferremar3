
import { Component, OnInit, Input } from '@angular/core';

import {MatChipInputEvent} from '@angular/material';
//    4
import { PrecioService, InventarioService, VariacionprecioService, AccionService } from '../../../../../../servicios';
import { MatSnackBar } from '@angular/material';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CambiarstatusComponent } from './../cambiarstatus/cambiarstatus.component';
declare var $: any;


@Component({
  selector: 'precio',
  templateUrl: './precio.component.pug',
  styleUrls: ['./precio.component.styl']
})
export class PrecioComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}


    @Input() sucursal
    @Input() usuario? : any


    precios: any

    constructor(
        private dialog: MatDialog,
        public snackBar: MatSnackBar
    ) {


    //
    // PrecioService.obtener()
    // .then(response => this.precios = response)
    // .then(response => console.log(response))

  }

    ngOnInit() {

        this.sucursal.Inventario.obtenerPrecios()
        .then(response => this.precios = response)

    }

  add(event: MatChipInputEvent){

    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {

        PrecioService.crear({cantidad :  value.trim(), status : 0 })
        .then(precio => InventarioService.ligarprecios(this.sucursal.Inventario.id, precio.id, {status : 1})
        .then(response => Object.assign(precio, { Variacionprecio : response.data})))
        .then(precio => {

            AccionService.crear({
                seccion : 'precio',
                contenido : 'se creo',
                objeto : precio.id,
                IdUsuario : this.usuario.id
            })


            this.precios.push(precio)
        })

    }

    if (input) {
      input.value = '';
    }

  }

  abrir(item : any){
      this.dialog.open(CambiarstatusComponent, {
          data :  {}
      }).afterClosed().subscribe(respuesta => {

          VariacionprecioService.editar({id : item.Variacionprecio.id, status : respuesta === true ? 1 : 0})
          .then(response => {

              this.snackBar.open('Se edito el margen', 'Listo', {
                  duration: 5000,
                  verticalPosition: 'bottom',
                  horizontalPosition: 'center',
              });

              item.Variacionprecio.status = respuesta === true ? 1 : 0
          })


      });
  }
}
