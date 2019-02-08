
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ProductoService } from '../../../../../servicios';
@Component({
    selector: 'ofertas',
    templateUrl: './ofertas.component.pug',
    styleUrls: ['./ofertas.component.styl'],
    encapsulation: ViewEncapsulation.None
})
export class OfertasComponent implements OnInit {

    slideConfig : any = { "slidesToShow": 5, "slidesToScroll": 5 , "arrows" : true, 'dots' : true,
    autoplay: true,
    autoplaySpeed: 5000,
    adaptiveHeight: true


    }
    control : any
    currentSlide : any;

    borde = true ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}



    ofertas = {
        items : []
    }
    filtro : any;

    constructor() {
        this.currentSlide = 0
        this.filtro = {
                Promo : true,
                pagina : 1,
                limite :  (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ?  20 :  3,
                order : ['id'],
                Where : {
                    status : 1
                },
                include : []
            }

    ProductoService.filtro(this.filtro)
    .then(response => this.ofertas = response)
    .then(response => console.log(response))

  }

  ngOnInit() {

  }

  afterChange = (event) => this.currentSlide = event.currentSlide
}
