
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'promociones',
  templateUrl: './promociones.component.pug',
  styleUrls: [
      './promociones.component.styl'
  ]
})
export class PromocionesComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}




    constructor() {

  }

  ngOnInit() {

    console.log( this.borde )

  }
}