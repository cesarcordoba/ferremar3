
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Opcion } from '../modelos/Opcion.model'
import * as axios from 'axios'

import { Version } from '../modelos/Version.model';
import { Atributo } from '../modelos/Atributo.model';
const url = APILOCAL.url

@Injectable()
export class OpcionService {

    public static crear = (peticion) => axios.default.post( url + '/data/opcion', peticion).then(response =>  new Opcion( response.data ))
    public static obtener = () => axios.default.get( url + '/data/opcion').then(response => response.data.map(n => new Opcion( n )))
    public static one = (id) => axios.default.get( url + '/data/opcion/' + id).then(response =>  new Opcion( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/opcion/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/opcion/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/opcion/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Opcion( n ))}))

    public static versiones = id => axios.default.get( url + '/data/opcion/versiones/' + id ).then(response => response.data.map(n => new Version( n )))
    public static ligarversion = (opcion , version) => axios.default.put( url + '/data/opcion-version/' + opcion + '/' + version )
    public static desligarversion = (opcion , version) => axios.default.delete( url + '/data/opcion-version/' + opcion + '/' + version )

    public static xAtributo = id => axios.default.get( url + '/data/opcion/xAtributo/' + id ).then(response => response.data.map(n => new Opcion( n )))
    public static atributo = id => axios.default.get( url + '/data/opcion/atributo/' + id ).then(response =>  new Atributo( response.data ))
    public static ligaratributo = (opcion , atributo) => axios.default.put( url + '/data/opcion-atributo/' + opcion + '/' + atributo )
    public static desligaratributo = (opcion , atributo) => axios.default.delete( url + '/data/opcion-atributo/' + opcion + '/' + atributo )



    //- Finalizo
}