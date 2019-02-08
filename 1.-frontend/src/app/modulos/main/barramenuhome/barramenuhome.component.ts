
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { CategoriasComponent } from  './categorias/categorias.component'
import { CategoriaService, ProductoService } from '../../../servicios';
import * as _ from 'lodash'
import * as $ from "jquery";

@Component({
  selector: 'barramenuhome',
  templateUrl: './barramenuhome.component.pug',
  styleUrls: [
      './barramenuhome.component.styl'
  ],encapsulation: ViewEncapsulation.None
})
export class BarramenuhomeComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}
    categorias : any



    constructor(
      private dialog: MatDialog,
      public route : Router,
    ) {

  }

  ir(x){
    this.route.navigate([ x ])
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

  ngOnInit() {
    var buscar = (array, id) => array.filter(n => n.IdCategoria === id).map(n => {
      let objectos =  buscar(array, n.id)
      return [ Object.assign(n, {cantidad : objectos.length})  , objectos ]
  })


  CategoriaService.obtener()
      .then(response => this.categorias = _.flattenDeep([
          { id : 1, nivel : 1, cantidad : 0, nombre : 'Materiales Electricos' }, buscar(response, 1),
          { id : 1, nivel : 1, cantidad : 0, nombre : 'Aceros' }, buscar(response, 2),
          { id : 1, nivel : 1, cantidad : 0, nombre : 'Herramientas' }, buscar(response, 8)

      ]))
  }

}
