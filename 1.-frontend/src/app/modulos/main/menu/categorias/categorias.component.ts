
import { Component, OnInit ,  Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import * as _ from 'lodash'

@Component({
  selector: 'categorias',
  templateUrl: './categorias.component.pug',
  styleUrls: ['./categorias.component.styl']
})
export class CategoriasComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}
    categorias : any

    constructor(
        public dialogRef: MatDialogRef<CategoriasComponent>,
        @Inject(MAT_DIALOG_DATA) public mensaje: any
    ){

        this.categorias = mensaje.categorias

    }

    // cancelar = () => this.dialogRef.close()
    // aceptar = info => this.dialogRef.close(info)

    ngOnInit() {}

    cambioCategoria(ev){
        console.log(ev)
    }

    cerrar(){
        this.dialogRef.close()
    }
}
