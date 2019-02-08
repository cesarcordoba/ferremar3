
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

import { OfertaService, ProductoService } from '../../../../servicios';

import * as _ from 'lodash'

import { BuscarproductoComponent } from  '../buscarproducto/buscarproducto.component'
import { BuscarversionComponent } from  '../buscarversion/buscarversion.component'
import { AjustarcantidadComponent } from  '../ajustarcantidad/ajustarcantidad.component'

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
declare var $: any;
@Component({
  selector: 'paginacionoferta',
  templateUrl: './paginacionoferta.component.pug',
  styleUrls: ['./paginacionoferta.component.styl']
})
export class PaginacionofertaComponent implements OnInit, AfterViewInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

      @Input() pasarPromo

    ofertas = {
        items : [],
        pagina : 0,
        paginas : 0
    }
    filtro : any;

    todos : any

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


        this.promo.obtenerOfertas()
        .then(response => this.todos = response)
        .then(response => this.ofertas = {
            paginas : Math.round(this.todos.length / this.filtro.limite),
            items : _.chunk(this.todos, this.filtro.limite)[this.filtro.pagina - 1],
            pagina : 0,
        })
        .then(() => this.todos.forEach(producto => {
            producto.obtenerEntrantes()
            producto.obtenerSalientes()
        }))
        .then(() => console.log(this.todos))

  }

  cambioPagina(ev){
      this.filtro.pagina = ev.pageIndex + 1
      this.ofertas.items = _.chunk(this.todos, this.filtro.limite)[this.filtro.pagina - 1]
  }

  ngOnInit() {



  }

    ngAfterViewInit(){
      this.pasarPromo.subscribe((value) => {
          if(_.isObject(value)){
              this.promo = value
              console.log(value)
              this.obtener()
          }
      })
    }

    crearOferta(){
        OfertaService.crear({IdPromo : this.promo.id})
        .then(() => this.obtener())
    }

    eliminarOferta(oferta){
        OfertaService.eliminar(oferta.id)
        .then(() => this.obtener())
    }

    crear(oferta, tipo){
        console.log(tipo)
        this.abrirproductos(oferta, tipo)
    }

    eliminar(oferta, item, tipo){

        OfertaService['desligar' + tipo](oferta.id, item.id)
        .then(() => this.obtener())
    }

    abrircantidad(oferta, tipo, version){
        this.dialog.open(AjustarcantidadComponent, {
            position : {
                top : '25px'
            },
            width :  '600px',
            height :  '200px',
            maxWidth : '600px',
            data :  this.promo
        }).afterClosed().subscribe(response => {
            console.log(response)
            OfertaService['ligar' + tipo ](oferta.id, version.id, { cantidad : response})
            .then(response => this.obtener())
        });
    }

    abrirversiones(oferta, tipo, producto){


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
                this.abrircantidad(oferta, tipo, version)
            });
        })

    }

    abrirproductos(oferta, tipo){
        this.dialog.open(BuscarproductoComponent, {
            position : {
                top : '25px'
            },
            width :  $(window).width() + 'px',
            height : '200px',
            maxWidth : '600px',
            data :  this.promo
        }).afterClosed().subscribe(producto => {
            if(_.isObject(producto)) this.abrirversiones(oferta, tipo, producto)
        });
    }
}
