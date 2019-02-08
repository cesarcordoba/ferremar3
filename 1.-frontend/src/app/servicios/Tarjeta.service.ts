
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Tarjeta } from '../modelos/Tarjeta.model'
import * as axios from 'axios'

import { Usuario } from '../modelos/Usuario.model';
import { Orden } from '../modelos/Orden.model';
import { Cargo } from '../modelos/Cargo.model';
const url = APILOCAL.url

@Injectable()
export class TarjetaService {

    public static crear = (peticion) => axios.default.post( url + '/data/tarjeta', peticion).then(response =>  new Tarjeta( response.data ))
    public static obtener = () => axios.default.get( url + '/data/tarjeta').then(response => response.data.map(n => new Tarjeta( n )))
    public static one = (id) => axios.default.get( url + '/data/tarjeta/' + id).then(response =>  new Tarjeta( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/tarjeta/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/tarjeta/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/tarjeta/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Tarjeta( n ))}))

    public static xUsuario = id => axios.default.get( url + '/data/tarjeta/xUsuario/' + id ).then(response => response.data.map(n => new Tarjeta( n )))
    public static usuario = id => axios.default.get( url + '/data/tarjeta/usuario/' + id ).then(response =>  new Usuario( response.data ))
    public static ligarusuario = (tarjeta , usuario) => axios.default.put( url + '/data/tarjeta-usuario/' + tarjeta + '/' + usuario )
    public static desligarusuario = (tarjeta , usuario) => axios.default.delete( url + '/data/tarjeta-usuario/' + tarjeta + '/' + usuario )


    public static ordenes = id => axios.default.get( url + '/data/tarjeta/ordenes/' + id ).then(response => response.data.map(n => new Orden( n )))
    public static ligarorden = (tarjeta , orden) => axios.default.put( url + '/data/tarjeta-orden/' + tarjeta + '/' + orden )
    public static desligarorden = (tarjeta , orden) => axios.default.delete( url + '/data/tarjeta-orden/' + tarjeta + '/' + orden )

    public static cargos = id => axios.default.get( url + '/data/tarjeta/cargos/' + id ).then(response => response.data.map(n => new Cargo( n )))
    public static ligarcargo = (tarjeta , cargo) => axios.default.put( url + '/data/tarjeta-cargo/' + tarjeta + '/' + cargo )
    public static desligarcargo = (tarjeta , cargo) => axios.default.delete( url + '/data/tarjeta-cargo/' + tarjeta + '/' + cargo )

    public static asignarPrincipal = (id) => axios.default.get( url + '/data/tarjeta_asignarPrincipal/' + id ).then(response => response.data)
    public static validarOpenpay = (peticion) => axios.default.post( url + '/data/tarjeta_validarOpenpay/', peticion ).then(response => response.data)

    //- Finalizo
}