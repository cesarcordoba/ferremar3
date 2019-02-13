
import { Component, OnInit, Input } from '@angular/core';
import { PortadaService } from '../../../../../servicios';
@Component({
  selector: 'portada',
  templateUrl: './portada.component.pug',
  styleUrls: ['./portada.component.styl']
})
export class PortadaComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() producto

    portadas: any = []

    constructor() {

    }

  ngOnInit() {

      PortadaService.xProducto(this.producto.id)
      .then(response => this.portadas = response)
      .then(response => console.log(response))

  }
}
