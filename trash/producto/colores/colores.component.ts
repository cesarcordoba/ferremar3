
    import { Component, Input, OnInit } from '@angular/core';



import { ColorService } from '../../../../../servicios';
@Component({
  selector: 'colores',
  templateUrl: './colores.component.pug',
  styleUrls: ['./colores.component.styl']
})
export class ColoresComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() undefined



    colores: any

    constructor() {

    // ColorService.one()
    // .then(response => this.colores = response)
    // .then(response => console.log(response))

  }

  ngOnInit() {



  }
}