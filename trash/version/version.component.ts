
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';


//    3
import { VersionService } from '../../../../../servicios';
@Component({
  selector: 'version',
  templateUrl: './version.component.pug',
  styleUrls: ['./version.component.styl']
})
export class VersionComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() version

    versiones: any
    opciones : any

    constructor() {

    // VersionService.obtener()
    // .then(response => this.versiones = response)
    // .then(response => console.log(response))

  }

  ngOnInit() {

      VersionService.opciones(this.version.id)
      .then(response => this.opciones = response)

  }
}
