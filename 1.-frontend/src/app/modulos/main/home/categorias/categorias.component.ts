
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'categorias',
  templateUrl: './categorias.component.pug',
  styleUrls: ['./categorias.component.styl']
})
export class CategoriasComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}


    constructor() {

  }

  ngOnInit() {



  }
}