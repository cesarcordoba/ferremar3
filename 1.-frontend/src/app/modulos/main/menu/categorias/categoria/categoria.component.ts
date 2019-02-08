import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import * as _ from 'lodash'

@Component({
  selector: 'categoria',
  templateUrl: './categoria.component.pug',
  styleUrls: ['./categoria.component.styl']
})
export class CategoriaComponent implements OnInit,  AfterViewInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() categoria

    @Output() cambio = new EventEmitter();
    @Output() cerrar = new EventEmitter();

    status : boolean = false
    open : boolean = false

    constructor(public route : Router) {  }


    ngOnInit(){}

    ngAfterViewInit() {

        setTimeout(() => {

            if(this.categoria.nivel === 1 || this.categoria.nivel === 2){
                this.categoria.status = true
            }else{
                this.categoria.status = false
            }

        })

    }


    enter(x){

        console.log(x)

        this.cambio.emit(x)
            // if(!_.isUndefined(x))
            //     this.open = !this.open
            //
            // self.categorias.forEach(n => {
            //     if(this.id === n.IdCategoria)
            //         if(this.open === true && n.status === false){
            //             n.status = true
            //         } else {
            //             n.open = false
            //             n.status = false
            //             n.enter()
            //         }
            // })
    }

    ir(){
        this.route.navigate(['busqueda'], { queryParams: { Categoria : this.categoria.id + ',' + this.categoria.nivel + ',' + this.categoria.IdCategoria + ',' + this.categoria.nombre  } } )
        this.cerrar.emit()
    }
}
