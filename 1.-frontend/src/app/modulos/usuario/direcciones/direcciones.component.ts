
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'direcciones',
  templateUrl: './direcciones.component.pug',
  styleUrls: [
      './direcciones.component.styl'
  ]
})
export class DireccionesComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}




    constructor() {

  }

  ngOnInit() {

    console.log( this.borde )

  }
}