
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

import { ProductoService } from '../../../../servicios';
@Component({
  selector: 'productos',
  templateUrl: './productos.component.pug',
  styleUrls: ['./productos.component.styl']
})
export class ProductosComponent implements OnInit, AfterViewInit {

    borde = true ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}


    @Input() nuevaPeticion

    productos = {
        items : [],
        paginas : 0
    }

    columnas = 4
    height = '10px'

    colspan = 1
    rowspan = 1

    peticion : any

    constructor() {

        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){

        
            this.columnas = 1


        }


        // ProductoService.paginacion(this.filtro)
        // .then(response => this.productos = response)

    }

    cambioPagina(ev){
        // console.log(this.peticion.pagina)
        // console.log(ev.pageIndex)
        this.peticion.pagina = ev.pageIndex + 1
        this.obtener()
    }

    ngOnInit() {
    }

    imprimir(){  console.log(this) }


    ngAfterViewInit(){
        this.nuevaPeticion.subscribe((value) => {
            this.peticion = value
            this.obtener()

        })
    }

    obtener(){
        console.log(this.peticion)
        ProductoService.filtro(this.peticion)
        .then(response => {
            // console.log(response)
            this.productos = response
        })
    }
}
