
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  BehaviorSubject, Observable  } from 'rxjs'
import * as _ from 'lodash'

import { ProductoService } from '../../../../servicios';

@Component({
  selector: 'producto',
  templateUrl: './producto.component.pug',
  styleUrls: ['./producto.component.styl']
})
export class ProductoComponent implements OnInit, AfterViewInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() producto
    @Input() nuevoProducto
    formulario: FormGroup;

    pasarProducto : BehaviorSubject<any>

    productos: any

    constructor(private fb: FormBuilder) {

        this.pasarProducto = new BehaviorSubject({});

        this.formulario = this.fb.group({
            nombre : null,
            status : null,
        })
    // ProductoService.one()
    // .then(response => this.productos = response)
    // .then(response => console.log(response))

  }

    ngOnInit() {
        console.log(this.producto)

        this.formulario = this.fb.group({
            nombre: [ this.producto.nombre ],
            status: [ this.producto.status ]
        })
    }


    aceptar(){

        console.log(this.producto)

        ProductoService.editar(this.producto)

    }

    ngAfterViewInit(){
        this.nuevoProducto.subscribe((value) => {

                this.pasarProducto.next(value)



            // this.peticion = value
            // this.obtener()

        })
    }


}
