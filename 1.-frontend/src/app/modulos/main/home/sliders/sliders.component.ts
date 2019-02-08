
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sliders',
  templateUrl: './sliders.component.pug',
  styleUrls: ['./sliders.component.styl']
})
export class SlidersComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}


    constructor() {

  }

  ngOnInit() {



  }
}