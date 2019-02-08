
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../../servicios';

import * as _ from 'lodash'

@Component({
  selector: 'gridasesores',
  templateUrl: './gridasesores.component.pug',
  styleUrls: ['./gridasesores.component.styl']
})
export class GridasesoresComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}



    usuarios = {
        items : []
    }
    filtro : any;
    columnas = 4
    height = '300px'
    colspan = 1
    rowspan = 1


    constructor(public route : Router) {
        this.filtro = {
                pagina : 1,
                limite :  (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ?  20 :  3,
                order : ['id'],
                where : {
                    tipo : 'asesor'
                },
                include : []
            }

    UsuarioService.paginacion(this.filtro)
    .then(response => this.usuarios = response)
    .then(usuarios => {
        console.log(usuarios)
        usuarios.items.forEach(usuario => {
            usuario.obtenerAvatares()
            usuario.obtenerLogs()
            usuario.obtenerSucursal()
        })
    })

  }

    ngOnInit() {
    }

    ir(asesor){
        this.route.navigate(['admin/asesor/' + asesor.id ]
          // , { queryParams: { nombre: _.snakeCase(this.producto.nombre) } }
        )
    }

    fijarPortada(avatares){
      if(_.isArray(avatares)){
          let avatar = avatares.find(avatar => avatar.width === 100)
          return !_.isUndefined(avatar) ? avatar.link : 'assets/avatar.png'
      }
    }

    fijarLog(logs){
      if(_.isArray(logs)){
          return !_.isUndefined(_.last(logs)) ? _.last(logs).createdAt : null

      }
    }
}
