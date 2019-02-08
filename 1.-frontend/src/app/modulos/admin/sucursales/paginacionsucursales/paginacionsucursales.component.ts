
import { Component, OnInit } from '@angular/core';

import { SucursalService } from '../../../../servicios';
@Component({
  selector: 'paginacionsucursales',
  templateUrl: './paginacionsucursales.component.pug',
  styleUrls: ['./paginacionsucursales.component.styl']
})
export class PaginacionsucursalesComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}



    sucursales = {
        items : [],
        pagina : 0,
        paginas : 0
    }
    filtro : any;

    constructor() {
        this.filtro = {
                pagina : 1,
                limite :  (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ?  10 :  3,
                order : ['id'],
                where : {},
                include : []
            }
        this.obtener()
    }

    obtener(){



    SucursalService.paginacion(this.filtro)
    .then(response => this.sucursales = response)


  }

  cambioPagina(ev){
      this.filtro.pagina = ev.pageIndex + 1
      this.obtener()
  }

  ngOnInit() {



  }
}