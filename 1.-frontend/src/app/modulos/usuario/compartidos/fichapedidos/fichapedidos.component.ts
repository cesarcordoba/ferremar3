
    import { Component, Input, OnInit } from '@angular/core';


import { OrdenService } from '../../../../servicios';
@Component({
  selector: 'fichapedidos',
  templateUrl: './fichapedidos.component.pug',
  styleUrls: ['./fichapedidos.component.styl']
})
export class FichapedidosComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() orden


    constructor() {

    // OrdenService.one()
    // .then(response => this.ordenes = response)
    // .then(response => console.log(response))

  }

  ngOnInit() {

      console.log( this.orden  )

  }
}