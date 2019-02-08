
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Accion } from '../modelos/Accion.model'
import * as axios from 'axios'

import { Usuario } from '../modelos/Usuario.model';
const url = APILOCAL.url

@Injectable()
export class AccionService {

    public static crear = (peticion) => axios.default.post( url + '/data/accion', peticion).then(response =>  new Accion( response.data ))
    public static obtener = () => axios.default.get( url + '/data/accion').then(response => response.data.map(n => new Accion( n )))
    public static one = (id) => axios.default.get( url + '/data/accion/' + id).then(response =>  new Accion( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/accion/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/accion/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/accion/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Accion( n ))}))

    public static xUsuario = id => axios.default.get( url + '/data/accion/xUsuario/' + id ).then(response => response.data.map(n => new Accion( n )))
    public static usuario = id => axios.default.get( url + '/data/accion/usuario/' + id ).then(response =>  new Usuario( response.data ))
    public static ligarusuario = (accion , usuario) => axios.default.put( url + '/data/accion-usuario/' + accion + '/' + usuario )
    public static desligarusuario = (accion , usuario) => axios.default.delete( url + '/data/accion-usuario/' + accion + '/' + usuario )



    //- Finalizo
}