import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Injectable } from '@angular/core'
import {  BehaviorSubject } from 'rxjs'

import { VersionService, FavoritoService, AuthService, UsuarioService } from '../../../servicios';

import { Producto, Favorito } from '../../../modelos';

import * as _ from 'lodash'

@Injectable()
export class BolsaBridge implements OnInit {

    algo: string[] = ['hola', 'como', 'estas']

    coleccion = {
        total : 0,
        items : []
    }
    favoritos = new BehaviorSubject<any>(this.coleccion)
    bridge = this.favoritos.asObservable()
    usuario : any

    constructor(
        public snackBar: MatSnackBar,
        private us: AuthService
    ){
        this.us.obtenerUsuario()
		.subscribe(user => {
            this.usuario = user
            if(!_.isNull(this.usuario)) UsuarioService.versiones(this.usuario.id)
                .then(response => this.coleccion.items = response)
                .then(favoritos => Promise.all(favoritos.map(async ( favorito  ) => await favorito.obtenerProducto())))
                .then(productos => Promise.all(productos.map(async ( producto : Producto ) => await producto.obtenerPortadas())))
                .then(response => Promise.all(this.coleccion.items.map(async (c) => await VersionService.precioactual(c.id)
                    .then(response => {
                        c.total = response.precioactual * c.Favorito.cantidad
                        return c.precioactual = response.precioactual
                    })
                )))
                .then(() => this.calcularTotal())
                .then(() => this.favoritos.next(this.coleccion))

        })
    }

    ngOnInit(){
        // UsuarioService.versiones(this.usuario.id)
        // .then(response => this.favoritos = response)
        // .then(favoritos => Promise.all(favoritos.map(async (favorito) => await favorito.obtenerProducto())))
        // .then(productos => Promise.all(productos.map(async (producto) => await producto.obtenerPortadas())))
    }

    agregar(x){

        this.snackBar.open('Agregaste ' + x.nombre + ' a tu bolsa', 'Listo', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
        });

        x.obtenerProducto().then(producto => producto.obtenerPortadas())

        if(this.coleccion.items.findIndex(n => n.id === x.id) === -1){
            x.Favorito = { cantidad : 1 }
            VersionService.precioactual(x.id)
            .then(response => {

                x.total = response.precioactual * x.Favorito.cantidad
                return x.precioactual = response.precioactual
            })
            .then(() => this.coleccion.items.push(x))
            .then(() => this.calcularTotal())
            .then(() => this.sincronizar())
            .then(() => this.favoritos.next(this.coleccion))

        }
    }

    obtener(){
        return this.coleccion
    }

    modificar(x){
        this.coleccion.items = _.uniqBy(x, (n) => n.id)
        this.calcularTotal()
        this.sincronizar()
        this.favoritos.next(this.coleccion)
    }

    sincronizar(){
        if(!_.isNull(this.usuario)) UsuarioService.setFavoritos({usuario : this.usuario.id, favoritos : this.coleccion.items })
    }

    vaciar(){
        this.coleccion.items = []
        this.sincronizar()
        this.favoritos.next(this.coleccion)
    }

    calcularTotal(){
        this.coleccion.total = this.coleccion.items.reduce((ac, v) => ac + (v.Favorito.cantidad * v.precioactual), 0)
    }
}
