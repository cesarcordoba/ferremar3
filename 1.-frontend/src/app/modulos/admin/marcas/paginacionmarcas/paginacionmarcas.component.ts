
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MarcaService } from '../../../../servicios';
@Component({
  selector: 'paginacionmarcas',
  templateUrl: './paginacionmarcas.component.pug',
  styleUrls: ['./paginacionmarcas.component.styl']
})
export class PaginacionmarcasComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}



    marcas = {
        items : [],
        pagina : 0,
        paginas : 0
    }
    filtro : any;

    constructor(public route : Router) {
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



    MarcaService.paginacion(this.filtro)
    .then(response => this.marcas = response)


  }

  cambioPagina(ev){
      this.filtro.pagina = ev.pageIndex + 1
      this.obtener()
  }

  ngOnInit() {



  }

  ir(marca){
      this.route.navigate(['admin/marca/' + marca.id ]
        // , { queryParams: { nombre: _.snakeCase(this.producto.nombre) } }
      )
  }
}
