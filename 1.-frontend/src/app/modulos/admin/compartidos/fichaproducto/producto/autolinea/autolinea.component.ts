
import { LineaService } from '../../../../../../servicios';

import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Input, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs'
import { FormBuilder, FormGroup } from '@angular/forms';
import {switchMap, debounceTime, tap, finalize} from 'rxjs/operators';
import * as _ from 'lodash'


@Component({
  selector: 'autolinea',
  templateUrl: './autolinea.component.pug',
  styleUrls: ['./autolinea.component.styl'],
    encapsulation: ViewEncapsulation.None
})
export class AutolineaComponent implements OnInit, AfterViewInit  {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    items : Observable<any>;

    itemsfiltrados : any[] = [];
    formulario: FormGroup;
    isLoading = false;

    @Input() id
    @Input() nuevoProducto

    linea : any
    status : boolean = false
    producto : any = {}
    productos : any = []


    constructor(private fb: FormBuilder) {

        this.formulario = this.fb.group({
            input: null
        })

        let observador = (value) =>
            Observable.create( (observer: any) => {
                LineaService.xMarca(this.producto.IdMarca)
                .then((data)=>{
                    observer.next(data);
                 },(reason)=>{
                    observer.error(reason);
                 })
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

            this.itemsfiltrados = items
        });

  }

    displayFn(user) {
        if (user) { return user.nombre; }
    }

    cambio(){}

    ngOnInit() { }

    ngAfterViewInit(){

        this.nuevoProducto.subscribe((value) => {
            if(!_.isUndefined(value) && value.IdLinea){
                  this.producto = value
                  LineaService.one(value.IdLinea)
                  .then(response => {
                      this.linea = response
                      this.obtenerProductos()
                      return response
                  })
                  .then(response => this.formulario.controls['input'].setValue(response.nombre))
            }
        })
    }

      obtenerProductos(){

          LineaService.productos(this.linea.id)
          .then(productos => this.productos = productos)
          .then(productos => productos.forEach(producto => producto.obtenerPortadas()))


      }

      obtenerImagen(imagenes){
  		if(_.isArray(imagenes))
  			return imagenes.find(n => n.dimension === '50x50').link
  	    }

}
