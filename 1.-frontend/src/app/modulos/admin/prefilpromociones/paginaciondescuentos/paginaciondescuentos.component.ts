
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

import { DescuentoService, ProductoService } from '../../../../servicios';

import * as _ from 'lodash'

import { BuscarproductoComponent } from  '../buscarproducto/buscarproducto.component'
import { BuscarversionComponent } from  '../buscarversion/buscarversion.component'
import { AjustarcantidadComponent } from  '../ajustarcantidad/ajustarcantidad.component'

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
declare var $: any;
@Component({
  selector: 'paginaciondescuentos',
  templateUrl: './paginaciondescuentos.component.pug',
  styleUrls: ['./paginaciondescuentos.component.styl']
})
export class PaginaciondescuentosComponent implements OnInit, AfterViewInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

      @Input() pasarPromo

    descuentos = {
        items : [],
        pagina : 0,
        paginas : 0,
    }
    filtro : any;

        todos : any  = []

    promo : any

    constructor(private dialog: MatDialog) {
        this.filtro = {
                pagina : 1,
                limite :  (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ?  10 :  3,
                order : ['id'],
                where : {},
                include : []
            }

    }

    obtener(){
        this.promo.obtenerDescuentos()
        .then(response => this.todos = response)
        .then(response => this.descuentos = {
            paginas : Math.round(this.todos.length / this.filtro.limite),
            items : _.chunk(this.todos, this.filtro.limite)[this.filtro.pagina - 1],
            pagina : 0,
        })
        .then(() => this.todos.forEach(producto => {
            producto.obtenerVersiones()
        }))
        .then(response => console.log(this.todos))
    }

    cambioPagina(ev){
        this.filtro.pagina = ev.pageIndex + 1
        this.descuentos.items = _.chunk(this.todos, this.filtro.limite)[this.filtro.pagina - 1]
    }

    ngOnInit() {}

    ngAfterViewInit(){
        this.pasarPromo.subscribe((value) => {
            if(_.isObject(value)){

                this.promo = value
                this.obtener()

             }
        })
    }

    eliminar(descuento){
        DescuentoService.eliminar(descuento.id)
        .then(() => this.obtener())
    }

    desligarversion(descuento, version){
        DescuentoService.desligarversion(descuento.id, version.id)
        .then(() => this.obtener())
    }

    abrircantidad(){
        this.dialog.open(AjustarcantidadComponent, {
            position : {
                top : '25px'
            },
            width :  '600px',
            height :  '200px',
            maxWidth : '600px',
            data :  this.promo
        }).afterClosed().subscribe(cantidad => {
            DescuentoService.crear({cantidad : cantidad, IdPromo : this.promo.id})
            .then(() => this.obtener())
        });
    }

    abrirversiones(descuento, producto){


        ProductoService.versiones(producto.id)
        .then(versiones => {

            console.log(versiones)
            this.dialog.open(BuscarversionComponent, {
                position : {
                    top : '25px'
                },
                width :  $(window).width() + 'px',
                height : 200 + versiones.length * 40 + 'px',
                maxWidth : '600px',
                data :  versiones
            }).afterClosed().subscribe(version => {

                DescuentoService.ligarversion(descuento.id, version.id)
                .then(response => this.obtener())

            });
        })

    }

    abrirproductos(descuento){
        this.dialog.open(BuscarproductoComponent, {
            position : {
                top : '25px'
            },
            width :  $(window).width() + 'px',
            height : '200px',
            maxWidth : '600px',
            data :  this.promo
        }).afterClosed().subscribe(producto => {
            console.log(producto)
            this.abrirversiones(descuento, producto)
        });
    }

}
