
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Variacionprecio } from '../modelos/Variacionprecio.model'
import * as axios from 'axios'

const url = APILOCAL.url

@Injectable()
export class VariacionprecioService {

    public static crear = (peticion) => axios.default.post( url + '/data/variacionprecio', peticion).then(response =>  new Variacionprecio( response.data ))
    public static obtener = () => axios.default.get( url + '/data/variacionprecio').then(response => response.data.map(n => new Variacionprecio( n )))
    public static one = (id) => axios.default.get( url + '/data/variacionprecio/' + id).then(response =>  new Variacionprecio( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/variacionprecio/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/variacionprecio/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/variacionprecio/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Variacionprecio( n ))}))


    //- Finalizo
}