
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Saliente } from '../modelos/Saliente.model'
import * as axios from 'axios'

const url = APILOCAL.url

@Injectable()
export class SalienteService {

    public static crear = (peticion) => axios.default.post( url + '/data/saliente', peticion).then(response =>  new Saliente( response.data ))
    public static obtener = () => axios.default.get( url + '/data/saliente').then(response => response.data.map(n => new Saliente( n )))
    public static one = (id) => axios.default.get( url + '/data/saliente/' + id).then(response =>  new Saliente( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/saliente/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/saliente/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/saliente/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Saliente( n ))}))


    //- Finalizo
}