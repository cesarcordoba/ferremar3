import { Component, Input, Output, ElementRef, forwardRef, OnInit, EventEmitter, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { element } from 'protractor';
declare var $: any
declare var Croppie: any;

import * as _ from 'lodash'

@Component({
    selector: 'dropify',
    templateUrl: './dropify.component.pug',
    styleUrls: ['./dropify.component.styl'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DropifyComponent),
            multi: true
        }
    ]
})

export class DropifyComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges{



    @Input() showFileNameInput: boolean;
    @Output() remove = new EventEmitter();
    @Output() isCut = new EventEmitter();
    @Input() isBase64: false;
    @Input() mensaje = 'Arrastra la imagen aqui';
    // @Input() withCroppie = false;
    @Input() croppieWith = 400;
    @Input() croppieHeight = 400;

    @Output() pasarArchivo = new EventEmitter();

    @Input() quitarArchivo

    base64textString
    selectedFileName: string = null;
    dropify: any;
    croppie: any
    randomid: string = 'croppie';

    verDropyCoppi : boolean = true;

    constructor(){


        this.verDropyCoppi = true


    }

    writeValue(value: any) {
        //Handle write value
    }
    propagateChange = (_: any) => { };
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched() { }

    changeListener($event): void {
        // debugger; // uncomment this for debugging purposes

        this.pasarArchivo.emit($event.target)
        this.readThis($event.target);
    }
    readThis(inputValue: any): void {
        // debugger; // uncomment this for debugging purposes
        var file: File = inputValue.files[0];
        var myReader: FileReader = new FileReader();

        if (this.isBase64) {
            myReader.onload = this._handleReaderLoaded.bind(this);
            myReader.readAsBinaryString(file);


        } else {
            myReader.onloadend = (e: any) => {
                this.propagateChange(file);
                this.selectedFileName = file.name;
            }
            myReader.readAsDataURL(file);
        }

    }

    private _handleReaderLoaded(readerEvt) {
        var binaryString = readerEvt.target.result;
        this.base64textString = 'data:image/png;base64,' + btoa(binaryString);

    }

    recortar(){
        this.croppie.result('base64').then(image => {
            this.propagateChange(image);
        })
    }

    limpiar(){

        this.croppie.destroy();
        this.initCroppie();
        this.dropify.resetPreview();
        this.dropify.clearElement();

    }

    ngAfterViewInit(): void {
        // if (this.withCroppie == true ) {
        //     this.initCroppie();
        // }
        if(this.quitarArchivo) {
            this.quitarArchivo.subscribe(response => {

                if(_.isNull(response)){

                    this.dropify.resetPreview();
                    this.dropify.clearElement();

                }

            })
        }

    }

    initCroppie(){

        this.croppie =  new Croppie( document.getElementById(this.randomid), {
            viewport: {
                width: this.croppieWith, height: this.croppieHeight
            },
            boundary: {
                width: 400, height: 400
            },
            showZoomer: true,
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes.croppieWith){
            if(this.croppie){
                this.croppie.destroy();
                this.initCroppie();
                this.croppie.bind({
                    url: this.base64textString
                })
            }
        }
    }

    ngOnInit() {

        var self = this

        let dropify = $('.dropify').dropify({
            messages: {
                'default': this.mensaje,
                'replace': 'Arrastra y remplaza la imagen',
                'remove': 'Quitar',
                'error': 'Ooops, something wrong happended.'
            }
        }).on('change', function() {





            var input = this;
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function(e) {

                    self.verDropyCoppi = false

                }

                reader.readAsDataURL(input.files[0]);
            }
        })

        dropify.on('dropify.beforeClear', (event, element) => {
            // this.propagateChange(null);
            this.remove.emit('assets/images/nophoto.svg')
        });

        this.dropify = dropify.data('dropify');


        this.isCut.emit(false);

    }
}
