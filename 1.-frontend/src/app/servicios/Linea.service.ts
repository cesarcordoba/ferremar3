
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Linea } from '../modelos/Linea.model'
import * as axios from 'axios'

import { Producto } from '../modelos/Producto.model';
import { Marca } from '../modelos/Marca.model';
const url = APILOCAL.url

@Injectable()
export class LineaService {

    public static crear = (peticion) => axios.default.post( url + '/data/linea', peticion).then(response =>  new Linea( response.data ))
    public static obtener = () => axios.default.get( url + '/data/linea').then(response => response.data.map(n => new Linea( n )))
    public static one = (id) => axios.default.get( url + '/data/linea/' + id).then(response =>  new Linea( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/linea/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/linea/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/linea/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Linea( n ))}))

    public static productos = id => axios.default.get( url + '/data/linea/productos/' + id ).then(response => response.data.map(n => new Producto( n )))
    public static ligarproducto = (linea , producto) => axios.default.put( url + '/data/linea-producto/' + linea + '/' + producto )
    public static desligarproducto = (linea , producto) => axios.default.delete( url + '/data/linea-producto/' + linea + '/' + producto )

    public static xMarca = id => axios.default.get( url + '/data/linea/xMarca/' + id ).then(response => response.data.map(n => new Linea( n )))
    public static marca = id => axios.default.get( url + '/data/linea/marca/' + id ).then(response =>  new Marca( response.data ))
    public static ligarmarca = (linea , marca) => axios.default.put( url + '/data/linea-marca/' + linea + '/' + marca )
    public static desligarmarca = (linea , marca) => axios.default.delete( url + '/data/linea-marca/' + linea + '/' + marca )


    public static xNombre = (nombre) => axios.default.put( url + '/data/linea_xNombre/', nombre ).then(response => response.data)

    //- Finalizo
}