
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { CategoriaService } from '../../../../../servicios';
import { Router } from '@angular/router';
@Component({
    selector: 'slidercategorias',
    templateUrl: './slidercategorias.component.pug',
    styleUrls: ['./slidercategorias.component.styl'],
    encapsulation: ViewEncapsulation.None
})
export class SlidercategoriasComponent implements OnInit {

    slideConfigCategorias : any
    control : any
    currentSlide : any;

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}



    categorias = {
        items : []
    }
    filtro : any;

    constructor(public route : Router) {
        this.slideConfigCategorias = { "slidesToShow": 4, "slidesToScroll": 4 , "arrows" : true, 'autoplay': true, 'autoplaySpeed': 2000}
        this.currentSlide = 0
        this.filtro = {
                pagina : 1,
                limite :  (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ?  19 :  3,
                order : ['id'],
                where : {},
                include : []
            }

    CategoriaService.paginacion(this.filtro)
    .then(response => this.categorias = response)
    .then(response => console.log(response))

  }

  ngOnInit() {

  }

  mandarAProductos(ruta){
    this.route.navigate([ ruta ])
  }

  afterChange = (event) => this.currentSlide = event.currentSlide
}