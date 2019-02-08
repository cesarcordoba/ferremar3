
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { EspacioService } from '../../../../../../servicios';

@Component({
  selector: 'espacio',
  templateUrl: './espacio.component.pug',
  styleUrls: ['./espacio.component.styl'],
})
export class EspacioComponent implements OnInit {

    borde = true ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() ambiente

    imagen : any
    espacio : any

    constructor() {

    }

    ngOnInit() {

        EspacioService.one(this.ambiente.id)
        .then(response => this.espacio = response )
        // .then(response => console.log(response))

    }
}
