
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'masvendidos',
  templateUrl: './masvendidos.component.pug',
  styleUrls: ['./masvendidos.component.styl']
})
export class MasvendidosComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}


    constructor() {

  }

  ngOnInit() {



  }
}