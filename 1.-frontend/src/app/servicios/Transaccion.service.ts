
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Transaccion } from '../modelos/Transaccion.model'
import * as axios from 'axios'

import { Version } from '../modelos/Version.model';
import { Margen } from '../modelos/Margen.model';
import { Promo } from '../modelos/Promo.model';
import { Descuento } from '../modelos/Descuento.model';
import { Precio } from '../modelos/Precio.model';
import { Orden } from '../modelos/Orden.model';
import { Entrega } from '../modelos/Entrega.model';
const url = APILOCAL.url

@Injectable()
export class TransaccionService {

    public static crear = (peticion) => axios.default.post( url + '/data/transaccion', peticion).then(response =>  new Transaccion( response.data ))
    public static obtener = () => axios.default.get( url + '/data/transaccion').then(response => response.data.map(n => new Transaccion( n )))
    public static one = (id) => axios.default.get( url + '/data/transaccion/' + id).then(response =>  new Transaccion( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/transaccion/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/transaccion/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/transaccion/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Transaccion( n ))}))

    public static xVersion = id => axios.default.get( url + '/data/transaccion/xVersion/' + id ).then(response => response.data.map(n => new Transaccion( n )))
    public static version = id => axios.default.get( url + '/data/transaccion/version/' + id ).then(response =>  new Version( response.data ))
    public static ligarversion = (transaccion , version) => axios.default.put( url + '/data/transaccion-version/' + transaccion + '/' + version )
    public static desligarversion = (transaccion , version) => axios.default.delete( url + '/data/transaccion-version/' + transaccion + '/' + version )


    public static margenes = id => axios.default.get( url + '/data/transaccion/margenes/' + id ).then(response => response.data.map(n => new Margen( n )))
    public static ligarmargen = (transaccion , margen) => axios.default.put( url + '/data/transaccion-margen/' + transaccion + '/' + margen )
    public static desligarmargen = (transaccion , margen) => axios.default.delete( url + '/data/transaccion-margen/' + transaccion + '/' + margen )

    public static xPromo = id => axios.default.get( url + '/data/transaccion/xPromo/' + id ).then(response => response.data.map(n => new Transaccion( n )))
    public static promo = id => axios.default.get( url + '/data/transaccion/promo/' + id ).then(response =>  new Promo( response.data ))
    public static ligarpromo = (transaccion , promo) => axios.default.put( url + '/data/transaccion-promo/' + transaccion + '/' + promo )
    public static desligarpromo = (transaccion , promo) => axios.default.delete( url + '/data/transaccion-promo/' + transaccion + '/' + promo )


    public static descuentos = id => axios.default.get( url + '/data/transaccion/descuentos/' + id ).then(response => response.data.map(n => new Descuento( n )))
    public static ligardescuento = (transaccion , descuento) => axios.default.put( url + '/data/transaccion-descuento/' + transaccion + '/' + descuento )
    public static desligardescuento = (transaccion , descuento) => axios.default.delete( url + '/data/transaccion-descuento/' + transaccion + '/' + descuento )

    public static xPrecio = id => axios.default.get( url + '/data/transaccion/xPrecio/' + id ).then(response => response.data.map(n => new Transaccion( n )))
    public static precio = id => axios.default.get( url + '/data/transaccion/precio/' + id ).then(response =>  new Precio( response.data ))
    public static ligarprecio = (transaccion , precio) => axios.default.put( url + '/data/transaccion-precio/' + transaccion + '/' + precio )
    public static desligarprecio = (transaccion , precio) => axios.default.delete( url + '/data/transaccion-precio/' + transaccion + '/' + precio )


    public static xOrden = id => axios.default.get( url + '/data/transaccion/xOrden/' + id ).then(response => response.data.map(n => new Transaccion( n )))
    public static orden = id => axios.default.get( url + '/data/transaccion/orden/' + id ).then(response =>  new Orden( response.data ))
    public static ligarorden = (transaccion , orden) => axios.default.put( url + '/data/transaccion-orden/' + transaccion + '/' + orden )
    public static desligarorden = (transaccion , orden) => axios.default.delete( url + '/data/transaccion-orden/' + transaccion + '/' + orden )


    public static xEntrega = id => axios.default.get( url + '/data/transaccion/xEntrega/' + id ).then(response => response.data.map(n => new Transaccion( n )))
    public static entrega = id => axios.default.get( url + '/data/transaccion/entrega/' + id ).then(response =>  new Entrega( response.data ))
    public static ligarentrega = (transaccion , entrega) => axios.default.put( url + '/data/transaccion-entrega/' + transaccion + '/' + entrega )
    public static desligarentrega = (transaccion , entrega) => axios.default.delete( url + '/data/transaccion-entrega/' + transaccion + '/' + entrega )



    //- Finalizo
}