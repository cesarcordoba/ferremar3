
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Cartel } from '../modelos/Cartel.model'
import * as axios from 'axios'

import { Anuncio } from '../modelos/Anuncio.model';
const url = APILOCAL.url

@Injectable()
export class CartelService {

    public static crear = (peticion) => axios.default.post( url + '/data/cartel', peticion).then(response =>  new Cartel( response.data ))
    public static obtener = () => axios.default.get( url + '/data/cartel').then(response => response.data.map(n => new Cartel( n )))
    public static one = (id) => axios.default.get( url + '/data/cartel/' + id).then(response =>  new Cartel( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/cartel/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/cartel/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/cartel/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Cartel( n ))}))

    public static xAnuncio = id => axios.default.get( url + '/data/cartel/xAnuncio/' + id ).then(response => response.data.map(n => new Cartel( n )))
    public static anuncio = id => axios.default.get( url + '/data/cartel/anuncio/' + id ).then(response =>  new Anuncio( response.data ))
    public static ligaranuncio = (cartel , anuncio) => axios.default.put( url + '/data/cartel-anuncio/' + cartel + '/' + anuncio )
    public static desligaranuncio = (cartel , anuncio) => axios.default.delete( url + '/data/cartel-anuncio/' + cartel + '/' + anuncio )



    //- Finalizo
}