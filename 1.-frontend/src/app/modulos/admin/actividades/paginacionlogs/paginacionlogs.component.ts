
import { Component, OnInit } from '@angular/core';
import { LogService } from '../../../../servicios';

@Component({
  selector: 'paginacionlogs',
  templateUrl: './paginacionlogs.component.pug',
  styleUrls: ['./paginacionlogs.component.styl']
})
export class PaginacionlogsComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}



    logs = {
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

        LogService.paginacion(this.filtro)
        .then(response => this.logs = response)
        .then(logs => logs.items.forEach(n => n.obtenerUsuario()))
        .then(response => console.log(this.logs))

    }

    cambioPagina(ev){
        this.filtro.pagina = ev.pageIndex + 1
        this.obtener()
    }

    ngOnInit() {

    }
}
