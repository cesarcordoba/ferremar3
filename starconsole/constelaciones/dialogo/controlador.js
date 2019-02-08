const _ = require('lodash');

module.exports = (documento, componente, nivel) => {
return new Promise(resolve => {
documento.write(`
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
`)


Promise.all([
    componente.getPlaneta()
    // componente.getSubConstelaciones()
]).then(response => {

    let planeta = response[0]



if(planeta){
documento.write(`

import { `+ _.capitalize(planeta.singular) + `Service } from '../../`+ _.repeat('../', nivel) + `servicios';`)
}

documento.write(`
@Component({
  selector: '` + componente.nombre + `',
  templateUrl: './` + componente.nombre + `.component.pug',
  styleUrls: ['./` + componente.nombre + `.component.styl']
})
export class `+ _.capitalize(componente.nombre) + `Component implements OnInit {

    borde = ` +  _.isEqual( componente.status, 1 )  + ` ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

`)


if(planeta)
documento.write(`

    ` + planeta.plural + `: any
`)

documento.write(`
    constructor(public dialogRef: MatDialogRef<`+ _.capitalize(componente.nombre) + `Component>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
`)

if(planeta)
documento.write(`
    `+ _.capitalize(planeta.singular) + `Service.obtener()
    .then(response => this.` + planeta.plural + ` = response)
    .then(response => console.log(response))
`)

documento.write(`
  }

    ngOnInit() {}

    cerrar(){
        this.dialogRef.close()
    }

}`, (algo) => resolve(true))
    })
})
}
