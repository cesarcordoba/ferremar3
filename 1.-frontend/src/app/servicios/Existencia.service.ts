
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Existencia } from '../modelos/Existencia.model'
import * as axios from 'axios'

import { Inventario } from '../modelos/Inventario.model';
const url = APILOCAL.url

@Injectable()
export class ExistenciaService {

    public static crear = (peticion) => axios.default.post( url + '/data/existencia', peticion).then(response =>  new Existencia( response.data ))
    public static obtener = () => axios.default.get( url + '/data/existencia').then(response => response.data.map(n => new Existencia( n )))
    public static one = (id) => axios.default.get( url + '/data/existencia/' + id).then(response =>  new Existencia( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/existencia/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/existencia/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/existencia/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Existencia( n ))}))

    public static inventarios = id => axios.default.get( url + '/data/existencia/inventarios/' + id ).then(response => response.data.map(n => new Inventario( n )))
    public static ligarinventario = (existencia , inventario) => axios.default.put( url + '/data/existencia-inventario/' + existencia + '/' + inventario )
    public static desligarinventario = (existencia , inventario) => axios.default.delete( url + '/data/existencia-inventario/' + existencia + '/' + inventario )


    //- Finalizo
}