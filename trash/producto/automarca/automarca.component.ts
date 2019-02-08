
import { Component, OnInit } from '@angular/core';

import { Input, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs'
import { FormBuilder, FormGroup } from '@angular/forms';
import {switchMap, debounceTime, tap, finalize} from 'rxjs/operators';
import * as _ from 'lodash'

import { MarcaService } from '../../../../../servicios';
@Component({
  selector: 'automarca',
  templateUrl: './automarca.component.pug',
  styleUrls: ['./automarca.component.styl'],
    encapsulation: ViewEncapsulation.None
})
export class AutomarcaComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    items : Observable<any>;

    itemsfiltrados : any[] = [];
    formulario: FormGroup;
    isLoading = false;

    @Input() id
    @Input() nuevoProducto

    marca : any
    status = false
    producto : any

    constructor(private fb: FormBuilder) {

        this.formulario = this.fb.group({
            input: null
        })

        let observador = (value) =>
            Observable.create( (observer: any) => {
                MarcaService.xNombre({nombre : value, status : 1})
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

            if(!_.isUndefined(value) && value.IdMarca)
                MarcaService.one(value.IdMarca)
                .then(response => this.marca = response)

            // console.log(this.formulario)


        })
    }

}
