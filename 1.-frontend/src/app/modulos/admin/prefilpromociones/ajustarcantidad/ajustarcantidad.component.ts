
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'ajustarcantidad',
  templateUrl: './ajustarcantidad.component.pug',
  styleUrls: ['./ajustarcantidad.component.styl']
})
export class AjustarcantidadComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    cantidad : number

    constructor(public dialogRef: MatDialogRef<AjustarcantidadComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

  }

    ngOnInit() {}

    aceptar(){
        this.dialogRef.close(this.cantidad)
    }

}
