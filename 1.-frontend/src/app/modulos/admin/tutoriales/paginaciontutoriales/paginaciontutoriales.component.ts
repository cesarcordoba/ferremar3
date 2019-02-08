
import { Component, OnInit } from '@angular/core';

import { TutorialService } from '../../../../servicios';
@Component({
  selector: 'paginaciontutoriales',
  templateUrl: './paginaciontutoriales.component.pug',
  styleUrls: ['./paginaciontutoriales.component.styl']
})
export class PaginaciontutorialesComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}



    tutoriales = {
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



    TutorialService.paginacion(this.filtro)
    .then(response => this.tutoriales = response)


  }

  cambioPagina(ev){
      this.filtro.pagina = ev.pageIndex + 1
      this.obtener()
  }

  ngOnInit() {



  }
}