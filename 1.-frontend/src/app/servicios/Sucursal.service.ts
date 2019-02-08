
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Sucursal } from '../modelos/Sucursal.model'
import * as axios from 'axios'

import { Inventario } from '../modelos/Inventario.model';
import { Version } from '../modelos/Version.model';
import { Usuario } from '../modelos/Usuario.model';
import { Orden } from '../modelos/Orden.model';
const url = APILOCAL.url

@Injectable()
export class SucursalService {

    public static crear = (peticion) => axios.default.post( url + '/data/sucursal', peticion).then(response =>  new Sucursal( response.data ))
    public static obtener = () => axios.default.get( url + '/data/sucursal').then(response => response.data.map(n => new Sucursal( n )))
    public static one = (id) => axios.default.get( url + '/data/sucursal/' + id).then(response =>  new Sucursal( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/sucursal/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/sucursal/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/sucursal/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Sucursal( n ))}))

    public static usuario = id => axios.default.get( url + '/data/sucursal/usuario/' + id ).then(response =>  new Usuario( response.data ))
    public static ligarusuario = (sucursal , usuario) => axios.default.put( url + '/data/sucursal-usuario/' + sucursal + '/' + usuario )
    public static desligarusuario = (sucursal , usuario) => axios.default.delete( url + '/data/sucursal-usuario/' + sucursal + '/' + usuario )

    
    public static ordenes = id => axios.default.get( url + '/data/sucursal/ordenes/' + id ).then(response => response.data.map(n => new Orden( n )))
    public static ligarorden = (sucursal , orden) => axios.default.put( url + '/data/sucursal-orden/' + sucursal + '/' + orden )
    public static desligarorden = (sucursal , orden) => axios.default.delete( url + '/data/sucursal-orden/' + sucursal + '/' + orden )


    public static versiones = id => axios.default.get( url + '/data/sucursal/Versiones/' + id ).then(response => response.data.map(n => new Version( n )))
    public static ligarversiones = (sucursal , version, objeto ) => axios.default.put( url + '/data/sucursal-version-versiones/' + sucursal + '/' + version, objeto )
    public static desligarversiones = (sucursal , version) => axios.default.delete( url + '/data/sucursal-version-versiones/' + sucursal + '/' + version )

    

    //- Finalizo
}