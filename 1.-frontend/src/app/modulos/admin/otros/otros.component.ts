
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'otros',
  templateUrl: './otros.component.pug',
  styleUrls: [
      './otros.component.styl'
  ]
})
export class OtrosComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}




    constructor() {

  }

  ngOnInit() {

    console.log( this.borde )

  }
}