import { Component, Input, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  BehaviorSubject, Observable  } from 'rxjs'
import * as _ from 'lodash'

import { ProductoService, AccionService, AuthService } from '../../../../../servicios';


@Component({
  selector: 'producto',
  templateUrl: './producto.component.pug',
  styleUrls: ['./producto.component.styl'],
  encapsulation: ViewEncapsulation.None
})
export class ProductoComponent implements OnInit, AfterViewInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() producto
    @Input() nuevoProducto
    formulario: FormGroup;

    pasarProducto : BehaviorSubject<any>

    productos: any
    margenes : any
    colores : any

    constructor(private fb: FormBuilder, private auth : AuthService) {

        this.pasarProducto = new BehaviorSubject({});

        this.formulario = this.fb.group({
            nombre : null,
            status : null,
        })

    }

    ngOnInit() {
        this.formulario = this.fb.group({
            nombre: [ this.producto.nombre ],
            status: [ this.producto.status ]
        })
    }


    aceptar(){
        ProductoService.editar(this.producto)
        this.auth.obtenerUsuario()
        .subscribe(usuario => {
            AccionService.crear({
                seccion : 'producto', contenido : 'se edito el producto', objeto : this.producto.id, IdUsuario : usuario.id
            })
        })
    }

    ngAfterViewInit(){
        this.nuevoProducto.subscribe((value) => {

                ProductoService.colores(value.id)
                .then(response => this.colores = response)

                ProductoService.margenes(value.id)
                .then(response => this.margenes = response)

                this.pasarProducto.next(value)



            // this.peticion = value
            // this.obtener()

        })
    }


}
