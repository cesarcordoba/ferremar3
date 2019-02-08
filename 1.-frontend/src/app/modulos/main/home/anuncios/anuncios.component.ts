
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AnuncioService } from '../../../../servicios';
@Component({
    selector: 'anuncios',
    templateUrl: './anuncios.component.pug',
    styleUrls: ['./anuncios.component.styl'],
    encapsulation: ViewEncapsulation.None
})
export class AnunciosComponent implements OnInit {

    slideConfig : any
    control : any
    currentSlide : any;

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}



    anuncios = {
        items : []
    }
    filtro : any;

    constructor() {
        this.slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 , "arrows" : true, 'dots' : true }
        this.currentSlide = 0
        this.filtro = {
                pagina : 1,
                limite :  (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ?  20 :  3,
                order : ['id'],
                where : {},
                include : []
            }

    AnuncioService.paginacion(this.filtro)
    .then(response => this.anuncios = response)
    .then(response => console.log(response))

  }

  ngOnInit() {

  }

  afterChange = (event) => this.currentSlide = event.currentSlide
}
