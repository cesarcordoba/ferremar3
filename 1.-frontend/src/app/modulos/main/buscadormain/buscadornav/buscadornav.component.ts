
import { Component, OnInit } from '@angular/core';

import { Input, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs'
import { FormBuilder, FormGroup } from '@angular/forms';
import {switchMap, debounceTime, tap, finalize} from 'rxjs/operators';
import * as _ from 'lodash'

import { ProductoService } from '../../../../servicios';
import { Router } from '@angular/router';
@Component({
  selector: 'buscadornav',
  templateUrl: './buscadornav.component.pug',
  styleUrls: ['./buscadornav.component.styl'],
  encapsulation: ViewEncapsulation.None
})
export class BuscadornavComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    items : Observable<any>;

    itemsfiltrados : any[] = [];
    formulario: FormGroup;
    isLoading = false;

    constructor(private fb: FormBuilder, public route : Router) {

        this.formulario = this.fb.group({
            input: null
        })

        let observador = (value) =>
            Observable.create( (observer: any) => {
                ProductoService.xNombre({nombre : value, status : 1})
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
            console.log(items)
            this.itemsfiltrados = items
        });

  }

  displayFn(item) {
    if (item) { return item.nombre; }
  }

  ir(x){
    this.route.navigate(['producto/' + x.id ], { queryParams: { nombre: _.snakeCase(x.nombre) } } )
}

  ngOnInit() {



  }
}