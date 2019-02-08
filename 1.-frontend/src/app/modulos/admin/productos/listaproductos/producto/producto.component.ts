import { Component, OnInit } from '@angular/core';

import { Input } from '@angular/core';
import { ProductoService, MarcaService, GamaService, LineaService, CategoriaService, PortadaService } from '../../../../../servicios';
import * as _ from 'lodash'

@Component({
  selector: 'producto',
  templateUrl: './producto.component.pug',
  styleUrls: ['./producto.component.styl']
})
export class ProductoComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() producto

    productos: any
    marca : any
    linea : any
    gama : any
    categoria : any

    color = {  'background-color' : 'red'  }

    portadas : any[]
    portada : any

    dimensiones = {}

    constructor() {

        this.dimensiones = {
            '400x400' : .5,
            '200x200' : .5,
            '100x100' : .5,
            '50x50' :  .5,
        }

    }

    obtenerColor(){

        switch (this.producto.status) {
            case 1:
                return 'rgb(76, 175, 80)'
            case 2:
                return 'rgb(0, 188, 212)'
            case 3:
                return 'rgb(255, 193, 7)'
            case 4:
                return 'rgb(255, 152, 0)'
            case 5:
                return 'rgb(244, 67, 54)'
            case 6:
                return 'black'
            default:
        }
    }

    ngOnInit() {

        this.color = {
            'background-color' : this.obtenerColor()
        }

        PortadaService.xProducto(this.producto.id)
        .then(portadas => {
            this.portadas = portadas
            this.portada = portadas.find(n => n.dimension === '50x50')
            portadas.forEach(portada => {
                this.dimensiones[portada.dimension] = 1
            })
        })

        if(!_.isNull(this.producto.IdCategoria)) CategoriaService.one(this.producto.IdCategoria)
            .then(response => this.categoria = response)

        if(!_.isNull(this.producto.IdMarca)) MarcaService.one(this.producto.IdMarca)
            .then(response => this.marca = response)

        if(!_.isNull(this.producto.IdLinea)) LineaService.one(this.producto.IdLinea)
            .then(response => this.linea = response)

        if(!_.isNull(this.producto.IdGama)) GamaService.one(this.producto.IdGama)
            .then(response => this.gama = response)


    }


}
