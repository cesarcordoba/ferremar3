
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Imagen } from '../modelos/Imagen.model'
import * as axios from 'axios'

import { Producto } from '../modelos/Producto.model';
const url = APILOCAL.url

@Injectable()
export class ImagenService {

    public static crear = (peticion) => axios.default.post( url + '/data/imagen', peticion).then(response =>  new Imagen( response.data ))
    public static obtener = () => axios.default.get( url + '/data/imagen').then(response => response.data.map(n => new Imagen( n )))
    public static one = (id) => axios.default.get( url + '/data/imagen/' + id).then(response =>  new Imagen( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/imagen/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/imagen/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/imagen/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Imagen( n ))}))

    public static xProducto = id => axios.default.get( url + '/data/imagen/xProducto/' + id ).then(response => response.data.map(n => new Imagen( n )))
    public static producto = id => axios.default.get( url + '/data/imagen/producto/' + id ).then(response =>  new Producto( response.data ))
    public static ligarproducto = (imagen , producto) => axios.default.put( url + '/data/imagen-producto/' + imagen + '/' + producto )
    public static desligarproducto = (imagen , producto) => axios.default.delete( url + '/data/imagen-producto/' + imagen + '/' + producto )



    //- Finalizo
}