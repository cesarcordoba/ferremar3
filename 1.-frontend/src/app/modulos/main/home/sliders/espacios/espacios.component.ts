
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AmbienteService } from '../../../../../servicios';
@Component({
    selector: 'espacios',
    templateUrl: './espacios.component.pug',
    styleUrls: ['./espacios.component.styl'],
})
export class EspaciosComponent implements OnInit {

    slideConfig : any = { "slidesToShow": 5, "slidesToScroll": 4 , "arrows" : true, 'dots' : true, 'variableWidth': true,
    autoplay: true,
    autoplaySpeed: 5000 }

    control : any
    currentSlide : any;

    borde = true ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    ambientes = {
        items : []
    }
    filtro : any;

    constructor() {
        this.currentSlide = 0
        this.filtro = {
                pagina : 1,
                limite :  (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ?  20 :  3,
                order : ['id'],
                where : {},
                include : []
            }

        AmbienteService.paginacion(this.filtro)
        .then(response => this.ambientes = response)
        .then(response => console.log(response))

    }

    ngOnInit() {

    }

    afterChange = (event) => this.currentSlide = event.currentSlide

}
