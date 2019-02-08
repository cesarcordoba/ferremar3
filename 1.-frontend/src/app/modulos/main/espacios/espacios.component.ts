
import { Component, OnInit } from '@angular/core';
import { Title , Meta }     from '@angular/platform-browser';

@Component({
  selector: 'espacios',
  templateUrl: './espacios.component.pug',
  styleUrls: [
      './espacios.component.styl'
  ]
})
export class EspaciosComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}




    constructor(private  titleService: Title , private meta : Meta) {
        this.titleService.setTitle( 'Espacios para tu hogas' );
        this.meta.updateTag({ name: 'description', content: 'Descubre una variedad de ideas para tu sala, cocina o cualquier lugar de tu hogar'})
        this.meta.updateTag({ name: 'keywords', content: 'Ambientes, Azulejos, Cocina, Casa' })
    }

  ngOnInit() {

    console.log( this.borde )

  }
}
