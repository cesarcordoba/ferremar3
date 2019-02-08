
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Entrante } from '../modelos/Entrante.model'
import * as axios from 'axios'

const url = APILOCAL.url

@Injectable()
export class EntranteService {

    public static crear = (peticion) => axios.default.post( url + '/data/entrante', peticion).then(response =>  new Entrante( response.data ))
    public static obtener = () => axios.default.get( url + '/data/entrante').then(response => response.data.map(n => new Entrante( n )))
    public static one = (id) => axios.default.get( url + '/data/entrante/' + id).then(response =>  new Entrante( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/entrante/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/entrante/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/entrante/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Entrante( n ))}))


    //- Finalizo
}