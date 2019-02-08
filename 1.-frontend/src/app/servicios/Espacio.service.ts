
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Espacio } from '../modelos/Espacio.model'
import * as axios from 'axios'

import { Ambiente } from '../modelos/Ambiente.model';
const url = APILOCAL.url

@Injectable()
export class EspacioService {

    public static crear = (peticion) => axios.default.post( url + '/data/espacio', peticion).then(response =>  new Espacio( response.data ))
    public static obtener = () => axios.default.get( url + '/data/espacio').then(response => response.data.map(n => new Espacio( n )))
    public static one = (id) => axios.default.get( url + '/data/espacio/' + id).then(response =>  new Espacio( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/espacio/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/espacio/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/espacio/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Espacio( n ))}))

    public static xAmbiente = id => axios.default.get( url + '/data/espacio/xAmbiente/' + id ).then(response => response.data.map(n => new Espacio( n )))
    public static ambiente = id => axios.default.get( url + '/data/espacio/ambiente/' + id ).then(response =>  new Ambiente( response.data ))
    public static ligarambiente = (espacio , ambiente) => axios.default.put( url + '/data/espacio-ambiente/' + espacio + '/' + ambiente )
    public static desligarambiente = (espacio , ambiente) => axios.default.delete( url + '/data/espacio-ambiente/' + espacio + '/' + ambiente )



    //- Finalizo
}