
import { Component, OnInit } from '@angular/core';
import { Title , Meta }     from '@angular/platform-browser';
import { ActivatedRoute} from '@angular/router'
import {  BehaviorSubject, Observable  } from 'rxjs'

import { AnuncioService } from '../../../servicios';
@Component({
  selector: 'perfilanuncio',
  templateUrl: './perfilanuncio.component.pug',
  styleUrls: [
      './perfilanuncio.component.styl'
  ]
})
export class PerfilanuncioComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}
    //
    // pasarAnuncio : BehaviorSubject<any>



    anuncio: any = {}

    constructor(public route : ActivatedRoute, private titleService: Title, private meta : Meta ) {


    route.params.subscribe(async (res) =>
        AnuncioService.one(Number(res.id))
        .then(response => this.anuncio = response)
        .then(response => {

            console.log(response)

            // this.pasarAnuncio.next(response);

            this.titleService.setTitle( this.anuncio.nombre );
        // this.meta.updateTag({ name: 'description', content: _.replace( this.proyecto.resumen, '<p>', '')  })
        // this.meta.updateTag({ name: 'keywords', content: 'pagina web, presupuesto web, cotizador online, cotizador paginas web, presupuesto tienda online,' + this.proyecto.nombre })

    }))


  }

  ngOnInit() {



  }
}