
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { MargenService } from '../../../../../servicios';
@Component({
  selector: 'crearmargen',
  templateUrl: './crearmargen.component.pug',
  styleUrls: ['./crearmargen.component.styl']
})
export class CrearmargenComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    margenes: any

        formulario: FormGroup;

    constructor(public dialogRef: MatDialogRef<CrearmargenComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder
    ) {

        this.formulario = this.fb.group({

            nombre: [ this.data.value , Validators.required ],
            cantidad: [ '', Validators.required ]

        })
    }

    ngOnInit() {}

    cancelar(){
        this.dialogRef.close()
    }

    aceptar(){
        let reponse = Object.keys(this.formulario.controls)
        .map(n => new Object({ [ n ] :  this.formulario.controls[n].value  }))
        .reduce((ac, v) => Object.assign(ac, v), {})


        this.dialogRef.close(reponse)
    }


}
