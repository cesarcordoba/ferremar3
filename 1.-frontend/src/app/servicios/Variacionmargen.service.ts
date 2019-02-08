
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Variacionmargen } from '../modelos/Variacionmargen.model'
import * as axios from 'axios'

const url = APILOCAL.url

@Injectable()
export class VariacionmargenService {

    public static crear = (peticion) => axios.default.post( url + '/data/variacionmargen', peticion).then(response =>  new Variacionmargen( response.data ))
    public static obtener = () => axios.default.get( url + '/data/variacionmargen').then(response => response.data.map(n => new Variacionmargen( n )))
    public static one = (id) => axios.default.get( url + '/data/variacionmargen/' + id).then(response =>  new Variacionmargen( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/variacionmargen/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/variacionmargen/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/variacionmargen/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Variacionmargen( n ))}))

    public static cambiarStatus = () => axios.default.get( url + '/data/variacionmargen_cambiarStatus' ).then(response => response.data)

    //- Finalizo
}