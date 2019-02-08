
import { Component, OnInit } from '@angular/core';
import { Title , Meta }     from '@angular/platform-browser';
import { ActivatedRoute} from '@angular/router'
import {  BehaviorSubject, Observable  } from 'rxjs'

import { TutorialService } from '../../../servicios';
@Component({
  selector: 'perfiltutoriales',
  templateUrl: './perfiltutoriales.component.pug',
  styleUrls: [
      './perfiltutoriales.component.styl'
  ]
})
export class PerfiltutorialesComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}
    //
    // pasarTutorial : BehaviorSubject<any>



    tutorial: any = {}

    constructor(public route : ActivatedRoute, private titleService: Title, private meta : Meta ) {


    route.params.subscribe(async (res) =>
        TutorialService.one(Number(res.id))
        .then(response => this.tutorial = response)
        .then(response => {

            console.log(response)

            // this.pasarTutorial.next(response);

            this.titleService.setTitle( this.tutorial.nombre );
        // this.meta.updateTag({ name: 'description', content: _.replace( this.proyecto.resumen, '<p>', '')  })
        // this.meta.updateTag({ name: 'keywords', content: 'pagina web, presupuesto web, cotizador online, cotizador paginas web, presupuesto tienda online,' + this.proyecto.nombre })

    }))


  }

  ngOnInit() {



  }
}