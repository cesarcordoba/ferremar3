
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Descuento } from '../modelos/Descuento.model'
import * as axios from 'axios'

import { Version } from '../modelos/Version.model';
import { Promo } from '../modelos/Promo.model';
import { Transaccion } from '../modelos/Transaccion.model';
const url = APILOCAL.url

@Injectable()
export class DescuentoService {

    public static crear = (peticion) => axios.default.post( url + '/data/descuento', peticion).then(response =>  new Descuento( response.data ))
    public static obtener = () => axios.default.get( url + '/data/descuento').then(response => response.data.map(n => new Descuento( n )))
    public static one = (id) => axios.default.get( url + '/data/descuento/' + id).then(response =>  new Descuento( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/descuento/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/descuento/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/descuento/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Descuento( n ))}))

    public static versiones = id => axios.default.get( url + '/data/descuento/versiones/' + id ).then(response => response.data.map(n => new Version( n )))
    public static ligarversion = (descuento , version) => axios.default.put( url + '/data/descuento-version/' + descuento + '/' + version )
    public static desligarversion = (descuento , version) => axios.default.delete( url + '/data/descuento-version/' + descuento + '/' + version )

    public static xPromo = id => axios.default.get( url + '/data/descuento/xPromo/' + id ).then(response => response.data.map(n => new Descuento( n )))
    public static promo = id => axios.default.get( url + '/data/descuento/promo/' + id ).then(response =>  new Promo( response.data ))
    public static ligarpromo = (descuento , promo) => axios.default.put( url + '/data/descuento-promo/' + descuento + '/' + promo )
    public static desligarpromo = (descuento , promo) => axios.default.delete( url + '/data/descuento-promo/' + descuento + '/' + promo )


    public static transacciones = id => axios.default.get( url + '/data/descuento/transacciones/' + id ).then(response => response.data.map(n => new Transaccion( n )))
    public static ligartransaccion = (descuento , transaccion) => axios.default.put( url + '/data/descuento-transaccion/' + descuento + '/' + transaccion )
    public static desligartransaccion = (descuento , transaccion) => axios.default.delete( url + '/data/descuento-transaccion/' + descuento + '/' + transaccion )


    //- Finalizo
}