
import { Component, OnInit } from '@angular/core';

import { Input, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs'
import { FormBuilder, FormGroup } from '@angular/forms';
import {switchMap, debounceTime, tap, finalize} from 'rxjs/operators';
import * as _ from 'lodash'

import { LineaService } from '../../../../../servicios';
@Component({
  selector: 'autolinea',
  templateUrl: './autolinea.component.pug',
  styleUrls: ['./autolinea.component.styl'],
    encapsulation: ViewEncapsulation.None
})
export class AutolineaComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    items : Observable<any>;

    itemsfiltrados : any[] = [];
    formulario: FormGroup;
    isLoading = false;

    @Input() id
    @Input() nuevoProducto

    linea : any
    producto : any
    status : boolean = false

    constructor(private fb: FormBuilder) {

        this.formulario = this.fb.group({
            input: null
        })

        let observador = (value) =>
            Observable.create( (observer: any) => {
                LineaService.xNombre({nombre : value, status : 1})
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

    displayFn(user) {
        if (user) { return user.nombre; }
    }

    cambio(){}

  ngOnInit() { }

    ngAfterViewInit(){
        this.nuevoProducto.subscribe((value) => {

            if(!_.isUndefined(value) && value.IdLinea)
                console.log(value.IdLinea)


        })
    }

}
