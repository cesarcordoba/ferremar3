
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

import { VersionService, ProductoService } from '../../../../../../servicios';

import { Version } from '../../../../../../modelos';
@Component({
  selector: 'crearversion',
  templateUrl: './crearversion.component.pug',
  styleUrls: ['./crearversion.component.styl']
})
export class CrearversionComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    formulario: FormGroup;

    version: any

    constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<CrearversionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

        this.version = data.version

        this.formulario = this.fb.group({
            nombre : data.version.nombre,
            status : 0,
            IdGama : data.producto.IdGama,
            IdMarca : data.producto.IdMarca,
            IdCategoria : data.producto.IdCategoria,
            IdLinea : data.producto.IdLinea,
        })

    }

    ngOnInit() {}

    cerrar(){
        this.dialogRef.close()
    }

    aceptar(){

        ProductoService.crear(Object.keys(this.formulario.controls)
        .map(n => new Object({ [ n ] :  this.formulario.controls[n].value  }))
        .reduce((ac, v) => Object.assign(ac, v), {}))
        .then(producto => ProductoService.ligarversion(producto.id, this.version.id))
        .then(response => this.dialogRef.close())

    }

}
