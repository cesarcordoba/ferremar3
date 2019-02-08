
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Tutorial } from '../modelos/Tutorial.model'
import * as axios from 'axios'

const url = APILOCAL.url

@Injectable()
export class TutorialService {

    public static crear = (peticion) => axios.default.post( url + '/data/tutorial', peticion).then(response =>  new Tutorial( response.data ))
    public static obtener = () => axios.default.get( url + '/data/tutorial').then(response => response.data.map(n => new Tutorial( n )))
    public static one = (id) => axios.default.get( url + '/data/tutorial/' + id).then(response =>  new Tutorial( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/tutorial/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/tutorial/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/tutorial/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Tutorial( n ))}))


    //- Finalizo
}