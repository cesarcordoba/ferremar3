
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'modulo',
  templateUrl: './modulo.component.pug',
  styleUrls: ['./modulo.component.styl'],
  encapsulation: ViewEncapsulation.None
})
export class ModuloComponent implements OnInit {

    borde = true ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() modulo

    @Output() cambiar = new EventEmitter();

    constructor() {}

    ngOnInit() {}

    imprimir(){}

    cambiarOpciones(){ this.cambiar.emit() }

}
