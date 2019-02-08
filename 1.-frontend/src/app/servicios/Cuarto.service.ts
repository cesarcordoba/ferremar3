
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Cuarto } from '../modelos/Cuarto.model'
import * as axios from 'axios'

import { Ambiente } from '../modelos/Ambiente.model';
const url = APILOCAL.url

@Injectable()
export class CuartoService {

    public static crear = (peticion) => axios.default.post( url + '/data/cuarto', peticion).then(response =>  new Cuarto( response.data ))
    public static obtener = () => axios.default.get( url + '/data/cuarto').then(response => response.data.map(n => new Cuarto( n )))
    public static one = (id) => axios.default.get( url + '/data/cuarto/' + id).then(response =>  new Cuarto( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/cuarto/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/cuarto/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/cuarto/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Cuarto( n ))}))

    public static ambientes = id => axios.default.get( url + '/data/cuarto/ambientes/' + id ).then(response => response.data.map(n => new Ambiente( n )))
    public static ligarambiente = (cuarto , ambiente) => axios.default.put( url + '/data/cuarto-ambiente/' + cuarto + '/' + ambiente )
    public static desligarambiente = (cuarto , ambiente) => axios.default.delete( url + '/data/cuarto-ambiente/' + cuarto + '/' + ambiente )


    //- Finalizo
}