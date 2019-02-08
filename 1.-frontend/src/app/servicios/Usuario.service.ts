
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Usuario } from '../modelos/Usuario.model'
import * as axios from 'axios'

import { Sucursal } from '../modelos/Sucursal.model';
import { Orden } from '../modelos/Orden.model';
import { Llave } from '../modelos/Llave.model';
import { Avatar } from '../modelos/Avatar.model';
import { Favorito } from '../modelos/Favorito.model';
import { Version } from '../modelos/Version.model';
import { Log } from '../modelos/Log.model';
import { Accion } from '../modelos/Accion.model';
import { Direccion } from '../modelos/Direccion.model';
import { Tarjeta } from '../modelos/Tarjeta.model';
const url = APILOCAL.url

@Injectable()
export class UsuarioService {

    public static crear = (peticion) => axios.default.post( url + '/data/usuario', peticion).then(response =>  new Usuario( response.data ))
    public static obtener = () => axios.default.get( url + '/data/usuario').then(response => response.data.map(n => new Usuario( n )))
    public static one = (id) => axios.default.get( url + '/data/usuario/' + id).then(response =>  new Usuario( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/usuario/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/usuario/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/usuario/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Usuario( n ))}))

    public static xSucursal = id => axios.default.get( url + '/data/usuario/xSucursal/' + id ).then(response => response.data.map(n => new Usuario( n )))
    public static sucursal = id => axios.default.get( url + '/data/usuario/sucursal/' + id ).then(response =>  new Sucursal( response.data ))
    public static ligarsucursal = (usuario , sucursal) => axios.default.put( url + '/data/usuario-sucursal/' + usuario + '/' + sucursal )
    public static desligarsucursal = (usuario , sucursal) => axios.default.delete( url + '/data/usuario-sucursal/' + usuario + '/' + sucursal )


    public static ordenes = id => axios.default.get( url + '/data/usuario/ordenes/' + id ).then(response => response.data.map(n => new Orden( n )))
    public static ligarorden = (usuario , orden) => axios.default.put( url + '/data/usuario-orden/' + usuario + '/' + orden )
    public static desligarorden = (usuario , orden) => axios.default.delete( url + '/data/usuario-orden/' + usuario + '/' + orden )

    public static llave = id => axios.default.get( url + '/data/usuario/llave/' + id ).then(response =>  new Llave( response.data ))
    public static ligarllave = (usuario , llave) => axios.default.put( url + '/data/usuario-llave/' + usuario + '/' + llave )
    public static desligarllave = (usuario , llave) => axios.default.delete( url + '/data/usuario-llave/' + usuario + '/' + llave )

    
    public static avatares = id => axios.default.get( url + '/data/usuario/avatares/' + id ).then(response => response.data.map(n => new Avatar( n )))
    public static ligaravatar = (usuario , avatar) => axios.default.put( url + '/data/usuario-avatar/' + usuario + '/' + avatar )
    public static desligaravatar = (usuario , avatar) => axios.default.delete( url + '/data/usuario-avatar/' + usuario + '/' + avatar )

    public static logs = id => axios.default.get( url + '/data/usuario/logs/' + id ).then(response => response.data.map(n => new Log( n )))
    public static ligarlog = (usuario , log) => axios.default.put( url + '/data/usuario-log/' + usuario + '/' + log )
    public static desligarlog = (usuario , log) => axios.default.delete( url + '/data/usuario-log/' + usuario + '/' + log )

    public static acciones = id => axios.default.get( url + '/data/usuario/acciones/' + id ).then(response => response.data.map(n => new Accion( n )))
    public static ligaraccion = (usuario , accion) => axios.default.put( url + '/data/usuario-accion/' + usuario + '/' + accion )
    public static desligaraccion = (usuario , accion) => axios.default.delete( url + '/data/usuario-accion/' + usuario + '/' + accion )

    public static direcciones = id => axios.default.get( url + '/data/usuario/direcciones/' + id ).then(response => response.data.map(n => new Direccion( n )))
    public static ligardireccion = (usuario , direccion) => axios.default.put( url + '/data/usuario-direccion/' + usuario + '/' + direccion )
    public static desligardireccion = (usuario , direccion) => axios.default.delete( url + '/data/usuario-direccion/' + usuario + '/' + direccion )

    public static tarjetas = id => axios.default.get( url + '/data/usuario/tarjetas/' + id ).then(response => response.data.map(n => new Tarjeta( n )))
    public static ligartarjeta = (usuario , tarjeta) => axios.default.put( url + '/data/usuario-tarjeta/' + usuario + '/' + tarjeta )
    public static desligartarjeta = (usuario , tarjeta) => axios.default.delete( url + '/data/usuario-tarjeta/' + usuario + '/' + tarjeta )


    public static versiones = id => axios.default.get( url + '/data/usuario/Versiones/' + id ).then(response => response.data.map(n => new Version( n )))
    public static ligarversiones = (usuario , version, objeto ) => axios.default.put( url + '/data/usuario-version-versiones/' + usuario + '/' + version, objeto )
    public static desligarversiones = (usuario , version) => axios.default.delete( url + '/data/usuario-version-versiones/' + usuario + '/' + version )

    
    public static setFavoritos = (objeto) => axios.default.put( url + '/data/usuario_setFavoritos/', objeto ).then(response => response.data)

    //- Finalizo
}