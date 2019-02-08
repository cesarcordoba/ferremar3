
import { Component, Input, OnInit } from '@angular/core';
import {  BehaviorSubject, Observable  } from 'rxjs'

import { ProductoService } from '../../../../servicios';
@Component({
  selector: 'fichaproducto',
  templateUrl: './fichaproducto.component.pug',
  styleUrls: ['./fichaproducto.component.styl']
})
export class FichaproductoComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() producto
    @Input() nuevoProducto

    constructor() { }

    ngOnInit() {}
    
}
