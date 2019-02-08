import { Component, OnInit, Input } from '@angular/core';
import {  BehaviorSubject, Observable  } from 'rxjs'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModificarversionesComponent } from  './modificarversiones/modificarversiones.component'
import { FormControl } from '@angular/forms';

declare var $: any;
//    2
import { VersionService, ProductoService } from '../../../../servicios';
@Component({
  selector: 'versiones',
  templateUrl: './versiones.component.pug',
  styleUrls: ['./versiones.component.styl']
})
export class VersionesComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() nuevoProducto

    selected = new FormControl(0);

    versiones: any = []
    producto : any

    constructor(private dialog: MatDialog) {

        // this.pasarProducto = new BehaviorSubject({});



    }

    modificar(){
        this.dialog.open(ModificarversionesComponent, {
            // position : {
            //     top : '25px'
            // },
            // width :  $(window).width() - 100 + 'px',
            // height :  $(window).height() - 50 + 'px',
            // maxWidth : $(window).width() - 50 + 'px',
            data :  {
                producto : this.producto,
                versiones : this.versiones
            }
        }).afterClosed().subscribe(response => {

        });

    }

    recargar(){
        ProductoService.versiones(this.producto.id)
        .then(response => this.versiones = response)
    }

    ngOnInit() {}

    ngAfterViewInit(){
        this.nuevoProducto.subscribe((value) => {
            if(value.id){

                this.producto = value
                this.recargar()

            }
        })
    }

    imprimir(i){
        console.log(this)
        console.log(i)
    }


}
