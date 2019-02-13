
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as _ from 'lodash'
import { ProductoService } from '../../../../../servicios';
import { Router } from '@angular/router';
@Component({
    selector: 'sliderproductos',
    templateUrl: './sliderproductos.component.pug',
    styleUrls: ['./sliderproductos.component.styl'],
    encapsulation: ViewEncapsulation.None
})
export class SliderproductosComponent implements OnInit {

    slideConfig : any
    control : any
    currentSlide : any;

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}



    productos = {
        items : []
    }
    filtro : any;

    constructor(public route : Router) {
        this.slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 , "dots": true, 'autoplay': true, 'autoplaySpeed': 2000}
        this.currentSlide = 0
        this.filtro = {
                pagina : 1,
                limite :  (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ?  20 :  3,
                order : ['id'],
                where : {status:1},
                include : []
            }

      ProductoService.paginacion(this.filtro)
      .then(response => {
        this.productos = response
        this.productos.items.forEach(n => n.obtenerPortadasIndivudal('400x400'))
        console.log(this.productos)
      })

  }

  ngOnInit() {

  }

  ir(producto){
    this.route.navigate(['producto/' + producto.id ], { queryParams: { nombre: _.snakeCase(producto.nombre) } } )
}

  afterChange = (event) => this.currentSlide = event.currentSlide
}