
import { Component, OnInit } from '@angular/core';
import { Title , Meta }     from '@angular/platform-browser';
import { ActivatedRoute} from '@angular/router'
import {  BehaviorSubject, Observable  } from 'rxjs'
import {MatChipInputEvent} from '@angular/material';

import { MarcaService, MargenService } from '../../../servicios';
@Component({
  selector: 'perfilmarca',
  templateUrl: './perfilmarca.component.pug',
  styleUrls: [
      './perfilmarca.component.styl'
  ]
})
export class PerfilmarcaComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}
    //
    pasarMarca : BehaviorSubject<any>

    servicio : any

    marca: any = {}

    margenes : any = []

    constructor(public route : ActivatedRoute, private titleService: Title, private meta : Meta ) {

        this.pasarMarca = new BehaviorSubject(false);

        this.servicio = MarcaService

        route.params.subscribe(async (res) =>
            MarcaService.one(Number(res.id))
            .then(response => this.marca = response)
            .then(response => {


                this.marca.obtenerMargenes()
                .then(response => this.margenes = response)
                .then((response) => console.log(response))
                this.pasarMarca.next(response);

                this.titleService.setTitle( this.marca.nombre );
            // this.meta.updateTag({ name: 'description', content: _.replace( this.proyecto.resumen, '<p>', '')  })
            // this.meta.updateTag({ name: 'keywords', content: 'pagina web, presupuesto web, cotizador online, cotizador paginas web, presupuesto tienda online,' + this.proyecto.nombre })

        }))


      }

  ngOnInit() {}

  add(event: MatChipInputEvent): void {

    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {

        MargenService.crear({cantidad: value.trim()})
        .then(margen => MarcaService.ligarmargen(this.marca.id, margen.id))

      this.margenes.push({cantidad: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(margen): void {

      MargenService.eliminar(margen.id)


    const index = this.margenes.indexOf(margen);

    if (index >= 0) {
      this.margenes.splice(index, 1);
    }
  }
}
