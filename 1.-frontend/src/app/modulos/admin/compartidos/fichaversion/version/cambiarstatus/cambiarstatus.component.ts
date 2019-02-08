
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cambiarstatus',
  templateUrl: './cambiarstatus.component.pug',
  styleUrls: ['./cambiarstatus.component.styl']
})
export class CambiarstatusComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    formulario: FormGroup;

    constructor(public dialogRef: MatDialogRef<CambiarstatusComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
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

    activo(){
        this.dialogRef.close(true)
    }

    inactivo(){
        this.dialogRef.close(false)
    }

}
