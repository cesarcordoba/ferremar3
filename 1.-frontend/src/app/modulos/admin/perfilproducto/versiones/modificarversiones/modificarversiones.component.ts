
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VersionService, CategoriaService } from '../../../../../servicios';

import { Producto, Categoria } from '../../../../../modelos';
import * as _ from 'lodash'

@Component({
  selector: 'modificarversiones',
  templateUrl: './modificarversiones.component.pug',
  styleUrls: ['./modificarversiones.component.styl']
})
export class ModificarversionesComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    versiones: any

    foods : any
    producto : Producto
    atributos : any[]
    acciones : any[] = []

    formulario: FormGroup;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<ModificarversionesComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

        this.versiones = this.data.versiones.map(n =>
            Object.assign(n , {
                palabras : n.nombre.split(' '),
                check : false
            }))

        this.producto = this.data.producto.obtenerCategoria()
        .then((categoria : Categoria) => CategoriaService.padres(categoria.id))
        .then(categorias => Promise.all(categorias.map(async (categoria ) => await CategoriaService.atributos(categoria.id))))
        .then(atributos => this.atributos = _.flatten(atributos))
        .then(response => console.log(response))

        this.foods = [
            { value: 'steak-0', viewValue: 'Steak'},
            { value: 'pizza-1', viewValue: 'Pizza'},
            { value: 'tacos-2', viewValue: 'Tacos'}
        ];

        this.formulario = this.fb.group({
            atributo : null
        })

    }

    ngOnInit() {}

    aceptar(){
        this.acciones.push(this.formulario.controls.atributo.value)
        console.log(this.acciones)
        this.formulario.controls.atributo.setValue(null)
    }

    nada(){
        this.acciones.push({
            nombre : 'nada'
        })
    }

    cerrar(){
        this.dialogRef.close()
    }

}
