
import { Component, OnInit,  Output, EventEmitter  } from '@angular/core';

import { Input, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs'
import { FormBuilder, FormGroup } from '@angular/forms';
import {switchMap, debounceTime, tap, finalize} from 'rxjs/operators';
import * as _ from 'lodash'

import { GamaService } from '../../../../servicios';
@Component({
  selector: 'autogama',
  templateUrl: './autogama.component.pug',
  styleUrls: ['./autogama.component.styl'],
    encapsulation: ViewEncapsulation.None
})
export class AutogamaComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    items : Observable<any>;

    itemsfiltrados : any[] = [];
    formulario: FormGroup;
    isLoading = false;

    @Output() capturar = new EventEmitter();

    constructor(private fb: FormBuilder) {

        this.formulario = this.fb.group({
            input: null
        })

        let observador = (value) =>
            Observable.create( (observer: any) => {
                GamaService.xNombre({nombre : value, status : 1})
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

  cambio(){
        this.capturar.emit(new Object({Gama : _.isObject(this.formulario.value.input) ?  [ this.formulario.value.input.id ] : [ ] }))
  }

  displayFn(user) {
    if (user) {
        return user.nombre
    }
  }

  ngOnInit() {



  }
}
