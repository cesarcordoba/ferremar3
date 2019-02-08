
import { Component, OnInit } from '@angular/core';

import { Input, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs'
import { FormBuilder, FormGroup } from '@angular/forms';
import {switchMap, debounceTime, tap, finalize} from 'rxjs/operators';
import * as _ from 'lodash'

import { AtributosBridge } from '../../../atributos.bridge'


import { CategoriaService } from '../../../../../../servicios';
@Component({
  selector: 'autocategoria',
  templateUrl: './autocategoria.component.pug',
  styleUrls: ['./autocategoria.component.styl'],
    encapsulation: ViewEncapsulation.None
})
export class AutocategoriaComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    items : Observable<any>;

    itemsfiltrados : any[] = [];
    formulario: FormGroup;
    isLoading = false;

    @Input() id
    @Input() nuevoProducto

    categoria : any
    producto : any
    status : boolean = false
    atributos : any
    categorias : any = []

    constructor(private fb: FormBuilder,
        private atributosbridge: AtributosBridge
    ) {

        this.formulario = this.fb.group({
            input: null
        })

        CategoriaService.completo()
        .then(response => this.categorias = response)

        let observador = (value) =>
            Observable.create( (observer: any) => {
                observer.next(this.categorias)
            })

        this.formulario
        .get('input')
        .valueChanges
        .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
            switchMap(value =>
                observador(value)
                .pipe(finalize(() => this.isLoading = false))
        ))
        .subscribe((items : any[]) => {
            // console.log(items)
            this.itemsfiltrados = items
        });

  }

  displayFn(user) {
    if (user) { return user.nombre; }
  }

  ngOnInit() {}

  ngAfterViewInit(){
      this.nuevoProducto.subscribe((value) => {

        this.producto = value

        setTimeout(() => {
            if(!_.isUndefined(value) && value.IdCategoria){
                this.categoria =  this.categorias.find(n => n.id === value.IdCategoria)

                this.formulario.controls['input'].setValue( this.categoria )

                this.obtenerAtributos()
            }

        }, 1000)

      })
    }

    cambio(){

        if(_.isObject(this.formulario.value.input)){
            CategoriaService.ligarproducto(this.formulario.value.input.id, this.producto.id)
            .then(response => this.categoria = this.formulario.value.input)
            .then(() => this.obtenerAtributos())
        }
    }

    obtenerAtributos(){

        CategoriaService.padres(this.categoria.id)
        .then(response => Promise.all(response.map(async (c) => await CategoriaService.atributos(c.id)
            .then(response => new Object({categoria : c,  atributos : response }))
        )))
        .then(response => this.atributos = response)
        .then(response => this.atributosbridge.agregar(this.atributos))

    }

    imprimir(){
        // console.log('x')


    }

}
