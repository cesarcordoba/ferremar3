
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Posicion } from '../modelos/Posicion.model'
import * as axios from 'axios'

const url = APILOCAL.url

@Injectable()
export class PosicionService {

    public static crear = (peticion) => axios.default.post( url + '/data/posicion', peticion).then(response =>  new Posicion( response.data ))
    public static obtener = () => axios.default.get( url + '/data/posicion').then(response => response.data.map(n => new Posicion( n )))
    public static one = (id) => axios.default.get( url + '/data/posicion/' + id).then(response =>  new Posicion( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/posicion/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/posicion/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/posicion/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Posicion( n ))}))


    //- Finalizo
}