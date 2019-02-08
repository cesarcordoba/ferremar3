
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Categoria } from '../modelos/Categoria.model'
import * as axios from 'axios'

import { Producto } from '../modelos/Producto.model';
import { Atributo } from '../modelos/Atributo.model';
const url = APILOCAL.url

@Injectable()
export class CategoriaService {

    public static crear = (peticion) => axios.default.post( url + '/data/categoria', peticion).then(response =>  new Categoria( response.data ))
    public static obtener = () => axios.default.get( url + '/data/categoria').then(response => response.data.map(n => new Categoria( n )))
    public static one = (id) => axios.default.get( url + '/data/categoria/' + id).then(response =>  new Categoria( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/categoria/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/categoria/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/categoria/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Categoria( n ))}))

    public static productos = id => axios.default.get( url + '/data/categoria/productos/' + id ).then(response => response.data.map(n => new Producto( n )))
    public static ligarproducto = (categoria , producto) => axios.default.put( url + '/data/categoria-producto/' + categoria + '/' + producto )
    public static desligarproducto = (categoria , producto) => axios.default.delete( url + '/data/categoria-producto/' + categoria + '/' + producto )

    public static precategorias = id => axios.default.get( url + '/data/categoria/precategorias/' + id ).then(response => response.data.map(n => new Categoria( n )))
    public static subcategorias = id => axios.default.get( url + '/data/categoria/subcategorias/' + id ).then(response => response.data.map(n => new Categoria( n )))

    public static atributos = id => axios.default.get( url + '/data/categoria/atributos/' + id ).then(response => response.data.map(n => new Atributo( n )))
    public static ligaratributo = (categoria , atributo) => axios.default.put( url + '/data/categoria-atributo/' + categoria + '/' + atributo )
    public static desligaratributo = (categoria , atributo) => axios.default.delete( url + '/data/categoria-atributo/' + categoria + '/' + atributo )

    public static ultimoproducto = (id) => axios.default.get( url + '/data/categoria_ultimoproductoXcategoria/' + id ).then(response => response.data)
    public static nivel = (id) => axios.default.get( url + '/data/categoria_nivel/' + id ).then(response => response.data)
    public static xNombre = (nombre) => axios.default.put( url + '/data/categoria_xNombre/', nombre ).then(response => response.data)
    public static completo = () => axios.default.get( url + '/data/categoria_completo/' ).then(response => response.data)
    public static padres = (id) => axios.default.get( url + '/data/categoria_padres/'+ id ).then(response => response.data)
    public static restructurar = () => axios.default.get( url + '/data/categoria_restructurar' ).then(response => response.data)

    //- Finalizo
}