import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Input, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs'
import { FormBuilder, FormGroup } from '@angular/forms';
import {switchMap, debounceTime, tap, finalize} from 'rxjs/operators';
import * as _ from 'lodash'


import { GamaService } from '../../../../../../servicios';
@Component({
  selector: 'autogama',
  templateUrl: './autogama.component.pug',
  styleUrls: ['./autogama.component.styl']
})
export class AutogamaComponent implements OnInit, AfterViewInit  {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    items : Observable<any>;

    itemsfiltrados : any[] = [];
    formulario: FormGroup;
    isLoading = false;

    @Input() id
    @Input() nuevoProducto

    gama : any
    producto : any = {}
    productos : any = []
    status : boolean = false

    constructor(private fb: FormBuilder) {

        this.formulario = this.fb.group({
            input: null
        })

        let observador = (value) =>
            Observable.create( (observer: any) => {
                GamaService.xMarca(this.producto.IdMarca)
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

  ngOnInit() {}

  cambio(){}

  ngAfterViewInit(){

      this.nuevoProducto.subscribe((value) => {
        
            if(!_.isUndefined(value) && value.IdGama){
                this.producto = value
                GamaService.one(value.IdGama)
                .then(response => {
                    this.gama = response
                    this.obtenerProductos()
                    return response
                })
                .then(response => this.formulario.controls['input'].setValue(response.nombre))
            }
      })
  }

    obtenerProductos(){

        GamaService.productos(this.gama.id)
        .then(productos => this.productos = productos)
        .then(productos => productos.forEach(producto => producto.obtenerPortadas()))


    }

    obtenerImagen(imagenes){
		if(_.isArray(imagenes))
			return imagenes.find(n => n.dimension === '50x50').link
	}

}
