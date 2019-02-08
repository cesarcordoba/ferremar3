
    import { Component, Input, OnInit } from '@angular/core';



import { AmbienteService } from '../../../../servicios';
@Component({
  selector: 'fichaambiente',
  templateUrl: './fichaambiente.component.pug',
  styleUrls: ['./fichaambiente.component.styl']
})
export class FichaambienteComponent implements OnInit {

    @Input() ambiente


    constructor() {

    // AmbienteService.one()
    // .then(response => this.ambientes = response)
    // .then(response => console.log(response))

  }

  ngOnInit() {

      console.log( this.ambiente  )

  }
}
