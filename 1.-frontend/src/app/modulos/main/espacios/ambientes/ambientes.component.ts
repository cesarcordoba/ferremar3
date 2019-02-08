import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AmbienteService, EspacioService } from '../../../../servicios';

@Component({
  selector: 'ambientes',
  templateUrl: './ambientes.component.pug',
  styleUrls: ['./ambientes.component.styl']
})
export class AmbientesComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    ambientes = {
        items : []
    }
    filtro : any;
    columnas = 4
    height = '200px'
    colspan = 1
    rowspan = 1

    constructor(public route : Router) {
        this.filtro = {
                pagina : 1,
                limite :  (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ?  12 :  6,
                order : ['id'],
                where : {},
                include : []
            }
    }

    ngOnInit() {
        this.obtener()
    }

    obtener(){
        AmbienteService.paginacion(this.filtro)
        .then(response => this.ambientes = response)
        .then(() => this.ambientes.items.forEach(ambiente => ambiente.obtenerEspacios()))
        .then(() => console.log(this.ambientes))

    }

    cambioPagina(ev){
        this.filtro.pagina = ev.pageIndex++
        this.obtener()
    }

    imprimir(){
        console.log(this)
    }

    ir(ambiente){
        console.log(ambiente)
        this.route.navigate(['espacio/' + ambiente.id ]
            // , { queryParams: { nombre: _.snakeCase(this.producto.nombre) } }
        )
    }



}
