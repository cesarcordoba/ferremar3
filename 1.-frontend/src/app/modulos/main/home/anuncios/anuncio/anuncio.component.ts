
import { Component, OnInit, Input } from '@angular/core';
import { Anuncio } from '../../../../../modelos';

@Component({
  selector: 'anuncio',
  templateUrl: './anuncio.component.pug',
  styleUrls: ['./anuncio.component.styl']
})
export class AnuncioComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() anuncio : Anuncio

    carteles : any[]
    cartel : any

    constructor() {

    }

  ngOnInit() {

      this.anuncio.obtenerCarteles()
      .then((carteles : any) => {
          this.cartel = carteles.find(n => n.tamano === '1000x250')
      })


  }
}
