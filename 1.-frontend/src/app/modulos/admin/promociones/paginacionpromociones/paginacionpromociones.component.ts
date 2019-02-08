
import { Injectable, Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PromoService } from '../../../../servicios';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { isPlatformBrowser } from '@angular/common';
import { CrearpromocionComponent } from './crearpromocion/crearpromocion.component'
import * as _ from 'lodash'
declare var $: any;
//import * as $ from 'jquery';
// import 'fullcalendar';

@Component({
  selector: 'paginacionpromociones',
  templateUrl: './paginacionpromociones.component.pug',
  styleUrls: ['./paginacionpromociones.component.styl']
})
export class PaginacionpromocionesComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    promos = {
        items : [],
        pagina : 0,
        paginas : 0
    }
    filtro : any;

    colores  = [ '#F44336', '#E91E63' , '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800' ]

    constructor(public route : Router, private dialog: MatDialog, @Inject(PLATFORM_ID) private platformId: Object) {
        this.filtro = {
                pagina : 1,
                limite :  (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ?  10 :  3,
                order : ['id'],
                where : {},
                include : []
            }
        this.obtener()
        this.dibujarCalendario()

    }

    dibujarCalendario(){

    // if (isPlatformBrowser(this.platformId)) {
        var self = this

        //$(function() {

        let containerEl = $('#calendar');

        console.log(containerEl)

        containerEl.fullCalendar({
            height: 500,
            dayClick: function(date, jsEvent, view) {},
            events: self.promos.items.map(e => new Object({
                start : e.inicio,
                end : e.final,
                title : e.nombre,
                backgroundColor : '#03A9F4',
                // dow : e.dias.map(n => n.index),
                ranges: [{
                    start: e.inicio,
                    end: e.final
                }]
            })),
            //
            // eventRender: function(eventObj, $el) {
            //     $el.popover({
            //         title: eventObj.nombre,
            //         // content: eventObj.description,
            //         trigger: 'hover',
            //         placement: 'top',
            //         container: 'body'
            //     });
            // },
            eventRender: function(event, element, view){


                // element.popover({
                //     title: event.nombre,
                //     // content: eventObj.description,
                //     trigger: 'hover',
                //     placement: 'top',
                //     container: 'body'
                // });

        	return (event.ranges.filter(function(range){
          	  return (event.start.isBefore(range.end) &&
             	       event.end.isAfter(range.start));
        		}).length) > 0;
        	}
        });
        //});

        // }
    }

    obtener(){
        PromoService.paginacion(this.filtro)
        .then(response => this.promos = response)
        .then(() => console.log(this.promos))
    }

    cambioPagina(ev){
      this.filtro.pagina = ev.pageIndex + 1
      this.obtener()
    }

    crearPromocion(){

      this.dialog.open(CrearpromocionComponent, {
          position : {
              top : '25px'
          },
          width :  '600px',
          height :  '200px',
          data :  {}
      }).afterClosed().subscribe(response => {
          if(!_.isUndefined(response)) PromoService.crear({nombre : response, status : 0})
          .then(response => this.obtener())
      });


    }

    ngOnInit() {}

    ir(promo){
        this.route.navigate(['admin/promocion/' + promo.id ]
          // , { queryParams: { nombre: _.snakeCase(this.producto.nombre) } }
        )
    }

}
