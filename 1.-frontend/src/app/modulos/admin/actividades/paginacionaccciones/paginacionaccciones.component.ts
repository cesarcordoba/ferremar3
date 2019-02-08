
import { Component, OnInit } from '@angular/core';

import { AccionService } from '../../../../servicios';
@Component({
  selector: 'paginacionaccciones',
  templateUrl: './paginacionaccciones.component.pug',
  styleUrls: ['./paginacionaccciones.component.styl']
})
export class PaginacionacccionesComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}



    acciones = {
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

        AccionService.paginacion(this.filtro)
        .then(response => this.acciones = response)
        .then(acciones => acciones.items.forEach(accion => accion.obtenerUsuario()))

    }

  cambioPagina(ev){
      this.filtro.pagina = ev.pageIndex + 1
      this.obtener()
  }

  ngOnInit() {



  }
}
