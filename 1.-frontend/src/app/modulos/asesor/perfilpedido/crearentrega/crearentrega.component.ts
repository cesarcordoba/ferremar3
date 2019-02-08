
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EntregaService } from '../../../../servicios';
@Component({
  selector: 'crearentrega',
  templateUrl: './crearentrega.component.pug',
  styleUrls: ['./crearentrega.component.styl']
})
export class CrearentregaComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    formulario : FormGroup

    entregas: any

    constructor(public dialogRef: MatDialogRef<CrearentregaComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb : FormBuilder
    ) {

        this.data = data

        this.formulario = this.fb.group({
            fecha: [ '', Validators.required ],
        })
    }

    ngOnInit() {}

    cerrar(){
        this.dialogRef.close()
    }

    aceptar(){

        console.log(  this.data.orden )

        EntregaService.crear(Object.keys(this.formulario.controls)
        .map(n => new Object({ [ n ] :  this.formulario.controls[n].value  }))
        .reduce((ac, v) => Object.assign(ac, v), {
            IdOrden : this.data.orden,
            status : 0
        }))
        .then(response => this.dialogRef.close(response))
    }

}
