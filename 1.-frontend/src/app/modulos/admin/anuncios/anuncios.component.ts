
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'anuncios',
  templateUrl: './anuncios.component.pug',
  styleUrls: [
      './anuncios.component.styl'
  ]
})
export class AnunciosComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}




    constructor( ) { 

  }

  ngOnInit() {

    console.log( this.borde )

  }
}
