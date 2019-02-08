
import { Component, OnInit, Input, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { AmbienteService, GamaService } from '../../../../servicios';

import * as _ from 'lodash'

@Component({
    selector: 'ambientes',
    templateUrl: './ambientes.component.pug',
    styleUrls: ['./ambientes.component.styl'],
    encapsulation: ViewEncapsulation.None
})
export class AmbientesComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}
    currentSlide : number


    @Input() pasarProducto
    @Input() ambientes

    @Output() pasarAmbientes = new EventEmitter();



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
        // AmbienteService.obtener()
        // .then(response => this.ambientes = response)
        // .then(response => console.log(response))

    }

    ngOnInit() {}

    ngAfterViewInit(){
      this.pasarProducto.subscribe((value) => {
          if(_.isObject(value) && !_.isNull(value.IdGama))
              this.obtener(value)
      })
    }

    obtener(value){
        console.log(value)
        GamaService.ambientes(value.IdGama)
        .then(response => this.ambientes = response)
        .then(response => this.pasarAmbientes.emit(this.ambientes.length > 0))

    }

    afterChange = (event) => this.currentSlide = event.currentSlide


}
