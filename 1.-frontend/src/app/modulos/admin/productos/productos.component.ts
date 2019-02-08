
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {  BehaviorSubject, Observable  } from 'rxjs'
import { ProductoService } from '../../../servicios';

@Component({
    selector: 'productos',
    templateUrl: './productos.component.pug',
    styleUrls: [ './productos.component.styl' ],
    encapsulation: ViewEncapsulation.None
})
export class ProductosComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    precio : any

    peticion = {
        Categoria : {},
        Precio : [ 0, 10000 ],
        Where : [ { Status : 1} ],
        pagina : 1,
        limite : 20,
        Marcas : [  ],
        Colores : [ ],
        Opciones : [ ],
        Producto : null,
        Version : null
    }

    procesos = {
        todos : 0, completos: 0, sinrevision: 0, sinimagen: 0, sinversiones : 0, sinatributos : 0, incompletos : 0, descontiniuados : 0
    }

    status : any = 1

    pasarPeticion : BehaviorSubject<any>

    constructor() {
        this.pasarPeticion = new BehaviorSubject(this.peticion);
    }

    capturar(ev){

        var atributo = Object.keys(ev)[0]
        if(this.peticion[atributo] !== ev[Object.keys(ev)[0]] ){
            this.peticion[atributo] =  ev[Object.keys(ev)[0]]

        }else{
            this.peticion[atributo] =  ev[Object.keys(ev)[0]]
        }

    }

    ngOnInit() {
        ProductoService.contarProcesos()
        .then(response => {
            [
                this.procesos.todos,
                this.procesos.completos ,
                this.procesos.sinrevision,
                this.procesos.sinimagen,
                this.procesos.sinversiones,
                this.procesos.sinatributos,
                this.procesos.incompletos,
                this.procesos.descontiniuados ] = response })
    }

    cambio(){
        this.peticion.Where[0].Status = this.status
    }

    buscar(){
        this.pasarPeticion.next(this.peticion);
    }

    cambioprecio(x){

        if(x){
            this.peticion.Precio = [ 0, 10000 ]
        }else{
            this.peticion.Precio = []
        }

    }
}
