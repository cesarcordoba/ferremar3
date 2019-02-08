
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


import { TarjetaService } from '../../../../servicios';
@Component({
  selector: 'cambiartarjeta',
  templateUrl: './cambiartarjeta.component.pug',
  styleUrls: ['./cambiartarjeta.component.styl']
})
export class CambiartarjetaComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}



    tarjetas: any

    constructor(public dialogRef: MatDialogRef<CambiartarjetaComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {


        this.data.orden.usuario.obtenerTarjetas()
        .then(tarjetas => this.tarjetas = tarjetas)
        .then(r => console.log(r))


    }

    ngOnInit() {}

    cambiar(ev){
        this.dialogRef.close(ev)
    }

    cerrar(){
        this.dialogRef.close()
    }

}
