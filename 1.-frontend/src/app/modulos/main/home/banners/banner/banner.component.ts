
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.pug',
  styleUrls: ['./banner.component.styl']
})
export class BannerComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}


    constructor() {

  }

  ngOnInit() {



  }
}