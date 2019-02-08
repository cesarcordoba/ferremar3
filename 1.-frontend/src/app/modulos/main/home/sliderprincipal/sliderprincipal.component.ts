
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sliderprincipal',
  templateUrl: './sliderprincipal.component.pug',
  styleUrls: ['./sliderprincipal.component.styl']
})
export class SliderprincipalComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}


    constructor() {

  }

  ngOnInit() {



  }
}