
import { Component, OnInit } from '@angular/core';


//    4
import { PrecioService } from '../../../../../../servicios';
@Component({
  selector: 'precio',
  templateUrl: './precio.component.pug',
  styleUrls: ['./precio.component.styl']
})
export class PrecioComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}



    precios: any

    constructor() {

    // PrecioService.obtener()
    // .then(response => this.precios = response)
    // .then(response => console.log(response))

  }

  ngOnInit() {



  }
}
