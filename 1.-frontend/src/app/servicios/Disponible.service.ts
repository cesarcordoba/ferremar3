
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Disponible } from '../modelos/Disponible.model'
import * as axios from 'axios'

const url = APILOCAL.url

@Injectable()
export class DisponibleService {

    public static crear = (peticion) => axios.default.post( url + '/data/disponible', peticion).then(response =>  new Disponible( response.data ))
    public static obtener = () => axios.default.get( url + '/data/disponible').then(response => response.data.map(n => new Disponible( n )))
    public static one = (id) => axios.default.get( url + '/data/disponible/' + id).then(response =>  new Disponible( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/disponible/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/disponible/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/disponible/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Disponible( n ))}))


    //- Finalizo
}