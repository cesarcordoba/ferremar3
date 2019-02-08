
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { CategoriaService } from '../../../../servicios';
import { Router } from '@angular/router';

import * as _ from 'lodash'

@Component({
  selector: 'recursivacategorias',
  templateUrl: './recursivacategorias.component.pug',
  styleUrls: ['./recursivacategorias.component.styl']
})
export class RecursivacategoriasComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    niveles : any

    categorias: any

    focus : number = 1

    constructor(public route : Router) {

        CategoriaService.obtener()
        .then(response =>
            this.categorias = Object.entries(_.groupBy(response, (x) => x.nivel ))
            .map(n => {
                console.log(n)
                return new Object({
                    nivel : Number(n[0]),
                    categorias : n[1]
            })
        }))
        .then(response => this.restructurar(1, null))

    }

    restructurar(nivel, id){

        this.niveles = this.categorias.filter((n : any) => n.nivel <= nivel)
        .map(nivelito => nivelito.nivel === nivel ?
            new Object({
                nivel : nivelito.nivel,
                categorias : nivelito.categorias.filter(categoria => categoria.IdCategoria === id)
            })
            : nivelito )

    }

    ngOnInit() {

    }

    mostrar(categoria){
        this.restructurar(categoria.nivel + 1, categoria.id)
    }

    ir(categoria){

        this.route.navigate(['admin/categoria/' + categoria.id ]
          , { queryParams: { nombre: _.snakeCase( categoria.nombre ) } })

}

    imprimir(){
        console.log(this)
    }

}
