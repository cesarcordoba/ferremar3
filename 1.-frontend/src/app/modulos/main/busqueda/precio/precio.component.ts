
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'precio',
  templateUrl: './precio.component.pug',
  styleUrls: ['./precio.component.styl']
})
export class PrecioComponent implements OnInit {

    borde = true ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}
    @Output() pasarPrecio = new EventEmitter();

    min : number
    max : number

    constructor() {
        this.min = 0
        this.max = 10000
    }

    ngOnInit() {}

    aceptar(){ this.pasarPrecio.emit([ this.min, this.max ]) }

    cambioPrecio(ev){
        this.min = Number(ev.minValue)
        this.max = Number(ev.maxValue)
    }

}
