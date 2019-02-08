
import { Component, OnInit } from '@angular/core';
import { OrdenService, AuthService } from '../../../../servicios';
import { Usuario } from '../../../../modelos';
import { Router, ActivatedRoute } from '@angular/router';


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
    proceso : any = ''
    usuario : Usuario

    constructor(
        private router: Router,
        private us: AuthService
    ) {
        this.filtro = {
                pagina : 1,
                limite :  (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ?  10 :  3,
                order : ['id'],
                where : {},
                include : []
            }

        this.us.obtenerUsuario()
        .subscribe(usuario => {
			this.usuario = usuario
            this.filtro.where.IdUsuario = usuario.id
            this.obtener()

		})

    }

    obtener(){

        OrdenService.paginacion(this.filtro)
        .then(response => this.ordenes = response)
        .then(response => Promise.all([
            response.items.map(async (orden) => Promise.all([
                orden.obtenerTransacciones().then(transacciones =>
                    Promise.all(
                        transacciones.map( async (transaccion) => Promise.all([
                                transaccion.obtenerPromo(),
                                transaccion.obtenerDescuentos(),
                                transaccion.obtenerPrecio(),
                                transaccion.obtenerVersion().then(version => version.obtenerProducto()).then(producto => producto.obtenerPortadas())
                        ]))
                )),
                orden.obtenerDireccion()
            ]))
        ]))
    }

    cambioPagina(ev){
        this.filtro.pagina = ev.pageIndex + 1
        this.obtener()
    }

    ngOnInit() {

    }

    imprimir(){
        console.log(this)
    }

    ir(pedido){
        console.log(pedido)
        this.router.navigate(['usuario/pedido/' + pedido.id ]
          // , { queryParams: { nombre: _.snakeCase(this.producto.nombre) } }
        )
    }

    obtenerProceso(x){
        console.log(x)
        switch (x) {
            case 1:
                return 'En revisión'
                break ;
            case 2:
                return 'En envio'
                break ;
                return 'Completado'
            case 3:
                break ;
        }
    }

}
