
import { Component, OnInit } from '@angular/core';

import { Input } from '@angular/core';
import { ProductoService } from '../../../../servicios';
@Component({
  selector: 'tablainfoproducto',
  templateUrl: './tablainfoproducto.component.pug',
  styleUrls: ['./tablainfoproducto.component.styl']
})
export class TablainfoproductoComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}



    productos: any

    constructor() {

    ProductoService.obtener()
    .then(response => this.productos = response)
    .then(response => console.log(response))

  }

  ngOnInit() {



  }
}