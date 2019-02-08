
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { ProductoService } from '../../../../../servicios';
import * as _ from 'lodash'

@Component({
  selector: 'linea',
  templateUrl: './linea.component.pug',
  styleUrls: ['./linea.component.styl']
})
export class LineaComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() linea


    portadas: any

    constructor(public route : Router) {


    }

    ir(){
        this.route.navigate(['producto/' + this.linea.id ], { queryParams: { nombre: _.snakeCase(this.linea.nombre) } } )
    }

    ngOnInit() {

        ProductoService.portadas(this.linea.id)
        .then(response => this.portadas = response)

    }
}
