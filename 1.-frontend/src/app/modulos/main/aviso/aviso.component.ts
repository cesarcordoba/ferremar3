
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aviso',
  templateUrl: './aviso.component.pug',
  styleUrls: [
      './aviso.component.styl'
  ]
})
export class AvisoComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}




    constructor() {

  }

  ngOnInit() {

    console.log( this.borde )

  }
}