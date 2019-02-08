
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Inventario } from '../modelos/Inventario.model'
import * as axios from 'axios'

import { Existencia } from '../modelos/Existencia.model';
import { Variacionmargen } from '../modelos/Variacionmargen.model';
import { Margen } from '../modelos/Margen.model';
import { Variacionprecio } from '../modelos/Variacionprecio.model';
import { Precio } from '../modelos/Precio.model';
const url = APILOCAL.url

@Injectable()
export class InventarioService {

    public static crear = (peticion) => axios.default.post( url + '/data/inventario', peticion).then(response =>  new Inventario( response.data ))
    public static obtener = () => axios.default.get( url + '/data/inventario').then(response => response.data.map(n => new Inventario( n )))
    public static one = (id) => axios.default.get( url + '/data/inventario/' + id).then(response =>  new Inventario( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/inventario/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/inventario/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/inventario/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Inventario( n ))}))

    public static existencias = id => axios.default.get( url + '/data/inventario/existencias/' + id ).then(response => response.data.map(n => new Existencia( n )))
    public static ligarexistencia = (inventario , existencia) => axios.default.put( url + '/data/inventario-existencia/' + inventario + '/' + existencia )
    public static desligarexistencia = (inventario , existencia) => axios.default.delete( url + '/data/inventario-existencia/' + inventario + '/' + existencia )


    public static margenes = id => axios.default.get( url + '/data/inventario/Margenes/' + id ).then(response => response.data.map(n => new Margen( n )))
    public static ligarmargenes = (inventario , margen, objeto ) => axios.default.put( url + '/data/inventario-margen-margenes/' + inventario + '/' + margen, objeto )
    public static desligarmargenes = (inventario , margen) => axios.default.delete( url + '/data/inventario-margen-margenes/' + inventario + '/' + margen )

    

    public static precios = id => axios.default.get( url + '/data/inventario/Precios/' + id ).then(response => response.data.map(n => new Precio( n )))
    public static ligarprecios = (inventario , precio, objeto ) => axios.default.put( url + '/data/inventario-precio-precios/' + inventario + '/' + precio, objeto )
    public static desligarprecios = (inventario , precio) => axios.default.delete( url + '/data/inventario-precio-precios/' + inventario + '/' + precio )

    
    public static sincronizarStatus = () => axios.default.get( url + '/data/inventario_sincronizarStatus/' ).then(response => response.data)
    public static cambiarStatus = (id) => axios.default.get( url + '/data/inventario_cambiarStatus/' + id ).then(response => response.data)
    public static sincronizarPrecios = () => axios.default.get( url + '/data/inventario_sincronizarPrecios/' ).then(response => response.data)

    //- Finalizo
}