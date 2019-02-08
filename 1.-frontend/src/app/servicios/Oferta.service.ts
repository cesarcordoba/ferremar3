
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Oferta } from '../modelos/Oferta.model'
import * as axios from 'axios'

import { Promo } from '../modelos/Promo.model';
import { Saliente } from '../modelos/Saliente.model';
import { Version } from '../modelos/Version.model';
import { Entrante } from '../modelos/Entrante.model';
const url = APILOCAL.url

@Injectable()
export class OfertaService {

    public static crear = (peticion) => axios.default.post( url + '/data/oferta', peticion).then(response =>  new Oferta( response.data ))
    public static obtener = () => axios.default.get( url + '/data/oferta').then(response => response.data.map(n => new Oferta( n )))
    public static one = (id) => axios.default.get( url + '/data/oferta/' + id).then(response =>  new Oferta( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/oferta/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/oferta/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/oferta/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Oferta( n ))}))

    public static xPromo = id => axios.default.get( url + '/data/oferta/xPromo/' + id ).then(response => response.data.map(n => new Oferta( n )))
    public static promo = id => axios.default.get( url + '/data/oferta/promo/' + id ).then(response =>  new Promo( response.data ))
    public static ligarpromo = (oferta , promo) => axios.default.put( url + '/data/oferta-promo/' + oferta + '/' + promo )
    public static desligarpromo = (oferta , promo) => axios.default.delete( url + '/data/oferta-promo/' + oferta + '/' + promo )



    public static salientes = id => axios.default.get( url + '/data/oferta/Salientes/' + id ).then(response => response.data.map(n => new Version( n )))
    public static ligarsalientes = (oferta , version, objeto ) => axios.default.put( url + '/data/oferta-version-salientes/' + oferta + '/' + version, objeto )
    public static desligarsalientes = (oferta , version) => axios.default.delete( url + '/data/oferta-version-salientes/' + oferta + '/' + version )

    

    public static entrantes = id => axios.default.get( url + '/data/oferta/Entrantes/' + id ).then(response => response.data.map(n => new Version( n )))
    public static ligarentrantes = (oferta , version, objeto ) => axios.default.put( url + '/data/oferta-version-entrantes/' + oferta + '/' + version, objeto )
    public static desligarentrantes = (oferta , version) => axios.default.delete( url + '/data/oferta-version-entrantes/' + oferta + '/' + version )

    

    //- Finalizo
}