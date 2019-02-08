
import { Component, OnInit } from '@angular/core';


//    3
import { CategoriaService } from '../../../../../servicios';
@Component({
  selector: 'categorias',
  templateUrl: './categorias.component.pug',
  styleUrls: ['./categorias.component.styl']
})
export class CategoriasComponent implements OnInit {

    borde = true ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    categorias: any

    constructor() {

        Promise.all(
            [ { nombre: 'Pisos y Azulejos', id: 1,  numero : 1 }, { nombre :  'Muebles de Baño', id: 2, numero : 2 }].map(modulo =>
                CategoriaService.one(modulo.id)))
        .then(response => this.categorias = response)

    // CategoriaService.obtener()
    // .then(response => this.categorias = response)
    // .then(response => console.log(response))

  }

    ngOnInit() {



    }

}
