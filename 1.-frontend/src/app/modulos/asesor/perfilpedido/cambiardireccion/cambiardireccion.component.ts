
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


import { DireccionService } from '../../../../servicios';
@Component({
  selector: 'cambiardireccion',
  templateUrl: './cambiardireccion.component.pug',
  styleUrls: ['./cambiardireccion.component.styl']
})
export class CambiardireccionComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}



    direcciones: any

    constructor(public dialogRef: MatDialogRef<CambiardireccionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

        console.log(this.data)

        this.data.orden.usuario.obtenerDirecciones()
        .then(direcciones => this.direcciones = direcciones)
        .then(r => console.log(r))

    }

    ngOnInit() {}

    cerrar(){
        this.dialogRef.close()
    }

}
