
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sucursales',
  templateUrl: './sucursales.component.pug',
  styleUrls: [
      './sucursales.component.styl'
  ]
})
export class SucursalesComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}




    constructor() {

  }

  ngOnInit() {

    console.log( this.borde )

  }
}