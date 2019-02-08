
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


import { AnuncioService } from '../../../../../servicios';
@Component({
  selector: 'crearanuncio',
  templateUrl: './crearanuncio.component.pug',
  styleUrls: ['./crearanuncio.component.styl']
})
export class CrearanuncioComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}



    anuncios: any 
    nombre : string = ''

    constructor(
        public dialogRef: MatDialogRef<CrearanuncioComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

        AnuncioService.obtener()
        .then(response => this.anuncios = response)
        .then(response => console.log(response))

    }



    ngOnInit() {}

    aceptar(){
        this.dialogRef.close(this.nombre)
    }

}
