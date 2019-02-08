
import { Component, OnInit } from '@angular/core';


//    4
import { ExistenciaService } from '../../../../../../servicios';
@Component({
  selector: 'existencia',
  templateUrl: './existencia.component.pug',
  styleUrls: ['./existencia.component.styl']
})
export class ExistenciaComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}



    existencias: any

    constructor() {
    // 
    // ExistenciaService.obtener()
    // .then(response => this.existencias = response)
    // .then(response => console.log(response))

  }

  ngOnInit() {



  }
}
