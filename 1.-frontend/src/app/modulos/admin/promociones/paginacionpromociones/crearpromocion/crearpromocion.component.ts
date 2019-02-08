
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


import { PromoService } from '../../../../../servicios';
@Component({
  selector: 'crearpromocion',
  templateUrl: './crearpromocion.component.pug',
  styleUrls: ['./crearpromocion.component.styl']
})
export class CrearpromocionComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    promos: any

    nombre : any

    constructor(public dialogRef: MatDialogRef<CrearpromocionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

        PromoService.obtener()
        .then(response => this.promos = response)
        .then(response => console.log(response))

    }

    ngOnInit() {}

    crear(){
        this.dialogRef.close(this.nombre)
    }

}
