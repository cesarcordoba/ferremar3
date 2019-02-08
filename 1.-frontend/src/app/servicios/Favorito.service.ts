
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Favorito } from '../modelos/Favorito.model'
import * as axios from 'axios'

const url = APILOCAL.url

@Injectable()
export class FavoritoService {

    public static crear = (peticion) => axios.default.post( url + '/data/favorito', peticion).then(response =>  new Favorito( response.data ))
    public static obtener = () => axios.default.get( url + '/data/favorito').then(response => response.data.map(n => new Favorito( n )))
    public static one = (id) => axios.default.get( url + '/data/favorito/' + id).then(response =>  new Favorito( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/favorito/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/favorito/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/favorito/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Favorito( n ))}))


    //- Finalizo
}