
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Orden } from '../modelos/Orden.model'
import * as axios from 'axios'

import { Sucursal } from '../modelos/Sucursal.model';
import { Usuario } from '../modelos/Usuario.model';
import { Transaccion } from '../modelos/Transaccion.model';
import { Direccion } from '../modelos/Direccion.model';
import { Tarjeta } from '../modelos/Tarjeta.model';
import { Entrega } from '../modelos/Entrega.model';
import { Cargo } from '../modelos/Cargo.model';
const url = APILOCAL.url

@Injectable()
export class OrdenService {

    public static crear = (peticion) => axios.default.post( url + '/data/orden', peticion).then(response =>  new Orden( response.data ))
    public static obtener = () => axios.default.get( url + '/data/orden').then(response => response.data.map(n => new Orden( n )))
    public static one = (id) => axios.default.get( url + '/data/orden/' + id).then(response =>  new Orden( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/orden/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/orden/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/orden/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Orden( n ))}))

    public static xSucursal = id => axios.default.get( url + '/data/orden/xSucursal/' + id ).then(response => response.data.map(n => new Orden( n )))
    public static sucursal = id => axios.default.get( url + '/data/orden/sucursal/' + id ).then(response =>  new Sucursal( response.data ))
    public static ligarsucursal = (orden , sucursal) => axios.default.put( url + '/data/orden-sucursal/' + orden + '/' + sucursal )
    public static desligarsucursal = (orden , sucursal) => axios.default.delete( url + '/data/orden-sucursal/' + orden + '/' + sucursal )


    public static xUsuario = id => axios.default.get( url + '/data/orden/xUsuario/' + id ).then(response => response.data.map(n => new Orden( n )))
    public static usuario = id => axios.default.get( url + '/data/orden/usuario/' + id ).then(response =>  new Usuario( response.data ))
    public static ligarusuario = (orden , usuario) => axios.default.put( url + '/data/orden-usuario/' + orden + '/' + usuario )
    public static desligarusuario = (orden , usuario) => axios.default.delete( url + '/data/orden-usuario/' + orden + '/' + usuario )


    public static transacciones = id => axios.default.get( url + '/data/orden/transacciones/' + id ).then(response => response.data.map(n => new Transaccion( n )))
    public static ligartransaccion = (orden , transaccion) => axios.default.put( url + '/data/orden-transaccion/' + orden + '/' + transaccion )
    public static desligartransaccion = (orden , transaccion) => axios.default.delete( url + '/data/orden-transaccion/' + orden + '/' + transaccion )

    public static xDireccion = id => axios.default.get( url + '/data/orden/xDireccion/' + id ).then(response => response.data.map(n => new Orden( n )))
    public static direccion = id => axios.default.get( url + '/data/orden/direccion/' + id ).then(response =>  new Direccion( response.data ))
    public static ligardireccion = (orden , direccion) => axios.default.put( url + '/data/orden-direccion/' + orden + '/' + direccion )
    public static desligardireccion = (orden , direccion) => axios.default.delete( url + '/data/orden-direccion/' + orden + '/' + direccion )


    public static xTarjeta = id => axios.default.get( url + '/data/orden/xTarjeta/' + id ).then(response => response.data.map(n => new Orden( n )))
    public static tarjeta = id => axios.default.get( url + '/data/orden/tarjeta/' + id ).then(response =>  new Tarjeta( response.data ))
    public static ligartarjeta = (orden , tarjeta) => axios.default.put( url + '/data/orden-tarjeta/' + orden + '/' + tarjeta )
    public static desligartarjeta = (orden , tarjeta) => axios.default.delete( url + '/data/orden-tarjeta/' + orden + '/' + tarjeta )


    public static entregas = id => axios.default.get( url + '/data/orden/entregas/' + id ).then(response => response.data.map(n => new Entrega( n )))
    public static ligarentrega = (orden , entrega) => axios.default.put( url + '/data/orden-entrega/' + orden + '/' + entrega )
    public static desligarentrega = (orden , entrega) => axios.default.delete( url + '/data/orden-entrega/' + orden + '/' + entrega )

    public static cargos = id => axios.default.get( url + '/data/orden/cargos/' + id ).then(response => response.data.map(n => new Cargo( n )))
    public static ligarcargo = (orden , cargo) => axios.default.put( url + '/data/orden-cargo/' + orden + '/' + cargo )
    public static desligarcargo = (orden , cargo) => axios.default.delete( url + '/data/orden-cargo/' + orden + '/' + cargo )

    public static crearOrden = (objeto) => axios.default.post( url + '/data/orden_crearOrden/', objeto ).then(response => response.data)
    public static crearCargo = (peticion) => axios.default.put( url + '/data/orden_crearCargo/', peticion ).then(response => response.data)

    //- Finalizo
}