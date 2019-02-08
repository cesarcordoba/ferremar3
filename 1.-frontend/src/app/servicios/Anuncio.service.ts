
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Anuncio } from '../modelos/Anuncio.model'
import * as axios from 'axios'

import { Cartel } from '../modelos/Cartel.model';
const url = APILOCAL.url

@Injectable()
export class AnuncioService {

    public static crear = (peticion) => axios.default.post( url + '/data/anuncio', peticion).then(response =>  new Anuncio( response.data ))
    public static obtener = () => axios.default.get( url + '/data/anuncio').then(response => response.data.map(n => new Anuncio( n )))
    public static one = (id) => axios.default.get( url + '/data/anuncio/' + id).then(response =>  new Anuncio( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/anuncio/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/anuncio/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/anuncio/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Anuncio( n ))}))

    public static carteles = id => axios.default.get( url + '/data/anuncio/carteles/' + id ).then(response => response.data.map(n => new Cartel( n )))
    public static ligarcartel = (anuncio , cartel) => axios.default.put( url + '/data/anuncio-cartel/' + anuncio + '/' + cartel )
    public static desligarcartel = (anuncio , cartel) => axios.default.delete( url + '/data/anuncio-cartel/' + anuncio + '/' + cartel )


    //- Finalizo
}