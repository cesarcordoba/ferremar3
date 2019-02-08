
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'actividades',
  templateUrl: './actividades.component.pug',
  styleUrls: [
      './actividades.component.styl'
  ]
})
export class ActividadesComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}




    constructor() {

  }

  ngOnInit() {

    console.log( this.borde )

  }
}