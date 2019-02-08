
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'asesores',
  templateUrl: './asesores.component.pug',
  styleUrls: [
      './asesores.component.styl'
  ]
})
export class AsesoresComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}




    constructor() {

  }

  ngOnInit() {

    console.log( this.borde )

  }
}