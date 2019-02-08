
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Version } from '../modelos/Version.model'
import * as axios from 'axios'

import { Producto } from '../modelos/Producto.model';
import { Opcion } from '../modelos/Opcion.model';
import { Descuento } from '../modelos/Descuento.model';
import { Saliente } from '../modelos/Saliente.model';
import { Oferta } from '../modelos/Oferta.model';
import { Entrante } from '../modelos/Entrante.model';
import { Inventario } from '../modelos/Inventario.model';
import { Sucursal } from '../modelos/Sucursal.model';
import { Transaccion } from '../modelos/Transaccion.model';
import { Favorito } from '../modelos/Favorito.model';
import { Usuario } from '../modelos/Usuario.model';
const url = APILOCAL.url

@Injectable()
export class VersionService {

    public static crear = (peticion) => axios.default.post( url + '/data/version', peticion).then(response =>  new Version( response.data ))
    public static obtener = () => axios.default.get( url + '/data/version').then(response => response.data.map(n => new Version( n )))
    public static one = (id) => axios.default.get( url + '/data/version/' + id).then(response =>  new Version( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/version/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/version/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/version/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Version( n ))}))

    public static xProducto = id => axios.default.get( url + '/data/version/xProducto/' + id ).then(response => response.data.map(n => new Version( n )))
    public static producto = id => axios.default.get( url + '/data/version/producto/' + id ).then(response =>  new Producto( response.data ))
    public static ligarproducto = (version , producto) => axios.default.put( url + '/data/version-producto/' + version + '/' + producto )
    public static desligarproducto = (version , producto) => axios.default.delete( url + '/data/version-producto/' + version + '/' + producto )


    public static opciones = id => axios.default.get( url + '/data/version/opciones/' + id ).then(response => response.data.map(n => new Opcion( n )))
    public static ligaropcion = (version , opcion) => axios.default.put( url + '/data/version-opcion/' + version + '/' + opcion )
    public static desligaropcion = (version , opcion) => axios.default.delete( url + '/data/version-opcion/' + version + '/' + opcion )

    public static descuentos = id => axios.default.get( url + '/data/version/descuentos/' + id ).then(response => response.data.map(n => new Descuento( n )))
    public static ligardescuento = (version , descuento) => axios.default.put( url + '/data/version-descuento/' + version + '/' + descuento )
    public static desligardescuento = (version , descuento) => axios.default.delete( url + '/data/version-descuento/' + version + '/' + descuento )

    public static transacciones = id => axios.default.get( url + '/data/version/transacciones/' + id ).then(response => response.data.map(n => new Transaccion( n )))
    public static ligartransaccion = (version , transaccion) => axios.default.put( url + '/data/version-transaccion/' + version + '/' + transaccion )
    public static desligartransaccion = (version , transaccion) => axios.default.delete( url + '/data/version-transaccion/' + version + '/' + transaccion )


    public static salientes = id => axios.default.get( url + '/data/version/Salientes/' + id ).then(response => response.data.map(n => new Oferta( n )))
    public static ligarsalientes = (version , oferta, objeto ) => axios.default.put( url + '/data/version-oferta-salientes/' + version + '/' + oferta, objeto )
    public static desligarsalientes = (version , oferta) => axios.default.delete( url + '/data/version-oferta-salientes/' + version + '/' + oferta )

    

    public static entrantes = id => axios.default.get( url + '/data/version/Entrantes/' + id ).then(response => response.data.map(n => new Oferta( n )))
    public static ligarentrantes = (version , oferta, objeto ) => axios.default.put( url + '/data/version-oferta-entrantes/' + version + '/' + oferta, objeto )
    public static desligarentrantes = (version , oferta) => axios.default.delete( url + '/data/version-oferta-entrantes/' + version + '/' + oferta )

    

    public static sucursales = id => axios.default.get( url + '/data/version/Sucursales/' + id ).then(response => response.data.map(n => new Sucursal( n )))
    public static ligarsucursales = (version , sucursal, objeto ) => axios.default.put( url + '/data/version-sucursal-sucursales/' + version + '/' + sucursal, objeto )
    public static desligarsucursales = (version , sucursal) => axios.default.delete( url + '/data/version-sucursal-sucursales/' + version + '/' + sucursal )

    

    public static usuarios = id => axios.default.get( url + '/data/version/Usuarios/' + id ).then(response => response.data.map(n => new Usuario( n )))
    public static ligarusuarios = (version , usuario, objeto ) => axios.default.put( url + '/data/version-usuario-usuarios/' + version + '/' + usuario, objeto )
    public static desligarusuarios = (version , usuario) => axios.default.delete( url + '/data/version-usuario-usuarios/' + version + '/' + usuario )

    
    public static opcionesdisponibles = (id) => axios.default.get( url + '/data/version_opcionesdisponibles/' + id ).then(response => response.data)
    public static precios = (id) => axios.default.get( url + '/data/version_precios/' + id ).then(response => response.data)
    public static xNombre = (nombre) => axios.default.put( url + '/data/version_xNombre/', nombre ).then(response => response.data)
    public static precioactual = (id) => axios.default.get( url + '/data/version_precioactual/' +  id ).then(response => response.data)
    public static margenes = (id) => axios.default.get( url + '/data/version_margenes/' + id ).then(response => response.data)
    public static sincronizarPrecios = () => axios.default.get( url + '/data/version_sincronizarPrecios' ).then(response => response.data)
    public static recalcular = (id) => axios.default.get( url + '/data/version_recalcular/' + id ).then(response => response.data)

    //- Finalizo
}