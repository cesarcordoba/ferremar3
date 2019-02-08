
import { Component, Input, OnInit } from '@angular/core';



import { AmbienteService } from '../../../../../servicios';

@Component({
  selector: 'ambiente',
  templateUrl: './ambiente.component.pug',
  styleUrls: ['./ambiente.component.styl']
})
export class AmbienteComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() ambiente

    currentSlide : number

    horizontal = {
        "slidesToShow": 1,
        "slidesToScroll": 1,
        "arrows": true,
		"fade": true
    }

    ambientes: any

    constructor() {

        this.currentSlide = 0

    // AmbienteService.one()
    // .then(response => this.ambientes = response)
    // .then(response => console.log(response))

  }

    ngOnInit() {
        console.log(this.ambiente)
    }

    afterChange = (event) => this.currentSlide = event.currentSlide

}
