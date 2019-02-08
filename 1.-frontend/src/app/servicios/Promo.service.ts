
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Promo } from '../modelos/Promo.model'
import * as axios from 'axios'

import { Disponible } from '../modelos/Disponible.model';
import { Producto } from '../modelos/Producto.model';
import { Descuento } from '../modelos/Descuento.model';
import { Oferta } from '../modelos/Oferta.model';
import { Transaccion } from '../modelos/Transaccion.model';
const url = APILOCAL.url

@Injectable()
export class PromoService {

    public static crear = (peticion) => axios.default.post( url + '/data/promo', peticion).then(response =>  new Promo( response.data ))
    public static obtener = () => axios.default.get( url + '/data/promo').then(response => response.data.map(n => new Promo( n )))
    public static one = (id) => axios.default.get( url + '/data/promo/' + id).then(response =>  new Promo( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/promo/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/promo/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/promo/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Promo( n ))}))

    public static descuentos = id => axios.default.get( url + '/data/promo/descuentos/' + id ).then(response => response.data.map(n => new Descuento( n )))
    public static ligardescuento = (promo , descuento) => axios.default.put( url + '/data/promo-descuento/' + promo + '/' + descuento )
    public static desligardescuento = (promo , descuento) => axios.default.delete( url + '/data/promo-descuento/' + promo + '/' + descuento )

    public static ofertas = id => axios.default.get( url + '/data/promo/ofertas/' + id ).then(response => response.data.map(n => new Oferta( n )))
    public static ligaroferta = (promo , oferta) => axios.default.put( url + '/data/promo-oferta/' + promo + '/' + oferta )
    public static desligaroferta = (promo , oferta) => axios.default.delete( url + '/data/promo-oferta/' + promo + '/' + oferta )

    public static transacciones = id => axios.default.get( url + '/data/promo/transacciones/' + id ).then(response => response.data.map(n => new Transaccion( n )))
    public static ligartransaccion = (promo , transaccion) => axios.default.put( url + '/data/promo-transaccion/' + promo + '/' + transaccion )
    public static desligartransaccion = (promo , transaccion) => axios.default.delete( url + '/data/promo-transaccion/' + promo + '/' + transaccion )


    public static productos = id => axios.default.get( url + '/data/promo/Productos/' + id ).then(response => response.data.map(n => new Producto( n )))
    public static ligarproductos = (promo , producto, objeto ) => axios.default.put( url + '/data/promo-producto-productos/' + promo + '/' + producto, objeto )
    public static desligarproductos = (promo , producto) => axios.default.delete( url + '/data/promo-producto-productos/' + promo + '/' + producto )

    
    public static verificarProducto = (id) => axios.default.get( url + '/data/promo_verificarProducto/' + id ).then(response => response.data)

    //- Finalizo
}