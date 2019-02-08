
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


import { VersionService, ProductoService } from '../../../../../../servicios';
@Component({
  selector: 'asignarversion',
  templateUrl: './asignarversion.component.pug',
  styleUrls: ['./asignarversion.component.styl']
})
export class AsignarversionComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    version : any
    versiones: any
    producto : any

    constructor(public dialogRef: MatDialogRef<AsignarversionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

        this.version = data

    }

    ngOnInit() {}

    cerrar(){
        this.dialogRef.close()
    }

    cambio(ev){
        this.producto = ev
    }

    aceptar(){
        ProductoService.ligarversion(this.producto.id, this.version.id)
        .then(response => this.dialogRef.close())
    }

    cancelar(){

    }

}
