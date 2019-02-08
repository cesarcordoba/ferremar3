
import { Component, OnInit,  Injectable,  Inject, PLATFORM_ID   } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { isPlatformBrowser } from '@angular/common';
import { ListadecomprasComponent } from './listadecompras/listadecompras.component'
import { FavoritoService, AuthService, UsuarioService } from '../../../servicios';


import { BolsaBridge } from '../compartidos/bolsa.bridge';
import * as _ from 'lodash'
declare var $: any;

@Component({
  selector: 'bolsa',
  templateUrl: './bolsa.component.pug',
  styleUrls: [
      './bolsa.component.styl'
  ]
})
export class BolsaComponent implements OnInit {


    favoritos : any = []
    usuario : any
    total : number

    constructor(
        private dialog: MatDialog,
        private us: AuthService,
        private bolsabridge: BolsaBridge,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {

        this.bolsabridge.bridge.subscribe(items => {
            if(_.isObject(items)){

                if (isPlatformBrowser(this.platformId)) {
                    localStorage.setItem("bolsa", JSON.stringify(items));
                    console.log(JSON.parse(localStorage.getItem("bolsa")))
                }

                this.favoritos = items.items
                this.total = items.total
            }
        })
    }

    ngOnInit() {

        this.us.obtenerUsuario()
		.subscribe(user => {
            if(_.isObject(user)) this.usuario = user
		})

    }

  abrir(ev){
        this.dialog.open(ListadecomprasComponent, {
            position : {
                top : ev.y + 'px',
                left : ev.x - 600 + 'px'
            },
            width :  '600px',
            height : 500 + (this.favoritos.length * 40) +  'px',
            maxWidth : $(window).width() - 50 + 'px',
            data :  {
                favoritos : this.favoritos,
                usuario : this.usuario,
                total : this.total
            }
        }).afterClosed().subscribe(response => {

        });

    }
}
