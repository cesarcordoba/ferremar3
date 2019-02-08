
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductoService } from '../../../../servicios';
import { Observable } from 'rxjs'
import { FormBuilder, FormGroup } from '@angular/forms';
import {switchMap, debounceTime, tap, finalize} from 'rxjs/operators';
import * as _ from 'lodash'
import { Router } from '@angular/router';

@Component({
  selector: 'buscador',
  templateUrl: './buscador.component.pug',
  styleUrls: ['./buscador.component.styl'],
  encapsulation: ViewEncapsulation.None
})
export class BuscadorComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    // myControl = new FormControl();
    productos : Observable<any>;

    filteredUsers: any[] = [];
    usersForm: FormGroup;
    isLoading = false;

    constructor(private fb: FormBuilder , public route : Router) {

        this.usersForm = this.fb.group({
            userInput: null
        })

        let observador = (value) =>
            Observable.create( (observer: any) => {
                ProductoService.xNombre({ nombre : value, status : 1 })
                .then((data)=>{
                    observer.next(data);
                 },(reason)=>{
                    observer.error(reason);
                 })
            })


        this.usersForm
        .get('userInput')
        .valueChanges
        .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
            switchMap(value =>
                observador(value)
                .pipe( finalize(() => this.isLoading = false))
        ))
        .subscribe((users : any[]) => {
            console.log(users)
            this.filteredUsers = users
        });

  }


  displayFn(user) {
    if (user) { return user.nombre; }
  }

  ir(x){
      this.route.navigate(['producto/' + x.id ], { queryParams: { nombre: _.snakeCase(x.nombre) } } )
  }

  ngOnInit() {



  }
}
