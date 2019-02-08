
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

import { ProductoService } from '../../../../servicios';

import * as _ from 'lodash'


import { BuscarproductoComponent } from  '../buscarproducto/buscarproducto.component'
import { BuscarversionComponent } from  '../buscarversion/buscarversion.component'
import { AjustarcantidadComponent } from  '../ajustarcantidad/ajustarcantidad.component'

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
declare var $: any;

@Component({
  selector: 'paginacionproductospromos',
  templateUrl: './paginacionproductospromos.component.pug',
  styleUrls: ['./paginacionproductospromos.component.styl']
})
export class PaginacionproductospromosComponent implements OnInit, AfterViewInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() pasarPromo

    productos = {
        items : [],
        pagina : 0,
        paginas : 0
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

        this.promo.obtenerProductos()
        .then(response => response.filter(n => n.status === 1))
        .then(response => this.todos = response)
        .then(response => this.productos = {
            paginas : Math.round(this.todos.length / this.filtro.limite),
            items : _.chunk(this.todos, this.filtro.limite)[this.filtro.pagina - 1],
            pagina : 0,
        })
        .then(response => console.log(response))

        // ProductoService.paginacion(this.filtro)
        // .then(response => this.productos = response)
    }

    cambioPagina(ev){
        this.filtro.pagina = ev.pageIndex + 1
        this.productos.items = _.chunk(this.todos, this.filtro.limite)[this.filtro.pagina - 1]
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

    abrircantidad(){
        this.dialog.open(AjustarcantidadComponent, {
            position : {
                top : '25px'
            },
            width :  $(window).width() + 'px',
            height :  $(window).height() - 50 + 'px',
            maxWidth : $(window).width() - 50 + 'px',
            data :  this.promo
        }).afterClosed().subscribe(response => {

        });
    }

    abrirversiones(){
        this.dialog.open(BuscarversionComponent, {
            position : {
                top : '25px'
            },
            width :  $(window).width() + 'px',
            height :  $(window).height() - 50 + 'px',
            maxWidth : $(window).width() - 50 + 'px',
            data :  this.promo
        }).afterClosed().subscribe(response => {

        });
    }

    abrirproductos(){
        this.dialog.open(BuscarproductoComponent, {
            position : {
                top : '25px'
            },
            width :  $(window).width() + 'px',
            height :  $(window).height() - 50 + 'px',
            maxWidth : $(window).width() - 50 + 'px',
            data :  this.promo
        }).afterClosed().subscribe(response => {

        });
    }
}
