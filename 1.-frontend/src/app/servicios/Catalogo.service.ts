
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Catalogo } from '../modelos/Catalogo.model'
import * as axios from 'axios'

import { Marca } from '../modelos/Marca.model';
const url = APILOCAL.url

@Injectable()
export class CatalogoService {

    public static crear = (peticion) => axios.default.post( url + '/data/catalogo', peticion).then(response =>  new Catalogo( response.data ))
    public static obtener = () => axios.default.get( url + '/data/catalogo').then(response => response.data.map(n => new Catalogo( n )))
    public static one = (id) => axios.default.get( url + '/data/catalogo/' + id).then(response =>  new Catalogo( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/catalogo/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/catalogo/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/catalogo/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Catalogo( n ))}))

    public static xMarca = id => axios.default.get( url + '/data/catalogo/xMarca/' + id ).then(response => response.data.map(n => new Catalogo( n )))
    public static marca = id => axios.default.get( url + '/data/catalogo/marca/' + id ).then(response =>  new Marca( response.data ))
    public static ligarmarca = (catalogo , marca) => axios.default.put( url + '/data/catalogo-marca/' + catalogo + '/' + marca )
    public static desligarmarca = (catalogo , marca) => axios.default.delete( url + '/data/catalogo-marca/' + catalogo + '/' + marca )



    //- Finalizo
}