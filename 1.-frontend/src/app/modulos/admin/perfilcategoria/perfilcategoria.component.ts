
import { Component, OnInit } from '@angular/core';
import { Title , Meta }     from '@angular/platform-browser';
import { ActivatedRoute} from '@angular/router'
import {  BehaviorSubject, Observable  } from 'rxjs'

import { CategoriaService, AtributoService } from '../../../servicios';

import { Categoria } from '../../../modelos';


@Component({
  selector: 'perfilcategoria',
  templateUrl: './perfilcategoria.component.pug',
  styleUrls: [
      './perfilcategoria.component.styl'
  ]
})
export class PerfilcategoriaComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}
    //
    // pasarCategoria : BehaviorSubject<any>



    categoria: any = {}
    categorias : any[]

    constructor(public route : ActivatedRoute, private titleService: Title, private meta : Meta ) {


    route.params.subscribe(async (res) =>
        CategoriaService.one( Number(res.id) )
        .then(response => this.categoria = response)
        .then(categoria => {


            CategoriaService.padres(categoria.id)
            .then(categorias => Promise.all(
                categorias.map(async (categoria) =>
                    new Object({
                        categoria : categoria,
                        atributos : await CategoriaService.atributos(categoria.id)
                            .then(atributos => Promise.all(
                                atributos.map( async (atributo) => new Object({
                                    atributo : atributo,
                                    opciones : await AtributoService.opciones(atributo.id)
                                }))
                            ))
                    })
            )))
            .then(response => this.categorias = response)

            console.log(this.categorias)

            this.titleService.setTitle( this.categoria.nombre );
        // this.meta.updateTag({ name: 'description', content: _.replace( this.proyecto.resumen, '<p>', '')  })
        // this.meta.updateTag({ name: 'keywords', content: 'pagina web, presupuesto web, cotizador online, cotizador paginas web, presupuesto tienda online,' + this.proyecto.nombre })

    }))


    }

    ngOnInit() {}


}
