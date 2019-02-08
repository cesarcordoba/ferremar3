import { Component, Input, OnInit, AfterViewInit } from '@angular/core';

import { AtributoService } from '../../../../../../../servicios';

@Component({
  selector: 'categoria',
  templateUrl: './categoria.component.pug',
  styleUrls: ['./categoria.component.styl']
})
export class CategoriaComponent implements OnInit, AfterViewInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() objeto
    @Input() opciones
    @Input() version


    atributos: any = []
    categoria : any = []

    constructor() {

    // AtributoService.one()
    // .then(response => this.atributos = response)
    // .then(response => console.log(response))

  }

    ngOnInit() {

    }

  ngAfterViewInit(){

      setTimeout(() => {
          this.categoria = this.objeto.categoria
          this.atributos = this.objeto.atributos
      }, 1000)




  }
}
