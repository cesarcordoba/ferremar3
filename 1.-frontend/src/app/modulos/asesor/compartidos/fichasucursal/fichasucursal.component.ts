
    import { Component, Input, OnInit } from '@angular/core';


import { SucursalService } from '../../../../servicios';
@Component({
  selector: 'fichasucursal',
  templateUrl: './fichasucursal.component.pug',
  styleUrls: ['./fichasucursal.component.styl']
})
export class FichasucursalComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() sucursal


    constructor() {

    // SucursalService.one()
    // .then(response => this.sucursales = response)
    // .then(response => console.log(response))

  }

  ngOnInit() {

      console.log( this.sucursal  )

  }
}