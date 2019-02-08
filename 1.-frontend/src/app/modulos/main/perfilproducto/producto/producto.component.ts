
import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Input } from '@angular/core';
import { ProductoService, GamaService, LineaService, MarcaService } from '../../../../servicios';

import * as _ from 'lodash'

@Component({
  selector: 'producto',
  templateUrl: './producto.component.pug',
  styleUrls: ['./producto.component.styl']
})
export class ProductoComponent implements OnInit, AfterViewInit {

    borde = true ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}



    @Input() pasarProducto

    producto : any
    gamas : any = []
    lineas : any = []
    versiones : any = []
    promociones : any = []
    colores : any = []
    marca = {}

    constructor() {

    // ProductoService.obtener()
    // .then(response => this.productos = response)
    // .then(response => console.log(response))

  }

    ngOnInit() {

    }

    ngAfterViewInit(){
        this.pasarProducto.subscribe((value) => {
            if(_.isObject(value))
                this.obtener(value)

            // if(!_.isUndefined(value) && value[0] && value[0].Disponible.descuento > 0)
            //     this.ObtenerDescuento()
        })
    }

    obtener(value){
        this.producto = value


        ProductoService.colores(this.producto.id)
        .then(response => this.colores = response)

        if(value.IdMarca)
            MarcaService.one(value.IdMarca)
            .then(response => this.marca = response )


        if(value.IdGama)
            GamaService.productos(value.IdGama)
            .then(response => this.gamas = response.filter(n => n.id !== Number(value.id) && n.status === 1))

        if(value.IdLinea)
            LineaService.productos(value.IdLinea)
            .then(response => this.lineas = response.filter(n => n.id !== value.id && n.status === 1))


        Promise.all([
            ProductoService.promos(this.producto.id),
            ProductoService.versionesdisponibles(value.id)
        ])
        .then(response => {
            [  this.promociones,  this.versiones  ] = response
        })
    }

}
