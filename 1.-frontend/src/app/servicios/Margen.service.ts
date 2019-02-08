
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Margen } from '../modelos/Margen.model'
import * as axios from 'axios'

import { Producto } from '../modelos/Producto.model';
import { Marca } from '../modelos/Marca.model';
import { Transaccion } from '../modelos/Transaccion.model';
import { Variacionmargen } from '../modelos/Variacionmargen.model';
import { Inventario } from '../modelos/Inventario.model';
const url = APILOCAL.url

@Injectable()
export class MargenService {

    public static crear = (peticion) => axios.default.post( url + '/data/margen', peticion).then(response =>  new Margen( response.data ))
    public static obtener = () => axios.default.get( url + '/data/margen').then(response => response.data.map(n => new Margen( n )))
    public static one = (id) => axios.default.get( url + '/data/margen/' + id).then(response =>  new Margen( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/margen/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/margen/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/margen/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Margen( n ))}))

    public static productos = id => axios.default.get( url + '/data/margen/productos/' + id ).then(response => response.data.map(n => new Producto( n )))
    public static ligarproducto = (margen , producto) => axios.default.put( url + '/data/margen-producto/' + margen + '/' + producto )
    public static desligarproducto = (margen , producto) => axios.default.delete( url + '/data/margen-producto/' + margen + '/' + producto )

    public static xMarca = id => axios.default.get( url + '/data/margen/xMarca/' + id ).then(response => response.data.map(n => new Margen( n )))
    public static marca = id => axios.default.get( url + '/data/margen/marca/' + id ).then(response =>  new Marca( response.data ))
    public static ligarmarca = (margen , marca) => axios.default.put( url + '/data/margen-marca/' + margen + '/' + marca )
    public static desligarmarca = (margen , marca) => axios.default.delete( url + '/data/margen-marca/' + margen + '/' + marca )


    public static transacciones = id => axios.default.get( url + '/data/margen/transacciones/' + id ).then(response => response.data.map(n => new Transaccion( n )))
    public static ligartransaccion = (margen , transaccion) => axios.default.put( url + '/data/margen-transaccion/' + margen + '/' + transaccion )
    public static desligartransaccion = (margen , transaccion) => axios.default.delete( url + '/data/margen-transaccion/' + margen + '/' + transaccion )


    public static inventarios = id => axios.default.get( url + '/data/margen/Inventarios/' + id ).then(response => response.data.map(n => new Inventario( n )))
    public static ligarinventarios = (margen , inventario, objeto ) => axios.default.put( url + '/data/margen-inventario-inventarios/' + margen + '/' + inventario, objeto )
    public static desligarinventarios = (margen , inventario) => axios.default.delete( url + '/data/margen-inventario-inventarios/' + margen + '/' + inventario )

    
    public static sincronizarMargenes = () => axios.default.get( url + '/data/margen_sincronizarMargenes/' ).then(response => response.data)

    //- Finalizo
}