
import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../../../servicios';
@Component({
  selector: 'paginacionusuarios',
  templateUrl: './paginacionusuarios.component.pug',
  styleUrls: ['./paginacionusuarios.component.styl']
})
export class PaginacionusuariosComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}



    usuarios = {
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



    UsuarioService.paginacion(this.filtro)
    .then(response => this.usuarios = response)


  }

  cambioPagina(ev){
      this.filtro.pagina = ev.pageIndex + 1
      this.obtener()
  }

  ngOnInit() {



  }
}