
import { Component, OnInit, Input, ViewEncapsulation,  Output, EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
//    3
import { VersionService, AuthService, AccionService , InventarioService } from '../../../../../servicios';

import { Inventario } from '../../../../../modelos';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CambiarstatusComponent } from './cambiarstatus/cambiarstatus.component';

import { AsignarversionComponent } from './asignarversion/asignarversion.component';
import { CrearversionComponent } from './crearversion/crearversion.component';

declare var $: any;

import * as _ from 'lodash'

@Component({
  selector: 'version',
  templateUrl: './version.component.pug',
  styleUrls: ['./version.component.styl'],
    encapsulation: ViewEncapsulation.None
})
export class VersionComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() version : any
    @Input() producto? : any



    formulario: FormGroup;

    versiones: any
    opciones : any

    sucursales : any
    usuario : any

    @Output() recargar = new EventEmitter();

    constructor(private fb: FormBuilder, private auth : AuthService, private dialog: MatDialog) {

        this.formulario = this.fb.group({
            nombre : null,
            status : null,
            precio : null,
            existencia : null,
        })

        this.auth.obtenerUsuario()
        .subscribe(usuario => this.usuario = usuario)

    }

    cambioprecio(ev, inventario){

        console.log('si')

        InventarioService.cambiarStatus(inventario.id)
        .then(response => console.log(response))
        .then(() => this.obtenersucursales())

    }

    ngOnInit() {

        this.formulario = this.fb.group({
            nombre: [ this.version.nombre ],
            status: [ this.version.status ],
            precio:  new FormControl({value: this.version.precio, disabled: true} , Validators.required),
            existencia:  new FormControl({value: this.version.existencia , disabled: true} , Validators.required)
        })

        VersionService.opciones(this.version.id)
        .then(response => this.opciones = response)

        this.obtenersucursales()

    }

    obtenersucursales(){

        VersionService.sucursales(this.version.id)
        .then(response => this.sucursales = response)
        .then(sucursales => Promise.all(
            sucursales.map(async (sucursal) => await this.obtenerPrecioActual(sucursal))
        ))

    }

    obtenerPrecioActual(sucursal){
        return new Promise(resolve => {
            sucursal.Inventario = new Inventario(sucursal.Inventario)

            resolve(true)
        })
    }

    calcular(sucursal){

        if(sucursal.Inventario.precios && sucursal.Inventario.margenes){
            let precio = sucursal.Inventario.precios.find(precio => precio.Variacionprecio.status === 1)
            let margenes = sucursal.Inventario.margenes.filter(margen => margen.Variacionmargen.status === 1)

            return (!_.isUndefined(precio) && !_.isUndefined(margenes)) ?  + margenes.reduce((precio, margen) => {
                return precio + (precio * (margen.cantidad / 100))
            }, precio.cantidad) : 0
        }
    }

    recalcular(){

        VersionService.recalcular(this.version.id)
        .then(response => {
            console.log(this.formulario)
            console.log(response)
            this.formulario.controls['precio'].setValue(response)
        })

    }

    abrir(){

        this.dialog.open(CambiarstatusComponent, {
            position : {
                top : '25px'
            },
            width :  $(window).width() + 'px',
            height :  $(window).height() - 50 + 'px',
            maxWidth : $(window).width() - 50 + 'px',
            data :  {}
        }).afterClosed().subscribe(margen => {});

    }

    cambio(x){
        this.version.status = x.checked ? 1 : 0
    }

    aceptar(){
        VersionService.editar(this.version)
        .then(() => AccionService.crear({
            seccion : 'version',
            contenido : 'se edito',
            objeto : this.version.id,
            IdUsuario : this.usuario.id
        }))
    }

    asignar(){

        this.dialog.open(AsignarversionComponent, {
            // position : {
            //     top : '25px'
            // },
            width : '500px',
            // height :  $(window).height() - 50 + 'px',
            // maxWidth : $(window).width() - 50 + 'px',
            data :  this.version
        }).afterClosed().subscribe(margen => {
            this.recargar.emit()
        });

    }

    crear(){

        this.dialog.open(CrearversionComponent, {
            // position : {
            //     top : '25px'
            // },
            width : '500px',
            // height :  $(window).height() - 50 + 'px',
            // maxWidth : $(window).width() - 50 + 'px',
            data : {
                version : this.version,
                producto : this.producto
            }
        }).afterClosed().subscribe(margen => {
            console.log('en version')
            this.recargar.emit()
        });

    }

    imprimir(){
        console.log(this)
    }

}
