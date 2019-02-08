import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Input } from '@angular/core';
import { FavoritoService, UsuarioService } from '../../../../servicios';
import { Router, ActivatedRoute } from '@angular/router';

import { BolsaBridge } from '../../compartidos/bolsa.bridge';

import * as _ from 'lodash'

import { LoginComponent } from  '../../login/login.component'

@Component({
  selector: 'listadecompras',
  templateUrl: './listadecompras.component.pug',
  styleUrls: ['./listadecompras.component.styl']
})
export class ListadecomprasComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    favoritos: any
    usuario : any
    total : any

    constructor(
        private dialog: MatDialog,
        public dialogRef: MatDialogRef<ListadecomprasComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private bolsabridge: BolsaBridge,
        private router: Router,
    ){

        this.bolsabridge.bridge.subscribe(items => {

            this.favoritos = items.items
            this.total = items.total

        })

        this.favoritos = data.favoritos
        this.total = data.total
        this.usuario = data.usuario

    }

    ngOnInit() {}

    imprimir(){
        console.log( this )
    }

    crearOrden(){
        if(!_.isUndefined(this.usuario)) {
            this.router.navigate([ 'usuario/proceso' ])
        }else{
            this.dialog.open(LoginComponent, {
                position : { top : '100px' },
                width :  '600px',
                height : '700px',
                maxWidth : '600px',
                data :  {}
            }).afterClosed().subscribe(response => {});
        }
        this.dialogRef.close();
    }

    eliminar(idx){
        this.favoritos.splice(idx, 1)
        this.bolsabridge.modificar(this.favoritos)
    }
}
