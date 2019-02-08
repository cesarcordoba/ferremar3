
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'metodos',
  templateUrl: './metodos.component.pug',
  styleUrls: [
      './metodos.component.styl'
  ]
})
export class MetodosComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}




    constructor() {

  }

  ngOnInit() {

    console.log( this.borde )

  }
}