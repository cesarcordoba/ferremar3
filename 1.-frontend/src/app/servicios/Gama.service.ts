
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Gama } from '../modelos/Gama.model'
import * as axios from 'axios'

import { Producto } from '../modelos/Producto.model';
import { Marca } from '../modelos/Marca.model';
const url = APILOCAL.url

@Injectable()
export class GamaService {

    public static crear = (peticion) => axios.default.post( url + '/data/gama', peticion).then(response =>  new Gama( response.data ))
    public static obtener = () => axios.default.get( url + '/data/gama').then(response => response.data.map(n => new Gama( n )))
    public static one = (id) => axios.default.get( url + '/data/gama/' + id).then(response =>  new Gama( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/gama/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/gama/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/gama/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Gama( n ))}))

    public static productos = id => axios.default.get( url + '/data/gama/productos/' + id ).then(response => response.data.map(n => new Producto( n )))
    public static ligarproducto = (gama , producto) => axios.default.put( url + '/data/gama-producto/' + gama + '/' + producto )
    public static desligarproducto = (gama , producto) => axios.default.delete( url + '/data/gama-producto/' + gama + '/' + producto )

    public static xMarca = id => axios.default.get( url + '/data/gama/xMarca/' + id ).then(response => response.data.map(n => new Gama( n )))
    public static marca = id => axios.default.get( url + '/data/gama/marca/' + id ).then(response =>  new Marca( response.data ))
    public static ligarmarca = (gama , marca) => axios.default.put( url + '/data/gama-marca/' + gama + '/' + marca )
    public static desligarmarca = (gama , marca) => axios.default.delete( url + '/data/gama-marca/' + gama + '/' + marca )


    public static ambientes = (id) => axios.default.get( url + '/data/gama_ambientes/' + id ).then(response => response.data)
    public static xNombre = (nombre) => axios.default.put( url + '/data/gama_xNombre/', nombre ).then(response => response.data)

    //- Finalizo
}