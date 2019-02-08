
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'banners',
  templateUrl: './banners.component.pug',
  styleUrls: ['./banners.component.styl']
})
export class BannersComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}


    constructor() {

  }

  ngOnInit() {



  }
}