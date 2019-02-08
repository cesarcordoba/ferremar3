
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Ambiente } from '../modelos/Ambiente.model'
import * as axios from 'axios'

import { Posicion } from '../modelos/Posicion.model';
import { Producto } from '../modelos/Producto.model';
import { Cuarto } from '../modelos/Cuarto.model';
import { Espacio } from '../modelos/Espacio.model';
const url = APILOCAL.url

@Injectable()
export class AmbienteService {

    public static crear = (peticion) => axios.default.post( url + '/data/ambiente', peticion).then(response =>  new Ambiente( response.data ))
    public static obtener = () => axios.default.get( url + '/data/ambiente').then(response => response.data.map(n => new Ambiente( n )))
    public static one = (id) => axios.default.get( url + '/data/ambiente/' + id).then(response =>  new Ambiente( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/ambiente/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/ambiente/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/ambiente/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Ambiente( n ))}))

    public static xCuarto = id => axios.default.get( url + '/data/ambiente/xCuarto/' + id ).then(response => response.data.map(n => new Ambiente( n )))
    public static cuarto = id => axios.default.get( url + '/data/ambiente/cuarto/' + id ).then(response =>  new Cuarto( response.data ))
    public static ligarcuarto = (ambiente , cuarto) => axios.default.put( url + '/data/ambiente-cuarto/' + ambiente + '/' + cuarto )
    public static desligarcuarto = (ambiente , cuarto) => axios.default.delete( url + '/data/ambiente-cuarto/' + ambiente + '/' + cuarto )


    public static espacios = id => axios.default.get( url + '/data/ambiente/espacios/' + id ).then(response => response.data.map(n => new Espacio( n )))
    public static ligarespacio = (ambiente , espacio) => axios.default.put( url + '/data/ambiente-espacio/' + ambiente + '/' + espacio )
    public static desligarespacio = (ambiente , espacio) => axios.default.delete( url + '/data/ambiente-espacio/' + ambiente + '/' + espacio )


    public static productos = id => axios.default.get( url + '/data/ambiente/Productos/' + id ).then(response => response.data.map(n => new Producto( n )))
    public static ligarproductos = (ambiente , producto, objeto ) => axios.default.put( url + '/data/ambiente-producto-productos/' + ambiente + '/' + producto, objeto )
    public static desligarproductos = (ambiente , producto) => axios.default.delete( url + '/data/ambiente-producto-productos/' + ambiente + '/' + producto )

    

    //- Finalizo
}