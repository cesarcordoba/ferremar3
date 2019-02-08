import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdenService, AuthService } from '../../../../servicios';

@Component({
  selector: 'paginacionpedidos',
  templateUrl: './paginacionpedidos.component.pug',
  styleUrls: ['./paginacionpedidos.component.styl']
})
export class PaginacionpedidosComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    ordenes = {
        items : [],
        pagina : 0,
        paginas : 0
    }
    filtro : any;
    usuario : any

    constructor(public route : Router, private us: AuthService) {
        this.filtro = {
                pagina : 1,
                limite :  (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ?  10 :  3,
                order : ['id'],
                where : {},
                include : []
            }


    }

    obtener(){

        OrdenService.paginacion(this.filtro)
        .then(response => this.ordenes = response)
        .then(() => {
            if(this.ordenes.items.length > 0){
                this.ordenes.items.forEach(orden => {
                    orden.obtenerSucursal()
                    orden.obtenerDireccion()
                    orden.obtenerTarjeta()
                    orden.obtenerUsuario()
                    orden.obtenerTransacciones()
                })
                console.log(this.ordenes)
            }
        })

  }

    cambioPagina(ev){
        this.filtro.pagina = ev.pageIndex + 1
        this.obtener()
    }

    ngOnInit() {
        this.us.obtenerUsuario().subscribe(user => {
            this.usuario = user
            this.filtro.where.IdSucursal = this.usuario.IdSucursal
            this.obtener()
        })
    }


    ir(pedido){
        this.route.navigate(['asesor/pedido/' + pedido.id ]
          // , { queryParams: { nombre: _.snakeCase(this.producto.nombre) } }
        )
    }

}
