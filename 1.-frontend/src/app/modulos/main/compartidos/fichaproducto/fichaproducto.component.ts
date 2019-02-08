
import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ProductoService, MarcaService } from '../../../../servicios';
import {  BehaviorSubject, Observable  } from 'rxjs'
import { Version } from '../../../../modelos';
declare var $: any;
@Component({
  selector: 'fichaproducto',
  templateUrl: './fichaproducto.component.pug',
  styleUrls: ['./fichaproducto.component.styl']
})
export class FichaproductoComponent implements OnInit, AfterViewInit {

    borde = true ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() producto
    @Input() tipo: boolean = false;

    versiones : any = []
    portadas : any = []
    pasarPromociones : BehaviorSubject<any>
    promociones : any = []
    marca : any
    colores : any = []

    colspan = 1
    rowspan = 1

    mobile = (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))

    medida : any

    portada : any

    // @ViewChild('producto') el

    constructor() {



    // ProductoService.one()
    // .then(response => this.productos = response)
    // .then(response => console.log(response))

        this.pasarPromociones = new BehaviorSubject([]);

    }


    cambiar(){

        this.producto.colspan = 2
        this.producto.rowspan = 2
    }

    imprimir(){

    }

    altura(){

        this.medida = {
            grid : $('mat-grid-list').width() / 6,
            titulo :  $('.titulo' ).height(),
            versiones : (30 * this.versiones.length )
        }

        let height = ( this.medida.grid + this.medida.titulo + this.medida.versiones ) / 10
        this.producto.colspan = 1
        this.producto.rowspan = height

        // this.forma.height = !mobile ? 17 : ( 40 + $('md-grid-tile').width() + $('.titulo' ).height() + (30 * this.versiones )) /  parseFloat(self.productos.height[Resolucion.obtener()])

    }


    ngOnInit() {

        ProductoService.versionesdisponibles(this.producto.id)
        .then(response => this.versiones = response.map(n => new Version(n)))
        .then(response => this.altura())

        ProductoService.portadas(this.producto.id)
        .then(portadas => {
            this.portada = portadas.find(n => n.dimension === '200x200')
        })

        ProductoService.promos(this.producto.id)
        .then(response => this.promociones = response.filter(n => n.status === 1))
        .then(response => this.pasarPromociones.next(response))

        ProductoService.colores(this.producto.id)
        .then(response => this.colores = response)

        MarcaService.one(this.producto.IdMarca)
        .then(response => this.marca = response)

    }

    ngAfterViewInit(){

        const self = this

        $(window).on("resize", function() {
            self.altura()
        });

    }


}
