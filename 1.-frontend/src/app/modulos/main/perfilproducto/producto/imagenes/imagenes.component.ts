
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Input } from '@angular/core';
import { ImagenService, PortadaService } from '../../../../../servicios';
import * as _ from 'lodash'

@Component({
    selector: 'imagenes',
    templateUrl: './imagenes.component.pug',
    styleUrls: ['./imagenes.component.styl'],
    encapsulation: ViewEncapsulation.None,
})
export class ImagenesComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() producto

    imagenes: any = []
    portadas : any

    slides : any = []
    currentSlide : number

    vertical = {

        "slidesToShow": 1,
        "slidesToScroll": 1 ,
        "vertical": true,
        "arrows": false,
        "focusOnSelect": true,
        dots: true,

    }
    horizontal = {
        "slidesToShow": 1,
        "slidesToScroll": 1,
        "arrows": true,
		"fade": true,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite : true
    }

    constructor() {
        this.currentSlide = 0
    }

    ngOnInit() {

        Promise.all([
            ImagenService.xProducto(this.producto.id),
            PortadaService.xProducto(this.producto.id)
        ])
        .then(response => {
            [  this.imagenes, this.portadas  ]  = response
        })
        .then(() => {
            this.slides = this.portadas.length > 0 ? _.flattenDeep(new Array([  this.portadas[0], this.imagenes   ])) : this.imagenes
        })


        console.log(this)

    }

    afterChange = (event) => this.currentSlide = event.currentSlide

}
