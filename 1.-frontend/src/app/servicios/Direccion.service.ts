
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Direccion } from '../modelos/Direccion.model'
import * as axios from 'axios'

import { Usuario } from '../modelos/Usuario.model';
import { Orden } from '../modelos/Orden.model';
const url = APILOCAL.url

@Injectable()
export class DireccionService {

    public static crear = (peticion) => axios.default.post( url + '/data/direccion', peticion).then(response =>  new Direccion( response.data ))
    public static obtener = () => axios.default.get( url + '/data/direccion').then(response => response.data.map(n => new Direccion( n )))
    public static one = (id) => axios.default.get( url + '/data/direccion/' + id).then(response =>  new Direccion( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/direccion/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/direccion/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/direccion/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Direccion( n ))}))

    public static xUsuario = id => axios.default.get( url + '/data/direccion/xUsuario/' + id ).then(response => response.data.map(n => new Direccion( n )))
    public static usuario = id => axios.default.get( url + '/data/direccion/usuario/' + id ).then(response =>  new Usuario( response.data ))
    public static ligarusuario = (direccion , usuario) => axios.default.put( url + '/data/direccion-usuario/' + direccion + '/' + usuario )
    public static desligarusuario = (direccion , usuario) => axios.default.delete( url + '/data/direccion-usuario/' + direccion + '/' + usuario )


    public static ordenes = id => axios.default.get( url + '/data/direccion/ordenes/' + id ).then(response => response.data.map(n => new Orden( n )))
    public static ligarorden = (direccion , orden) => axios.default.put( url + '/data/direccion-orden/' + direccion + '/' + orden )
    public static desligarorden = (direccion , orden) => axios.default.delete( url + '/data/direccion-orden/' + direccion + '/' + orden )

    public static asignarPrincipal = (id) => axios.default.get( url + '/data/direccion_asignarPrincipal/' + id ).then(response => response.data)

    //- Finalizo
}