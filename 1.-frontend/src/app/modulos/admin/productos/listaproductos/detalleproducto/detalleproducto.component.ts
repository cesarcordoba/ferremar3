
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {  BehaviorSubject, Observable  } from 'rxjs'

import { Input } from '@angular/core';
import { ProductoService } from '../../../../../servicios';
@Component({
  selector: 'detalleproducto',
  templateUrl: './detalleproducto.component.pug',
  styleUrls: ['./detalleproducto.component.styl']
})
export class DetalleproductoComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    productos: any
    pasarProducto : BehaviorSubject<any>

    constructor(
        public dialogRef: MatDialogRef<DetalleproductoComponent>,
        @Inject(MAT_DIALOG_DATA) public producto: any
    ){

        this.pasarProducto = new BehaviorSubject(producto);
        // ProductoService.obtener()
        // .then(response => this.productos = response)
        // .then(response => console.log(response))

  }

    ngOnInit() {

    }

    cerrar(){
        this.dialogRef.close()
    }

}
