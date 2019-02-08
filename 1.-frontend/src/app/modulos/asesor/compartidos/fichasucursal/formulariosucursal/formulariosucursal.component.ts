
import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { SucursalService } from '../../../../../servicios';
@Component({
  selector: 'formulariosucursal',
  templateUrl: './formulariosucursal.component.pug',
  styleUrls: ['./formulariosucursal.component.styl']
})
export class FormulariosucursalComponent implements OnInit, AfterViewInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() sucursal
    formulario: FormGroup;

    @ViewChild('googleMap') gmapElement: ElementRef;
    private map: google.maps.Map;

    sucursales: any

    markers = []

    constructor(private fb: FormBuilder) {



        this.formulario = this.fb.group({
            nombre: ['', Validators.required],
            calle: ['', Validators.required],
            numero: ['', Validators.required],
            colonia: ['', Validators.required],
            estado: ['', Validators.required],
            codigopostal: ['', Validators.required],
            latitude: ['', Validators.required],
            longitude: ['', Validators.required],
		});

    }

    ngAfterViewInit() {


        this.crearmapa()

        console.log(this.sucursal)


        var self = this
        setTimeout(( ) => {

            Object.entries(self.sucursal)
            .forEach(n => {
                if(self.formulario.controls[n[0]])
                    self.formulario.controls[n[0]].setValue(n[1])
            })

            self.anadirMarkers([
                new google.maps.Marker({
                    position: new google.maps.LatLng(self.sucursal.latitude, self.sucursal.longitude),
                    title: self.sucursal.nombre
                })
            ])

            self.map.setCenter(
                new google.maps.LatLng(self.sucursal.latitude ,  self.sucursal.longitude))

        }, 2000)

    }

    ngOnInit() {

        console.log(this.sucursal)

    }

    imprimir(){
        console.log(this)
    }


    aceptar(){
        SucursalService.editar(this.sucursal)
    }

    anadirMarkers(markers) {
		markers ? this.markers = markers : null;
		this.markers.forEach(m => {
			m.setMap(this.map);
			// this.editable ? (m.$clickleable = true, m.$dragrabble = true) : null;
		});
	}

    crearmapa() {

        console.log(this.gmapElement.nativeElement)

        this.map = new google.maps.Map(this.gmapElement.nativeElement, {
			center: new google.maps.LatLng(18.9022729, -96.9067397),
		    zoom: 12,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
		});
    }


}
