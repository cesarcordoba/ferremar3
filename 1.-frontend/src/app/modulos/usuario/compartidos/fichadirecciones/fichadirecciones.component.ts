
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, ViewEncapsulation, Inject, PLATFORM_ID  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs'
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';
import * as _ from 'lodash'
import { DireccionService, AuthService, UsuarioService, SucursalService, CategoriaService } from '../../../../servicios';

@Component({
  selector: 'fichadirecciones',
  templateUrl: './fichadirecciones.component.pug',
  styleUrls: ['./fichadirecciones.component.styl']
})
export class FichadireccionesComponent implements OnInit, AfterViewInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    nuevadireccion: FormGroup;

    //sucursalcercana
    sucursalcercana : any

    sucursales : any

    usuario : any

    // autocomplete
    autocomplete : FormGroup;
    items : Observable<any>;
    itemsfiltrados : any[] = [];
    isLoading = false;

    direcciones : any = []

    @ViewChild('googleMap') gmapElement: ElementRef;
    // mapa: GoogleMaps
    geocoder : any

    autocompleteService : any
    placeService : any

    obteniendolocalizacion : any = false
    statuscrearubicacion : boolean = false


    private map: google.maps.Map;
    private markers = [];



    constructor(private auth : AuthService, private fb: FormBuilder, @Inject(PLATFORM_ID) private platformId: Object){

        if (isPlatformBrowser(this.platformId)) {

            this.autocompleteService = new google.maps.places.AutocompleteService();
            this.placeService = new google.maps.places.PlacesService(new google.maps.Map(document.createElement('div')))
            this.geocoder = new google.maps.Geocoder;


        }

        this.auth.obtenerUsuario()
        .subscribe(response => { this.usuario = response })

        this.obtenerDirecciones()

        this.nuevadireccion = this.fb.group({
            numero: ['', Validators.required],
            calle: ['', Validators.required],
            estado: ['', Validators.required],
            ciudad: ['', Validators.required],
            colonia: ['', Validators.required],
            codigopostal: ['', Validators.required]
        });
        //
        // this.map = new google.maps.Map(this.gmapElement.nativeElement, opciones);

        this.autocomplete = this.fb.group({
            input: null
        })

        let observador = (value) =>
            Observable.create( (observer: any) => {
                this.ObtenerLocaciones(value)
                .then((data)=>{
                    observer.next(data);
                 },(reason)=>{
                    observer.error(reason);
                 })
            })

        this.autocomplete
        .get('input')
        .valueChanges
        .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
            switchMap(value =>
                observador(value)
                .pipe(finalize(() => this.isLoading = false))
        ))
        .subscribe((items : any[]) => {
            this.itemsfiltrados = items
        });
    }

    ObtenerDetalles = (place) =>
        new Promise(resolve =>
            this.placeService.getDetails({ placeId : place.place_id }, (data) =>
                resolve(data)))

    ObtenerLocaciones = (address) =>
        new Promise(resolve =>
            this.autocompleteService.getQueryPredictions({ input: address }, (data) =>
                resolve(data)))

    crearmapa() {
        this.map = new google.maps.Map(this.gmapElement.nativeElement, {
			center: new google.maps.LatLng(18.9022729, -96.9067397),
		    zoom: 12,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
		});
    }

    obtenerDirecciones(){
        DireccionService.xUsuario(this.usuario.id)
        .then(response => this.direcciones = response)
    }

    obtenerUbicacion(){
        this.statuscrearubicacion = true
        this.obteniendolocalizacion = true
        if (isPlatformBrowser(this.platformId)) {
            navigator.geolocation.getCurrentPosition(position => {
                this.obteniendolocalizacion = false
                this.geocodeLatLng( position);
                this.sucursalsercana(position)
            })
        }
    }

    crearDireccion(){

        DireccionService.crear(Object.assign(this.nuevadireccion.value, { IdUsuario : this.usuario.id }))
        .then(response => DireccionService.asignarPrincipal(response.id))
        .then(response => this.obtenerDirecciones())
        this.statuscrearubicacion = false

    }

    eliminarDireccion(id){
        DireccionService.eliminar(id)
        .then(response => this.obtenerDirecciones())

    }

    ngOnInit(){
        SucursalService.obtener()
            .then(response => this.sucursales = response)
            .then(response => {



                // ESTO TODAVIA NO FUNCIONA
                if( _.isObject(this.usuario) && !_.isUndefined(this.usuario.IdSucursal)){

                    this.usuario.obtenerSucursal()
                    .then(response => {
                        this.sucursalcercana = response
                        console.log(this.sucursalcercana)

                    })

                }

                this.anadirMarkers(response.map(n =>
                new google.maps.Marker({
                    position: new google.maps.LatLng(n.latitude ,n.longitude),
                    title: n.nombre
                })
            ))
        })
    }

    anadirMarkers(markers) {
		markers ? this.markers = markers : null;
		this.markers.forEach(m => {
			m.setMap(this.map);
			// this.editable ? (m.$clickleable = true, m.$dragrabble = true) : null;
		});
	}

    ngAfterViewInit(): void {
        this.crearmapa()
    }

    displayFn(user) {
        if (user) {
            return user.description
        }
    }

    sucursalsercana(position){

        let lat1  = position.coords.latitude
        let lon1 = position.coords.longitude

        let menor = 6371
        let index = 0
        let temp : {
            id : 0
        }

        this.sucursales.forEach(sucursal => {

            let lat2 = sucursal.latitude;
            let lon2 = sucursal.longitude;

            let distancia = this.getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2)

            if(menor > distancia){
                temp = sucursal
                menor = distancia
            }

            index++

            if(index === this.sucursales.length && _.isObject(temp) && temp.id){

                this.sucursalcercana =  temp
                UsuarioService.editar(Object.assign(this.usuario, {  IdSucursal : temp.id  }))
            }

        })
    }

    getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
        var R = 6371;
        var dLat = this.deg2rad(lat2-lat1);
        var dLon = this.deg2rad(lon2-lon1);
        var a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return d;
    }

    deg2rad(deg) {
      return deg * (Math.PI/180)
    }

    componer( details ){

        console.log(details)

        var self = this
        var algo = [
            ['numero', 'street_number'],
            ['calle', 'route'],
            ['estado', 'administrative_area_level_1'],
            ['ciudad', 'locality'],
            ['colonia', 'sublocality_level_1'],
            ['codigopostal', 'postal_code']
        ].forEach(n => {
            let x = details.address_components.find(o => o.types[0] === n[1])
            self.nuevadireccion.controls[n[0]].setValue(x ? x.long_name : null)
        })

        this.map.setZoom(15);
        this.anadirMarkers([ new google.maps.Marker({
                position: new google.maps.LatLng(details.geometry.location.lat(), details.geometry.location.lng()),
            })
        ])
		this.map.setCenter(new google.maps.LatLng(details.geometry.location.lat() , details.geometry.location.lng()))
    }

    geocodeLatLng(position) {
        const self = this
        this.geocoder.geocode({'location': {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }}, function(results, status) {
            self.componer(results[0])
        });
    }

    cambio(){

        var self = this

        if(_.isObject(this.autocomplete.value.input)){

            this.geocoder.geocode({'placeId': this.autocomplete.value.input.place_id  }, function(results, status) {
                self.componer(results[0])
            });


        }
    }

    asignarPrincipal(id){
        DireccionService.asignarPrincipal(id)
        .then(response => this.obtenerDirecciones())
    }
}
