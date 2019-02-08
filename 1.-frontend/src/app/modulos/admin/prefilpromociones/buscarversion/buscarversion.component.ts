
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Input } from '@angular/core';
import { VersionService } from '../../../../servicios';
@Component({
  selector: 'buscarversion',
  templateUrl: './buscarversion.component.pug',
  styleUrls: ['./buscarversion.component.styl']
})
export class BuscarversionComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}



    versiones: any

    constructor(
        public dialogRef: MatDialogRef<BuscarversionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

        this.versiones = data

        // VersionService.obtener()
        // .then(response => this.versiones = response)
        // .then(response => console.log(response))

    }

    ngOnInit() {



    }

    aceptar(version){
        this.dialogRef.close(version)
    }
}
