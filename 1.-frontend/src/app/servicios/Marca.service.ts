
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Marca } from '../modelos/Marca.model'
import * as axios from 'axios'

import { Producto } from '../modelos/Producto.model';
import { Gama } from '../modelos/Gama.model';
import { Linea } from '../modelos/Linea.model';
import { Margen } from '../modelos/Margen.model';
import { Catalogo } from '../modelos/Catalogo.model';
const url = APILOCAL.url

@Injectable()
export class MarcaService {

    public static crear = (peticion) => axios.default.post( url + '/data/marca', peticion).then(response =>  new Marca( response.data ))
    public static obtener = () => axios.default.get( url + '/data/marca').then(response => response.data.map(n => new Marca( n )))
    public static one = (id) => axios.default.get( url + '/data/marca/' + id).then(response =>  new Marca( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/marca/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/marca/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/marca/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Marca( n ))}))

    public static productos = id => axios.default.get( url + '/data/marca/productos/' + id ).then(response => response.data.map(n => new Producto( n )))
    public static ligarproducto = (marca , producto) => axios.default.put( url + '/data/marca-producto/' + marca + '/' + producto )
    public static desligarproducto = (marca , producto) => axios.default.delete( url + '/data/marca-producto/' + marca + '/' + producto )

    public static gamas = id => axios.default.get( url + '/data/marca/gamas/' + id ).then(response => response.data.map(n => new Gama( n )))
    public static ligargama = (marca , gama) => axios.default.put( url + '/data/marca-gama/' + marca + '/' + gama )
    public static desligargama = (marca , gama) => axios.default.delete( url + '/data/marca-gama/' + marca + '/' + gama )

    public static lineas = id => axios.default.get( url + '/data/marca/lineas/' + id ).then(response => response.data.map(n => new Linea( n )))
    public static ligarlinea = (marca , linea) => axios.default.put( url + '/data/marca-linea/' + marca + '/' + linea )
    public static desligarlinea = (marca , linea) => axios.default.delete( url + '/data/marca-linea/' + marca + '/' + linea )

    public static margenes = id => axios.default.get( url + '/data/marca/margenes/' + id ).then(response => response.data.map(n => new Margen( n )))
    public static ligarmargen = (marca , margen) => axios.default.put( url + '/data/marca-margen/' + marca + '/' + margen )
    public static desligarmargen = (marca , margen) => axios.default.delete( url + '/data/marca-margen/' + marca + '/' + margen )

    public static catalogos = id => axios.default.get( url + '/data/marca/catalogos/' + id ).then(response => response.data.map(n => new Catalogo( n )))
    public static ligarcatalogo = (marca , catalogo) => axios.default.put( url + '/data/marca-catalogo/' + marca + '/' + catalogo )
    public static desligarcatalogo = (marca , catalogo) => axios.default.delete( url + '/data/marca-catalogo/' + marca + '/' + catalogo )

    public static disponibles = () => axios.default.get( url + '/data/marca_disponibles' ).then(response => response.data)
    public static xNombre = (nombre) => axios.default.put( url + '/data/marca_xNombre/', nombre ).then(response => response.data)

    //- Finalizo
}