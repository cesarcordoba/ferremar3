
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pedidos',
  templateUrl: './pedidos.component.pug',
  styleUrls: [
      './pedidos.component.styl'
  ]
})
export class PedidosComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}




    constructor() {

  }

  ngOnInit() {

    console.log( this.borde )

  }
}