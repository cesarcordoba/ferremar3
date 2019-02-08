
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Producto } from '../modelos/Producto.model'
import * as axios from 'axios'

import { Categoria } from '../modelos/Categoria.model';
import { Color } from '../modelos/Color.model';
import { Imagen } from '../modelos/Imagen.model';
import { Portada } from '../modelos/Portada.model';
import { Version } from '../modelos/Version.model';
import { Marca } from '../modelos/Marca.model';
import { Gama } from '../modelos/Gama.model';
import { Linea } from '../modelos/Linea.model';
import { Margen } from '../modelos/Margen.model';
import { Disponible } from '../modelos/Disponible.model';
import { Promo } from '../modelos/Promo.model';
import { Posicion } from '../modelos/Posicion.model';
import { Ambiente } from '../modelos/Ambiente.model';
const url = APILOCAL.url

@Injectable()
export class ProductoService {

    public static crear = (peticion) => axios.default.post( url + '/data/producto', peticion).then(response =>  new Producto( response.data ))
    public static obtener = () => axios.default.get( url + '/data/producto').then(response => response.data.map(n => new Producto( n )))
    public static one = (id) => axios.default.get( url + '/data/producto/' + id).then(response =>  new Producto( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/producto/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/producto/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/producto/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Producto( n ))}))

    public static xCategoria = id => axios.default.get( url + '/data/producto/xCategoria/' + id ).then(response => response.data.map(n => new Producto( n )))
    public static categoria = id => axios.default.get( url + '/data/producto/categoria/' + id ).then(response =>  new Categoria( response.data ))
    public static ligarcategoria = (producto , categoria) => axios.default.put( url + '/data/producto-categoria/' + producto + '/' + categoria )
    public static desligarcategoria = (producto , categoria) => axios.default.delete( url + '/data/producto-categoria/' + producto + '/' + categoria )


    public static colores = id => axios.default.get( url + '/data/producto/colores/' + id ).then(response => response.data.map(n => new Color( n )))
    public static ligarcolor = (producto , color) => axios.default.put( url + '/data/producto-color/' + producto + '/' + color )
    public static desligarcolor = (producto , color) => axios.default.delete( url + '/data/producto-color/' + producto + '/' + color )

    public static imagenes = id => axios.default.get( url + '/data/producto/imagenes/' + id ).then(response => response.data.map(n => new Imagen( n )))
    public static ligarimagen = (producto , imagen) => axios.default.put( url + '/data/producto-imagen/' + producto + '/' + imagen )
    public static desligarimagen = (producto , imagen) => axios.default.delete( url + '/data/producto-imagen/' + producto + '/' + imagen )

    public static portadas = id => axios.default.get( url + '/data/producto/portadas/' + id ).then(response => response.data.map(n => new Portada( n )))
    public static ligarportada = (producto , portada) => axios.default.put( url + '/data/producto-portada/' + producto + '/' + portada )
    public static desligarportada = (producto , portada) => axios.default.delete( url + '/data/producto-portada/' + producto + '/' + portada )

    public static versiones = id => axios.default.get( url + '/data/producto/versiones/' + id ).then(response => response.data.map(n => new Version( n )))
    public static ligarversion = (producto , version) => axios.default.put( url + '/data/producto-version/' + producto + '/' + version )
    public static desligarversion = (producto , version) => axios.default.delete( url + '/data/producto-version/' + producto + '/' + version )

    public static xMarca = id => axios.default.get( url + '/data/producto/xMarca/' + id ).then(response => response.data.map(n => new Producto( n )))
    public static marca = id => axios.default.get( url + '/data/producto/marca/' + id ).then(response =>  new Marca( response.data ))
    public static ligarmarca = (producto , marca) => axios.default.put( url + '/data/producto-marca/' + producto + '/' + marca )
    public static desligarmarca = (producto , marca) => axios.default.delete( url + '/data/producto-marca/' + producto + '/' + marca )


    public static xGama = id => axios.default.get( url + '/data/producto/xGama/' + id ).then(response => response.data.map(n => new Producto( n )))
    public static gama = id => axios.default.get( url + '/data/producto/gama/' + id ).then(response =>  new Gama( response.data ))
    public static ligargama = (producto , gama) => axios.default.put( url + '/data/producto-gama/' + producto + '/' + gama )
    public static desligargama = (producto , gama) => axios.default.delete( url + '/data/producto-gama/' + producto + '/' + gama )


    public static xLinea = id => axios.default.get( url + '/data/producto/xLinea/' + id ).then(response => response.data.map(n => new Producto( n )))
    public static linea = id => axios.default.get( url + '/data/producto/linea/' + id ).then(response =>  new Linea( response.data ))
    public static ligarlinea = (producto , linea) => axios.default.put( url + '/data/producto-linea/' + producto + '/' + linea )
    public static desligarlinea = (producto , linea) => axios.default.delete( url + '/data/producto-linea/' + producto + '/' + linea )


    public static margenes = id => axios.default.get( url + '/data/producto/margenes/' + id ).then(response => response.data.map(n => new Margen( n )))
    public static ligarmargen = (producto , margen) => axios.default.put( url + '/data/producto-margen/' + producto + '/' + margen )
    public static desligarmargen = (producto , margen) => axios.default.delete( url + '/data/producto-margen/' + producto + '/' + margen )


    public static promos = id => axios.default.get( url + '/data/producto/Promos/' + id ).then(response => response.data.map(n => new Promo( n )))
    public static ligarpromos = (producto , promo, objeto ) => axios.default.put( url + '/data/producto-promo-promos/' + producto + '/' + promo, objeto )
    public static desligarpromos = (producto , promo) => axios.default.delete( url + '/data/producto-promo-promos/' + producto + '/' + promo )

    

    public static ambientes = id => axios.default.get( url + '/data/producto/Ambientes/' + id ).then(response => response.data.map(n => new Ambiente( n )))
    public static ligarambientes = (producto , ambiente, objeto ) => axios.default.put( url + '/data/producto-ambiente-ambientes/' + producto + '/' + ambiente, objeto )
    public static desligarambientes = (producto , ambiente) => axios.default.delete( url + '/data/producto-ambiente-ambientes/' + producto + '/' + ambiente )

    
    public static filtro = (peticion) => axios.default.put( url + '/data/producto_filtro/', peticion ).then(response => response.data)
    public static versionesdisponibles = (id) => axios.default.get( url + '/data/producto_versionesdisponibles/' + id ).then(response => response.data)
    public static xNombre = (nombre) => axios.default.put( url + '/data/producto_xNombre/', nombre ).then(response => response.data)
    public static procesos = () => axios.default.get( url + '/data/producto_procesos/' ).then(response => response.data)
    public static contarProcesos = () => axios.default.get( url + '/data/producto_contarProcesos/' ).then(response => response.data)

    //- Finalizo
}