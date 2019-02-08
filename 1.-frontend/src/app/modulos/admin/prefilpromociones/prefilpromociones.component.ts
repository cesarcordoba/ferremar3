
import { Component, OnInit } from '@angular/core';
import { Title , Meta }     from '@angular/platform-browser';
import { ActivatedRoute} from '@angular/router'
import {  BehaviorSubject, Observable  } from 'rxjs'

import { PromoService } from '../../../servicios';

import { BuscarproductoComponent } from  './buscarproducto/buscarproducto.component'
import { BuscarversionComponent } from  './buscarversion/buscarversion.component'
import { AjustarcantidadComponent } from  './ajustarcantidad/ajustarcantidad.component'

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
declare var $: any;
@Component({
  selector: 'prefilpromociones',
  templateUrl: './prefilpromociones.component.pug',
  styleUrls: [
      './prefilpromociones.component.styl'
  ]
})
export class PrefilpromocionesComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    pasarPromo : BehaviorSubject<any>

    promo: any = {}

    constructor(private dialog: MatDialog, public route : ActivatedRoute, private titleService: Title, private meta : Meta ) {

        this.pasarPromo = new BehaviorSubject(false);

        route.params.subscribe(async (res) =>
            PromoService.one(Number(res.id))
            .then(response => this.promo = response)
            .then(response => {

                this.promo = response

                this.pasarPromo.next(response);

                this.titleService.setTitle( this.promo.nombre );
            // this.meta.updateTag({ name: 'description', content: _.replace( this.proyecto.resumen, '<p>', '')  })
            // this.meta.updateTag({ name: 'keywords', content: 'pagina web, presupuesto web, cotizador online, cotizador paginas web, presupuesto tienda online,' + this.proyecto.nombre })

        }))

  }

  ngOnInit() {}

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
