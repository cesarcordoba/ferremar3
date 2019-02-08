
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { CategoriaService } from '../../../../servicios';
import * as _ from 'lodash'

@Component({
  selector: 'categorias',
  templateUrl: './categorias.component.pug',
  styleUrls: ['./categorias.component.styl']
})
export class CategoriasComponent implements OnInit, AfterViewInit {

    borde = true ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Output() cambiar = new EventEmitter();
    @Output() eliminacion = new EventEmitter();

    @Input() categorias: any[] = []
    @Input() nuevoquery

    constructor() {

        CategoriaService.nivel(1)
        .then(response => this.categorias.push(
            new Object({
                item : null,
                nivel : 1,
                items : response
            })
        ))

    }

    ngOnInit() {}

    ngAfterViewInit(){

        console.log('categorias - nuevoquery subscribe')

        this.nuevoquery.subscribe(queries => {

            if(queries.Categoria){
                this.reordenar(queries.Categoria)

            }

        }).unsubscribe()

    }

    reordenar(categoria){

        console.log('categorias - reordenar')

        var arraynuevo = [ categoria ]

        function buscar( array, categoria ){

            let buscado = array.find(n =>  n.id ===  categoria.IdCategoria )

            if(!_.isUndefined(buscado)) arraynuevo.push(buscado), buscar(array, buscado)
            else arraynuevo = arraynuevo.reverse()

        }

        CategoriaService.obtener()
        .then(categorias => {

            buscar( categorias, categoria )

            arraynuevo.forEach((n, key) => {

                if(n.nivel !== 1) CategoriaService.subcategorias(n.IdCategoria)
                    .then(response => this.categorias.push(new Object({
                            item : n,
                            nivel : this.categorias.length + 1,
                            items : response
                        })))

                else CategoriaService.nivel(1)
                    .then(response =>  this.categorias[0] = new Object({
                            item : n,
                            nivel : this.categorias.length + 1,
                            items : response
                        }))
                    })

        })

    }


    eliminarCategoria(categoria){

        console.log('categorias - eliminarCategoria')

        //- Elimina las categorias mayores
        this.categorias.filter(n => n.nivel > categoria.nivel)
        .forEach(n => this.categorias.splice(this.categorias.indexOf(n), 1))

        this.eliminacion.emit(categoria)


    }


    cambioCategoria(ev){

        console.log('categorias - cambioCategoria')

        if(!_.isNull(ev)) {

            setTimeout(() => {

                if(ev.nombre === _.last(this.categorias.filter(n => n.item)).item.nombre){

                    this.cambiar.emit(ev)

                    //- Introduce la nueva categoria
                    CategoriaService.subcategorias(ev.id)
                        .then(response => {
                            if(response.length > 0)
                                this.categorias.push(new Object({
                                    item : null,
                                    nivel : this.categorias.length + 1,
                                    items : response
                                }))
                        })
                }

            }, 1000)
        } else {

        }

    }

}
