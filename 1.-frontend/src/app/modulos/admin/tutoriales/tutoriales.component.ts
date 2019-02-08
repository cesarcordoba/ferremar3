
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tutoriales',
  templateUrl: './tutoriales.component.pug',
  styleUrls: [
      './tutoriales.component.styl'
  ]
})
export class TutorialesComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}




    constructor() {

  }

  ngOnInit() {

    console.log( this.borde )

  }
}