
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'buscadormain',
  templateUrl: './buscadormain.component.pug',
  styleUrls: [
      './buscadormain.component.styl'
  ]
})
export class BuscadormainComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}




    constructor() {

  }

  ngOnInit() {

    console.log( this.borde )

  }
}