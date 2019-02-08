import { Injectable } from '@angular/core'
import {  BehaviorSubject } from 'rxjs'

@Injectable()
export class AtributosBridge {


    algo: string[] = ['hola', 'como', 'estas']

    atributos = new BehaviorSubject<any>({})
    bridge = this.atributos.asObservable()
    coleccion = []

    constructor(){

    }

    agregar(x){
        // this.coleccion.push(x)
        this.atributos.next(x)
    }

    obtenerAtributos(){}

}
