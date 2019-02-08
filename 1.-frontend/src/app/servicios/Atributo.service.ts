
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Atributo } from '../modelos/Atributo.model'
import * as axios from 'axios'

import { Categoria } from '../modelos/Categoria.model';
import { Opcion } from '../modelos/Opcion.model';
const url = APILOCAL.url

@Injectable()
export class AtributoService {

    public static crear = (peticion) => axios.default.post( url + '/data/atributo', peticion).then(response =>  new Atributo( response.data ))
    public static obtener = () => axios.default.get( url + '/data/atributo').then(response => response.data.map(n => new Atributo( n )))
    public static one = (id) => axios.default.get( url + '/data/atributo/' + id).then(response =>  new Atributo( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/atributo/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/atributo/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/atributo/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Atributo( n ))}))

    public static categorias = id => axios.default.get( url + '/data/atributo/categorias/' + id ).then(response => response.data.map(n => new Categoria( n )))
    public static ligarcategoria = (atributo , categoria) => axios.default.put( url + '/data/atributo-categoria/' + atributo + '/' + categoria )
    public static desligarcategoria = (atributo , categoria) => axios.default.delete( url + '/data/atributo-categoria/' + atributo + '/' + categoria )

    public static opciones = id => axios.default.get( url + '/data/atributo/opciones/' + id ).then(response => response.data.map(n => new Opcion( n )))
    public static ligaropcion = (atributo , opcion) => axios.default.put( url + '/data/atributo-opcion/' + atributo + '/' + opcion )
    public static desligaropcion = (atributo , opcion) => axios.default.delete( url + '/data/atributo-opcion/' + atributo + '/' + opcion )


    //- Finalizo
}