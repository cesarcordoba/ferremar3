
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash'
import { ActivatedRoute, Router} from '@angular/router'
import { Title , Meta }     from '@angular/platform-browser';
import { TweenMax } from 'gsap';
import {  BehaviorSubject, Observable  } from 'rxjs'
declare var $: any;
@Component({
    selector: 'busqueda',
    templateUrl: './busqueda.component.pug',
    styleUrls: [ './busqueda.component.styl' ]
})
export class BusquedaComponent implements OnInit {

    borde = true ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    peticion = {
        Categoria : {},
        Precio : [ 0, 10000 ],
        Where : [ { Status : 1} ],
        limite : 20,
        Marcas : [  ],
        Colores : [ ],
        Opciones : [ ],
        pagina : 1
    }


    categorias : any = []
    modulos : any = []
    pasarCategoria : BehaviorSubject<any>
    pasarPeticion : BehaviorSubject<any>
    pasarQuery : BehaviorSubject<any>
    visible : boolean = true


    ocultar(){
        TweenMax.to($('#aside'), .3, { left : this.visible ? '-100%' : 0   })
        this.visible = !this.visible
    }


    constructor(public route : ActivatedRoute, public router : Router, private  titleService: Title , private meta : Meta) {

        this.titleService.setTitle( 'Busqueda de productos' );
        this.meta.updateTag({ name: 'description', content: 'Busca productos mediante nuestros filtros'})
        this.meta.updateTag({ name: 'keywords', content: 'Porcelanite, Azulejos, El Gigante de los azulejos, Buscar' })


        const self = this

        console.log('busqueda - query subscribe')


        // Se obtienen los querys
        route.queryParams.subscribe((queryParams) => {


            // Se inicializa el observador para recibir los querys
            this.pasarQuery = new BehaviorSubject({});

            if(Object.keys(queryParams).length > 0){

                var query = Object.entries(queryParams).reduce((ac, v : any) => {

                    return Object.assign(ac, v[0] !== 'Categoria' ?
                        new Object({ [ v[0] ] :
                            // Esto es porque el query no reconoce cuando debe y es un array
                            _.isArray(v[1]) ? v[1].map(n => Number(n)) : [ Number(v[1])]
                        })
                        :
                        new Object({
                                [ v[0] ] : {
                                    id : Number(v[1].split(',')[0]),
                                    nivel : Number(v[1].split(',')[1]),
                                    IdCategoria :  v[1].split(',')[2] !== 'null' ?  Number(v[1].split(',')[2]) : null,
                                    nombre : v[1].split(',')[3]
                                }
                            })
                        )}, {})

                console.log(JSON.stringify(query))


                this.pasarQuery.next(query);
                self.peticion = Object.assign(self.peticion, query)

                console.log(JSON.stringify(this.peticion))



            }
        })

        console.log('busqueda - pasarCategoria')

        // se inicializa el observador para cuando la categoria cambie
        this.pasarCategoria = new BehaviorSubject({});

        console.log('busqueda - pasarPeticion')

        // se inicializa el observador para cuando la peticion de productos cambie
        this.pasarPeticion = new BehaviorSubject(this.peticion);


    }

    ngOnInit() {}

    // Se activa cuando se cambian las opciones
    cambiarOpciones(){

        console.log('busqueda - cambiaOpciones')

        this.modulos.filter(n => n.tipo === 1).forEach(modulo =>
            this.peticion[ modulo.item.nombre  ] = modulo.items.filter(n => n.check).map(n => n.id)
        )

        this.peticion.Opciones = this.modulos.filter(n => n.tipo === 2).reduce((ac, modulo) =>
            ac.concat(modulo.items.filter(n => n.check).map(n => n.id))
        , [])

        this.sincronizarParams()
        this.pasarPeticion.next(this.peticion);

    }

    // Se activa cuando se cambia el precio
    cambiarPrecio(ev){

        console.log('busqueda - cambiarPrecios')

        this.peticion.Precio = ev
        console.log('cambiarprecio')
        this.pasarPeticion.next(this.peticion);
        this.sincronizarParams()
    }

    // Se activa cuando se cambia la categoria
    cambioCategoria(ev){

        console.log('busqueda - cambioCategoria')

        if(!_.isUndefined(ev)){
            this.pasarCategoria.next(ev);
            this.peticion.Categoria = ev
        }

        this.cambiarOpciones()

    }

    // Se activa cuando se cambia la categoria
    sincronizarParams() {

        console.log(JSON.stringify(this.peticion))

        console.log('busqueda - sincronizarParams')

        let modulos = [ 'Marcas', 'Colores', 'Opciones'  ]

        let peticion = Object.entries(this.peticion).reduce((ac, v :any) => {

            // Categoria
            if(v[0] === 'Categoria' && Object.keys(v[1]).length > 0){
                return Object.assign(ac, { [v[0]] :  v[1].id + ',' + v[1].nivel + ',' + v[1].IdCategoria + ',' + v[1].nombre })
            }

            // modulo
            if((modulos.findIndex(n => n === v[0]) > -1) && (v[1].length > 0)){
                return Object.assign(ac, { [ v[0] ] : v[1] })}
            else
                return ac
        }, {})

        console.log(JSON.stringify(this.peticion))

        this.router.navigate(['busqueda'], {
            queryParams: peticion
        })

    }

    // Se eliminan categorias
    eliminarCategoria(ev){

        console.log('busqueda - eliminarCategoria')

        if(_.isObject(ev.item)){

            var self = this

            ;(async function(){
                self.modulos = await self.modulos.filter(n =>
                    n.tipo === 1 || n.categoria && n.categoria.nivel < ev.nivel)

                //- La ultima categoria se pone dentro del la petición
                let ultimo = await self.categorias.filter(n => n.item)
                self.peticion.Categoria = await ultimo.length === 0 ? new Object({}) : ultimo.pop().item

                await self.cambiarOpciones()
            })()


        }

        // this.cambiarOpciones()

    }

}
