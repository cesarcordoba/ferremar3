
import { Component, OnInit } from '@angular/core';
import { Title , Meta }     from '@angular/platform-browser';
import { ActivatedRoute} from '@angular/router'
import {  BehaviorSubject, Observable  } from 'rxjs'

import { OrdenService } from '../../../servicios';
@Component({
  selector: 'perfilpedido',
  templateUrl: './perfilpedido.component.pug',
  styleUrls: [
      './perfilpedido.component.styl'
  ]
})
export class PerfilpedidoComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}
    //
    // pasarOrden : BehaviorSubject<any>



    orden: any = {}

    constructor(public route : ActivatedRoute, private titleService: Title, private meta : Meta ) {


    route.params.subscribe(async (res) =>
        OrdenService.one(Number(res.id))
        .then(response => this.orden = response)
        .then(response => {

            console.log(response)

            // this.pasarOrden.next(response);

            this.titleService.setTitle( this.orden.nombre );
        // this.meta.updateTag({ name: 'description', content: _.replace( this.proyecto.resumen, '<p>', '')  })
        // this.meta.updateTag({ name: 'keywords', content: 'pagina web, presupuesto web, cotizador online, cotizador paginas web, presupuesto tienda online,' + this.proyecto.nombre })

    }))


  }

  ngOnInit() {



  }
}
