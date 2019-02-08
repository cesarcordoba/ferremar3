
import { Component, Input, OnInit } from '@angular/core';
import { CategoriaService, ProductoService } from '../../../../servicios';
import * as _ from 'lodash'
import { Router } from '@angular/router';
@Component({
  selector: 'fichacategoria',
  templateUrl: './fichacategoria.component.pug',
  styleUrls: ['./fichacategoria.component.styl']
})
export class FichacategoriaComponent implements OnInit {

    borde = true ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() categoria


    portadas : any = []
    producto : any = {}
    portada : any

    constructor(public route : Router) {


    }

    ngOnInit() {

      CategoriaService.ultimoproducto(this.categoria.id)
		.then(async (response) => new Object({
            producto : response ,
            portada :  !_.isNull(response) ? await ProductoService.portadas(response.id) : null } ))
		.then((response : any) => {

            this.portadas = response.portada
            this.portada = ( _.isUndefined(response.portada) && _.isUndefined(response.portada[0] )) ? response.portada[0] : null
            this.producto = response.producto

        })




      // console.log( this.categoria  )

  }


  ir(){
      this.route.navigate(['busqueda'], { queryParams: { Categoria : this.categoria.id + ',' + this.categoria.nivel + ',' + this.categoria.IdCategoria + ',' + this.categoria.nombre  } } )
  }
}
