
import { Component, Input, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CategoriaService } from '../../../../../servicios';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import * as _ from 'lodash'

@Component({
    selector: 'categoria',
    templateUrl: './categoria.component.pug',
    styleUrls: ['./categoria.component.styl'],
    encapsulation: ViewEncapsulation.None
})


export class CategoriaComponent implements OnInit {

    myControl = new FormControl();

    filteredOptions: Observable<any>;

    borde = true ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() categoria
    @Output() cambiar = new EventEmitter();
    @Output() eliminar = new EventEmitter();

    categorias : Observable<any>
    item : any

    constructor() {

        this.categorias = this.myControl.valueChanges
            .pipe(
            startWith(''),
            map(state => {
                return this.categoria.items.map(option => option.nombre);
                // return state ? this._filterStates(state) : this.items.slice()

            }))
    }

    ngOnInit() { if(!_.isNull(this.categoria.item)){ this.item = this.categoria.item.nombre }}

    cambio(){

        console.log('categoria - cambio')

        let categoria = this.categoria.items.find(n => n.nombre === this.item)
        if(!_.isUndefined(categoria)){
            this.categoria.item = categoria
            this.cambiar.emit(categoria)
            this.myControl.disable()
        }else{
            // console.log('no hay')
        }

        // !_.isUndefined(categoria) ?
        //     this.cambiar.emit(categoria)
        //     :
        //     this.eliminacion()

    }

    eliminacion(){

        console.log('categoria - eliminacion')

        this.eliminar.emit(this.categoria)
        this.item  = ''
        this.categoria.item = ''
        this.myControl.enable()

    }


}
