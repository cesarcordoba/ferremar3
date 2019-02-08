
import { Component, OnInit } from '@angular/core';
import { Title , Meta }     from '@angular/platform-browser';
import { ActivatedRoute} from '@angular/router'
import {  BehaviorSubject, Observable  } from 'rxjs'

import { UsuarioService } from '../../../servicios';
@Component({
  selector: 'perfilasesor',
  templateUrl: './perfilasesor.component.pug',
  styleUrls: [
      './perfilasesor.component.styl'
  ]
})
export class PerfilasesorComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}
    //
    // pasarUsuario : BehaviorSubject<any>



    usuario: any = {}
    avatar : any

    constructor(public route : ActivatedRoute, private titleService: Title, private meta : Meta ) {


    route.params.subscribe(async (res) =>
        UsuarioService.one(Number(res.id))
        .then(response => this.usuario = response)
        .then(response => {


            this.usuario.obtenerAcciones()
            this.usuario.obtenerLogs()
            this.usuario.obtenerAvatares()
            .then(avatares => this.avatar = avatares.find(avatar => avatar.width === 200))
            .then(response => console.log(response))
            this.usuario.obtenerSucursal()

            console.log(this.usuario)

            // this.pasarUsuario.next(response);

            this.titleService.setTitle( this.usuario.nombre );
        // this.meta.updateTag({ name: 'description', content: _.replace( this.proyecto.resumen, '<p>', '')  })
        // this.meta.updateTag({ name: 'keywords', content: 'pagina web, presupuesto web, cotizador online, cotizador paginas web, presupuesto tienda online,' + this.proyecto.nombre })

    }))


  }

  ngOnInit() {



  }
}
