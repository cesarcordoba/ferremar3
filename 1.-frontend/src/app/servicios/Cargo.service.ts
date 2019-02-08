
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { Cargo } from '../modelos/Cargo.model'
import * as axios from 'axios'

import { Orden } from '../modelos/Orden.model';
import { Tarjeta } from '../modelos/Tarjeta.model';
const url = APILOCAL.url

@Injectable()
export class CargoService {

    public static crear = (peticion) => axios.default.post( url + '/data/cargo', peticion).then(response =>  new Cargo( response.data ))
    public static obtener = () => axios.default.get( url + '/data/cargo').then(response => response.data.map(n => new Cargo( n )))
    public static one = (id) => axios.default.get( url + '/data/cargo/' + id).then(response =>  new Cargo( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/cargo/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/cargo/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/cargo/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new Cargo( n ))}))

    public static xOrden = id => axios.default.get( url + '/data/cargo/xOrden/' + id ).then(response => response.data.map(n => new Cargo( n )))
    public static orden = id => axios.default.get( url + '/data/cargo/orden/' + id ).then(response =>  new Orden( response.data ))
    public static ligarorden = (cargo , orden) => axios.default.put( url + '/data/cargo-orden/' + cargo + '/' + orden )
    public static desligarorden = (cargo , orden) => axios.default.delete( url + '/data/cargo-orden/' + cargo + '/' + orden )


    public static xTarjeta = id => axios.default.get( url + '/data/cargo/xTarjeta/' + id ).then(response => response.data.map(n => new Cargo( n )))
    public static tarjeta = id => axios.default.get( url + '/data/cargo/tarjeta/' + id ).then(response =>  new Tarjeta( response.data ))
    public static ligartarjeta = (cargo , tarjeta) => axios.default.put( url + '/data/cargo-tarjeta/' + cargo + '/' + tarjeta )
    public static desligartarjeta = (cargo , tarjeta) => axios.default.delete( url + '/data/cargo-tarjeta/' + cargo + '/' + tarjeta )



    //- Finalizo
}