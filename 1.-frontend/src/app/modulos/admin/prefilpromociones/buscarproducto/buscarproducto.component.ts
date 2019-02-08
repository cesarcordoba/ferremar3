
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Input } from '@angular/core';
import { ProductoService, PromoService } from '../../../../servicios';
import { Observable } from 'rxjs'
import { FormBuilder, FormGroup } from '@angular/forms';
import {switchMap, debounceTime, tap, finalize} from 'rxjs/operators';
import * as _ from 'lodash'
import { Router } from '@angular/router';


import { NotificacionComponent } from '../../../../extras/notificacion/notificacion.component';

@Component({
    selector: 'buscarproducto',
    templateUrl: './buscarproducto.component.pug',
    styleUrls: ['./buscarproducto.component.styl']
})
export class BuscarproductoComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    // myControl = new FormControl();
    productos : Observable<any>;
    filteredUsers: any[] = [];
    usersForm: FormGroup;
    isLoading = false;
    promo : any
    cantidad : any

    constructor(
        public snackBar: MatSnackBar,
        private fb: FormBuilder , public route : Router,
        public dialogRef: MatDialogRef<BuscarproductoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

        console.log(data)

        this.promo = data

        this.usersForm = this.fb.group({ input: null })

        let observador = (value) =>
            Observable.create((observer: any) => {
                ProductoService.xNombre({ nombre : value, status : 1 })
                .then((data) => observer.next(data), (reason) => observer.error(reason))
            })


        this.usersForm
        .get('input')
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

    verificar(){

        if(_.isObject(this.usersForm.value.input)){

            ProductoService.promos(this.usersForm.value.input.id)
            .then(response => {

                console.log(response)

                let mensaje = response.length > 0 ? 'listo' : 'No listo'

                this.snackBar.open(mensaje, 'Listo', {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'center',
                });

                this.dialogRef.close(this.usersForm.value.input)
            })
        }

        //
        // PromoService.verificarProducto(x.id)
        // .then(response => {
        //
        //     console.log(response)
        //
        // })

    }

    ngOnInit() {}

    aceptar(){
        this.dialogRef.close()
    }
}
