
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Color } from '../modelos/Color.model'
import * as axios from 'axios'

import { Producto } from '../modelos/Producto.model';
const url = APILOCAL.url

@Injectable()
export class ColorService {

    public static crear = (peticion) => axios.default.post( url + '/data/color', peticion).then(response =>  new Color( response.data ))
    public static obtener = () => axios.default.get( url + '/data/color').then(response => response.data.map(n => new Color( n )))
    public static one = (id) => axios.default.get( url + '/data/color/' + id).then(response =>  new Color( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/color/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/color/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/color/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Color( n ))}))

    public static productos = id => axios.default.get( url + '/data/color/productos/' + id ).then(response => response.data.map(n => new Producto( n )))
    public static ligarproducto = (color , producto) => axios.default.put( url + '/data/color-producto/' + color + '/' + producto )
    public static desligarproducto = (color , producto) => axios.default.delete( url + '/data/color-producto/' + color + '/' + producto )

    public static disponibles = () => axios.default.get( url + '/data/color_disponibles' ).then(response => response.data)

    //- Finalizo
}