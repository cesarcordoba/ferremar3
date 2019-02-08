
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Entrega } from '../modelos/Entrega.model'
import * as axios from 'axios'

import { Transaccion } from '../modelos/Transaccion.model';
import { Orden } from '../modelos/Orden.model';
const url = APILOCAL.url

@Injectable()
export class EntregaService {

    public static crear = (peticion) => axios.default.post( url + '/data/entrega', peticion).then(response =>  new Entrega( response.data ))
    public static obtener = () => axios.default.get( url + '/data/entrega').then(response => response.data.map(n => new Entrega( n )))
    public static one = (id) => axios.default.get( url + '/data/entrega/' + id).then(response =>  new Entrega( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/entrega/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/entrega/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/entrega/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Entrega( n ))}))

    public static transacciones = id => axios.default.get( url + '/data/entrega/transacciones/' + id ).then(response => response.data.map(n => new Transaccion( n )))
    public static ligartransaccion = (entrega , transaccion) => axios.default.put( url + '/data/entrega-transaccion/' + entrega + '/' + transaccion )
    public static desligartransaccion = (entrega , transaccion) => axios.default.delete( url + '/data/entrega-transaccion/' + entrega + '/' + transaccion )

    public static xOrden = id => axios.default.get( url + '/data/entrega/xOrden/' + id ).then(response => response.data.map(n => new Entrega( n )))
    public static orden = id => axios.default.get( url + '/data/entrega/orden/' + id ).then(response =>  new Orden( response.data ))
    public static ligarorden = (entrega , orden) => axios.default.put( url + '/data/entrega-orden/' + entrega + '/' + orden )
    public static desligarorden = (entrega , orden) => axios.default.delete( url + '/data/entrega-orden/' + entrega + '/' + orden )



    //- Finalizo
}