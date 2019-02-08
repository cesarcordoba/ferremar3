
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

import { ColorService, MarcaService, CategoriaService, AtributoService } from '../../../../servicios';

import {  BehaviorSubject, Observable, Subscription  } from 'rxjs'
import * as _ from 'lodash'

@Component({
  selector: 'modulos',
  templateUrl: './modulos.component.pug',
  styleUrls: ['./modulos.component.styl']
})
export class ModulosComponent implements OnInit, AfterViewInit {

    borde = true ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() modulos
    @Input() nuevaCategoria
    @Input() nuevoquery

    @Output() cambiar = new EventEmitter();

    constructor() {}

    ngOnInit() {

        Promise.all([
            { nombre : 'Marcas', servicio : MarcaService },
            { nombre : 'Colores', servicio : ColorService }
        ].map(async(n) =>
            new Object({
                items : await n.servicio.disponibles(),
                item :  n,
                tipo :  1 })))
        .then(response =>  response.forEach(n => this.modulos.push(n)))

    }



    ngAfterViewInit(){
        this.nuevaCategoria.subscribe((value) => {
            if(value)
                this.insertarModulos(value)
        })

        this.nuevoquery.subscribe(queries => {

            console.log('modulos - nuevo query subscribe')

            setTimeout(() => {

                this.reordenar(queries)
                console.log('modulos - finalizar query subscribe')

            }, 5000)

        }).unsubscribe()
    }

    reordenar(queries){

        this.modulos.forEach(m => {

            if(m.tipo === 1 && queries[ m.item.nombre ]){
                queries[ m.item.nombre ].forEach(n => {
                    m.items.forEach(o => o.check =  n === o.id ? true : false)
                })
            }

            if(m.tipo === 2 && queries.Opciones){
                queries.Opciones.forEach(n =>
                m.items.forEach(o => o.check =  n === o.id ? true : false))
            }

        })


    }

    cambiarOpciones = () => this.cambiar.emit()

    imprimir(){ console.log(this) }

    insertarModulos(categoria){

        console.log('modulos - insertarModulos')

        if(categoria.id)
            CategoriaService.atributos(categoria.id)
                .then(response => Promise.all(
                    response.map(async (n) =>
                        new Object({
                        items : await AtributoService.opciones(n.id),
                        item : n,
                        tipo : 2,
                        categoria : categoria
                        })
                    )))
                .then((response: any) => {

                    this.modulos.forEach(n => {

                        if (!_.isUndefined(categoria) && n.categoria ? (n.tipo === 1  || categoria.nivel > n.categoria.nivel ) :  n.tipo === 1){

                        }else{
                            this.modulos.splice(n, 1)
                        }

                    } )

                    response.forEach(modulo =>  this.modulos.push(modulo))

                })
    }

}
