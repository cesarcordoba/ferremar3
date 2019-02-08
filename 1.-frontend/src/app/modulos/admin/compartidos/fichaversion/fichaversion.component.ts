
    import { Component, Input, OnInit,  Output, EventEmitter  } from '@angular/core';


import { VersionService } from '../../../../servicios';
@Component({
  selector: 'fichaversion',
  templateUrl: './fichaversion.component.pug',
  styleUrls: ['./fichaversion.component.styl']
})
export class FichaversionComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() version : any
    @Input() producto : any

    @Output() recargar = new EventEmitter();

    constructor() {
    }

    ngOnInit() {

    }

    // recargar(){
    //
    // }

}
