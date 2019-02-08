
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ambientes',
  templateUrl: './ambientes.component.pug',
  styleUrls: [
      './ambientes.component.styl'
  ]
})
export class AmbientesComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}




    constructor() {

  }

  ngOnInit() {

    console.log( this.borde )

  }
}