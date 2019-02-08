
import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { ProductoService } from '../../../../../servicios';

import * as _ from 'lodash'

@Component({
  selector: 'gama',
  templateUrl: './gama.component.pug',
  styleUrls: ['./gama.component.styl']
})
export class GamaComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() gama

    portadas: any = []

    constructor(public route : Router) {


    }

    ir(){
        this.route.navigate(['producto/' + this.gama.id ], { queryParams: { nombre: _.snakeCase(this.gama.nombre) } } )
    }

    ngOnInit() {

        ProductoService.portadas(this.gama.id)
        .then(response => this.portadas = response)

    }

}
