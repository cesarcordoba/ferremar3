import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as _ from 'lodash'
import { ProductoService } from '../../../../../servicios';
import { Router } from '@angular/router';
@Component({
  selector: 'gridproductos',
  templateUrl: './gridproductos.component.pug',
  styleUrls: ['./gridproductos.component.styl'],
  encapsulation: ViewEncapsulation.None
})
export class GridproductosComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}



    productos = {
        items : []
    }
    filtro : any;
    columnas = 2
    height = '230px'
    colspan = 1
    rowspan = 1

    constructor(public route : Router) {
        this.filtro = {
                pagina : 1,
                limite :  (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ?  4 :  2,
                order : ['id'],
                where : {status:1},
                include : []
            }

    ProductoService.paginacion(this.filtro)
    .then(response => {
      this.productos = response
      this.productos.items.forEach(n => n.obtenerPortadasIndivudal('200x200'))
      console.log(this.productos)
    })
      
  }

  ir(producto){
    this.route.navigate(['producto/' + producto.id ], { queryParams: { nombre: _.snakeCase(producto.nombre) } } )
}

  ngOnInit() {



  }
}