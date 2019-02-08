import { Component, OnInit, Input, ViewChild, ElementRef , AfterViewInit, Output, EventEmitter} from '@angular/core';
declare var Croppie: any;
import * as _ from 'lodash'
import { MatSnackBar } from '@angular/material';

@Component({
    moduleId: module.id,
    selector: 'croppie',
    templateUrl: 'croppie.component.pug',
    styleUrls: ['croppie.component.styl']
})
export class CroppieComponent implements OnInit, AfterViewInit {

    croppie: any

    @Input() width = 400;
    @Input() height = 400;

    @Input() nuevoArchivo

    @Output() eliminarArchivo = new EventEmitter();

    @Output() imagenFinalizada = new EventEmitter();

    @ViewChild('croppie') el : ElementRef

    base64textString

    constructor(public snack: MatSnackBar){

    }

    ngAfterViewInit(){

        this.nuevoArchivo.subscribe(inputValue => {

            if(!_.isNull(inputValue)){

                this.iniciarCroppie()

                var file: File = inputValue.files[0];
                var myReader: FileReader = new FileReader();

                myReader.onload = this._handleReaderLoaded.bind(this);
                myReader.readAsBinaryString(file);

                myReader.onloadend = (e) => {


                        this.croppie.bind({
                            url: this.base64textString
                        })


                    }

            }

        })
    }

    private _handleReaderLoaded(readerEvt) {
        var binaryString = readerEvt.target.result;
        this.base64textString = 'data:image/png;base64,' + btoa(binaryString);

    }

    ngOnInit(){
        var myReader: FileReader = new FileReader();
    }

    iniciarCroppie(){
        this.croppie =  new Croppie( this.el.nativeElement, {
            viewport: {
                width: this.width, height: this.height
            },
            boundary: {
                width: this.width + 50, height: this.height  + 50
            },
            showZoomer: true,
        });
    }

    eliminar(){
        this.eliminarArchivo.emit(true)
        this.croppie.destroy();
    }

    aceptar(){
        this.snack.open('Imagen Recordata!', '', {duration: 2000})
        this.imagenFinalizada.emit(this.base64textString);
    }

}
