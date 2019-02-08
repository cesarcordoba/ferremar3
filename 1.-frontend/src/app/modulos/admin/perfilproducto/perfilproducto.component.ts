
import { Component, OnInit } from '@angular/core';
import { Title , Meta }     from '@angular/platform-browser';
import { ActivatedRoute} from '@angular/router'
import {  BehaviorSubject, Observable  } from 'rxjs'

import { ProductoService } from '../../../servicios';
@Component({
  selector: 'perfilproducto',
  templateUrl: './perfilproducto.component.pug',
  styleUrls: [
      './perfilproducto.component.styl'
  ]
})
export class PerfilproductoComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}
    //
    pasarProducto : BehaviorSubject<any>



    producto: any = {}

    constructor(public route : ActivatedRoute, private titleService: Title, private meta : Meta ) {

        this.pasarProducto = new BehaviorSubject({});


        route.params.subscribe(async (res) =>
            ProductoService.one(Number(res.id))
            .then(response => this.producto = response)
            .then(response => {
                this.pasarProducto.next(response);
                this.titleService.setTitle( this.producto.nombre );
            // this.meta.updateTag({ name: 'description', content: _.replace( this.proyecto.resumen, '<p>', '')  })
        // this.meta.updateTag({ name: 'keywords', content: 'pagina web, presupuesto web, cotizador online, cotizador paginas web, presupuesto tienda online,' + this.proyecto.nombre })

    }))


  }

  ngOnInit() {}

  modificar(){



  }
}
