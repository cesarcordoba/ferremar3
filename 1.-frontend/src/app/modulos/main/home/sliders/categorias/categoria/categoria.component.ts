
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

import { CategoriaService } from '../../../../../../servicios';
@Component({
    selector: 'categoria',
    templateUrl: './categoria.component.pug',
    styleUrls: ['./categoria.component.styl'],
     // encapsulation: ViewEncapsulation.None
})
export class CategoriaComponent implements OnInit {

    slideConfig : any = { "slidesToShow": 5, "slidesToScroll": 4 , "arrows" : true, 'dots' : true, 'variableWidth': true}
    control : any
    currentSlide : any;

    borde = true ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}


    @Input() categoria

    categorias = {
        items : []
    }
    filtro : any;

    constructor() {
        this.currentSlide = 0
        // this.filtro = {
        //         pagina : 1,
        //         limite :  (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ?  20 :  3,
        //         order : ['id'],
        //         where : {},
        //         include : []
        //     }

    // CategoriaService.paginacion(this.filtro)
    // .then(response => this.categorias = response)
    // .then(response => console.log(response))

  }

  ngOnInit() {
      console.log(this.categoria.id)
      CategoriaService.subcategorias(this.categoria.id)
      .then(response => this.categorias.items = response)

  }

  afterChange = (event) => this.currentSlide = event.currentSlide
}
