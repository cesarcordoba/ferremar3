
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Input, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs'
import { FormBuilder, FormGroup } from '@angular/forms';
import {switchMap, debounceTime, tap, finalize} from 'rxjs/operators';
import * as _ from 'lodash'

import { ProductoService } from '../../../../../../../servicios';
@Component({
  selector: 'autoproducto',
  templateUrl: './autoproducto.component.pug',
  styleUrls: ['./autoproducto.component.styl']
})
export class AutoproductoComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    items : Observable<any>;

    itemsfiltrados : any[] = [];
    formulario: FormGroup;
    isLoading = false;

    @Output() cambiar = new EventEmitter();

    constructor(private fb: FormBuilder) {

        this.formulario = this.fb.group({
            input: null
        })

        let observador = (value) =>
            Observable.create( (observer: any) => {
                ProductoService.xNombre({nombre : value, status : [0,1,2,3,4,5,6]})
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

  ngOnInit() {}

    cambio(ev){
        this.cambiar.emit(ev)
    }

  displayFn(user) {
    if (user) { return user.nombre; }
  }
}
