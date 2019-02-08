
import { Component, OnInit } from '@angular/core';
import { Title , Meta }     from '@angular/platform-browser';
import { ActivatedRoute} from '@angular/router'
import {  BehaviorSubject, Observable  } from 'rxjs'

import { EspacioService } from '../../../servicios';
@Component({
  selector: 'perfilespacio',
  templateUrl: './perfilespacio.component.pug',
  styleUrls: [
      './perfilespacio.component.styl'
  ]
})
export class PerfilespacioComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}
    //
    // pasarEspacio : BehaviorSubject<any>



    espacio: any = {}

    constructor(public route : ActivatedRoute, private titleService: Title, private meta : Meta ) {


    route.params.subscribe(async (res) =>
        EspacioService.one(Number(res.id))
        .then(response => this.espacio = response)
        .then(response => {

            console.log(response)

            // this.pasarEspacio.next(response);

            this.titleService.setTitle( this.espacio.nombre );
        // this.meta.updateTag({ name: 'description', content: _.replace( this.proyecto.resumen, '<p>', '')  })
        // this.meta.updateTag({ name: 'keywords', content: 'pagina web, presupuesto web, cotizador online, cotizador paginas web, presupuesto tienda online,' + this.proyecto.nombre })

    }))


  }

  ngOnInit() {



  }
}