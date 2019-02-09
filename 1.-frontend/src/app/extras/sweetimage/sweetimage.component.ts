import { Component, Input, Output, EventEmitter } from '@angular/core';
import {  BehaviorSubject, Observable  } from 'rxjs'

@Component({
    moduleId: module.id,
    selector: 'sweetimage',
    templateUrl: 'sweetimage.component.pug',
    styleUrls: ['sweetimage.component.styl']
})
export class SweetimageComponent {

    file : boolean = false

    @Input() width = 400;
    @Input() height = 400;
    @Output() base64 = new EventEmitter();

    controlImagen : BehaviorSubject<any>

    constructor(){

        this.controlImagen = new BehaviorSubject(null);

    }

    nuevoArchivo(ev){
        
        this.controlImagen.next(ev)
        this.file = true

        // this.file: File = ev.files[0];

    }



    eliminarArchivo(ev){

        console.log('se elimino un croppie')


        this.file = false
        // this.base64.emit(undefined);
        this.controlImagen.next(null)

    }

    imprimir(){
        console.log(this)
    }

    enlazar(event){

        this.base64.emit(event)
        console.log(this.base64)
    }

}
