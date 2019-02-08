
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


import * as _ from 'lodash'
import { Router } from '@angular/router';
import { CategoriaService, ProductoService } from '../../../servicios';
import { CategoriasComponent } from  './categorias/categorias.component'
declare var $: any;
@Component({
  selector: 'menu',
  templateUrl: './menu.component.pug',
      styleUrls: [
          './menu.component.styl'
      ],

})
export class MenuComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}
    categorias : any

    constructor(public route : Router, private dialog: MatDialog) {

    }

    ir(x){
        this.route.navigate([ x ])
    }

    ngOnInit() {
        var buscar = (array, id) => array.filter(n => n.IdCategoria === id).map(n => {
            let objectos =  buscar(array, n.id)
            return [ Object.assign(n, {cantidad : objectos.length})  , objectos ]
        })


        CategoriaService.obtener()
            .then(response => this.categorias = _.flattenDeep([
                { id : 1, nivel : 1, cantidad : 0, nombre : 'Pisos y azulejos' }, buscar(response, 1),
                { id : 2, nivel : 1, cantidad : 0, nombre : 'Mobiliario de Baño'}, buscar(response, 2),
                { id : 70, nivel : 1, cantidad : 0, nombre : 'Material de Construcción'}, buscar(response, 70)
            ]))
    }

    abrir(){

        this.dialog.open(CategoriasComponent, {
            position : {
                top : '100px'
            },
            width :  $(window).width() + 'px',
            height : '500px',
            maxWidth : $(window).width() - 50 + 'px',
            data :  {
                categorias : this.categorias
            }
        }).afterClosed().subscribe(response => {

        });




    }
}
