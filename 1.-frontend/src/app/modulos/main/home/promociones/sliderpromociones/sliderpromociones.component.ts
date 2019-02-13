
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { PromoService } from '../../../../../servicios';
@Component({
    selector: 'sliderpromociones',
    templateUrl: './sliderpromociones.component.pug',
    styleUrls: ['./sliderpromociones.component.styl'],
    encapsulation: ViewEncapsulation.None
})
export class SliderpromocionesComponent implements OnInit {

    slideConfigPromos : any
    control : any
    currentSlide : any;

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}



    promos = {
        items : []
    }
    filtro : any;

    constructor() {
        this.slideConfigPromos = { "slidesToShow": 2, "slidesToScroll": 2, 'autoplay': true, 'autoplaySpeed': 2000}
        this.currentSlide = 0
        this.filtro = {
                pagina : 1,
                limite :  (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ?  20 :  3,
                order : ['id'],
                where : {},
                include : []
            }

    PromoService.paginacion(this.filtro)
    .then(response => this.promos = response)
    .then(response => console.log(response))

  }

  ngOnInit() {

  }

  afterChange = (event) => this.currentSlide = event.currentSlide
}