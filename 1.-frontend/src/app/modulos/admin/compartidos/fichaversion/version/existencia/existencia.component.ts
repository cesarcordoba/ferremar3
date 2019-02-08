
import { Component, OnInit, Input } from '@angular/core';


//    4
import { ExistenciaService, InventarioService } from '../../../../../../servicios';
@Component({
  selector: 'existencia',
  templateUrl: './existencia.component.pug',
  styleUrls: ['./existencia.component.styl']
})
export class ExistenciaComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() sucursal
    @Input() usuario? : any

    existencias: any

    constructor() {

        // ExistenciaService.obtener()
        // .then(response => this.existencias = response)
        // .then(response => console.log(response))

    }

    ngOnInit() {

        InventarioService.existencias(this.sucursal.Inventario.id)
        .then(response => this.existencias = response)

    }
}
