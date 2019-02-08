
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnuncioService } from '../../../../servicios';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
//
import { CrearanuncioComponent } from './crearanuncio/crearanuncio.component'

@Component({
  selector: 'paginacionanuncios',
  templateUrl: './paginacionanuncios.component.pug',
  styleUrls: ['./paginacionanuncios.component.styl']
})
export class PaginacionanunciosComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}



    anuncios = { 
        items : [],
        pagina : 0,
        paginas : 0
    }
    filtro : any;


    constructor(public route : Router, private dialog: MatDialog ) {
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
        AnuncioService.paginacion(this.filtro)
        .then(response => this.anuncios = response)
    }

  cambioPagina(ev){
      this.filtro.pagina = ev.pageIndex + 1
      this.obtener()
  }

  ngOnInit() {



  }

  crear(){



      this.dialog.open(CrearanuncioComponent, {
          position : {
              top : '25px'
          },
          width :  '600px',
          height :  '200px',
          data :  {}
      }).afterClosed().subscribe(response => {
             AnuncioService.crear({nombre : response, status : 0})
             .then(res => this.obtener())
      });


  }

  ir(anuncio){
      this.route.navigate(['admin/anuncio/' + anuncio.id ]
        // , { queryParams: { nombre: _.snakeCase(this.producto.nombre) } }
      )
  }
}
