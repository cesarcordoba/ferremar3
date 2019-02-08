
const crearOrden = require('./crearOrden/crearOrden');
    
const crearCargo = require('./crearCargo/crearCargo');
    
const errorHandler = require('../error');
const _ = require('lodash');

import { Orden } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class OrdenController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Orden.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearOrden', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Orden.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarOrden', res))
        :
        Orden.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarOrden', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Orden.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarOrden', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Orden.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarOrden', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Orden.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionOrden', res))


    //* 25
    xsucursal = (req: Request, res: Response, next: NextFunction) =>
        Orden.findAll(
            { where : { 'IdSucursal' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xOrdensucursales', res))

    //* 25
    sucursal = (req: Request, res: Response, next: NextFunction) =>
        Orden.findById(req.params.id )
            .then(item => item.$get('Sucursal'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Ordensucursales', res))

    //* 25
    ligarsucursales = (req: Request, res: Response, next: NextFunction) =>
        Orden.findById(req.params.orden)
            .then(item => item.$set('Sucursal', req.params.sucursal))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarOrdensucursales', res))

    //* 25
    desligarsucursales = (req: Request, res: Response, next: NextFunction) =>
        Orden.findById(req.params.orden)
            .then(item => item.$remove('Sucursal', req.params.sucursal))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarOrdensucursales', res))


    
    //* 31
    xusuario = (req: Request, res: Response, next: NextFunction) =>
        Orden.findAll(
            { where : { 'IdUsuario' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xOrdenusuarios', res))

    //* 31
    usuario = (req: Request, res: Response, next: NextFunction) =>
        Orden.findById(req.params.id )
            .then(item => item.$get('Usuario'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Ordenusuarios', res))

    //* 31
    ligarusuarios = (req: Request, res: Response, next: NextFunction) =>
        Orden.findById(req.params.orden)
            .then(item => item.$set('Usuario', req.params.usuario))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarOrdenusuarios', res))

    //* 31
    desligarusuarios = (req: Request, res: Response, next: NextFunction) =>
        Orden.findById(req.params.orden)
            .then(item => item.$remove('Usuario', req.params.usuario))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarOrdenusuarios', res))


    
    //* 32
    transacciones = (req: Request, res: Response, next: NextFunction) =>
        Orden.findById(req.params.id)
            .then(item => item.$get('Transacciones'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Ordentransacciones', res))

    //* 32
    ligartransacciones = (req: Request, res: Response, next: NextFunction) =>
        Orden.findById(req.params.orden)
            .then(item => item.$add('Transacciones', req.params.transaccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarOrdentransacciones', res))

    //* 32
    desligartransacciones = (req: Request, res: Response, next: NextFunction) =>
        Orden.findById(req.params.orden)
            .then(item => item.$remove('Transacciones', req.params.transaccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarOrdentransacciones', res))

    
    //* 39
    xdireccion = (req: Request, res: Response, next: NextFunction) =>
        Orden.findAll(
            { where : { 'IdDireccion' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xOrdendirecciones', res))

    //* 39
    direccion = (req: Request, res: Response, next: NextFunction) =>
        Orden.findById(req.params.id )
            .then(item => item.$get('Direccion'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Ordendirecciones', res))

    //* 39
    ligardirecciones = (req: Request, res: Response, next: NextFunction) =>
        Orden.findById(req.params.orden)
            .then(item => item.$set('Direccion', req.params.direccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarOrdendirecciones', res))

    //* 39
    desligardirecciones = (req: Request, res: Response, next: NextFunction) =>
        Orden.findById(req.params.orden)
            .then(item => item.$remove('Direccion', req.params.direccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarOrdendirecciones', res))


    
    //* 40
    xtarjeta = (req: Request, res: Response, next: NextFunction) =>
        Orden.findAll(
            { where : { 'IdTarjeta' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xOrdentarjetas', res))

    //* 40
    tarjeta = (req: Request, res: Response, next: NextFunction) =>
        Orden.findById(req.params.id )
            .then(item => item.$get('Tarjeta'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Ordentarjetas', res))

    //* 40
    ligartarjetas = (req: Request, res: Response, next: NextFunction) =>
        Orden.findById(req.params.orden)
            .then(item => item.$set('Tarjeta', req.params.tarjeta))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarOrdentarjetas', res))

    //* 40
    desligartarjetas = (req: Request, res: Response, next: NextFunction) =>
        Orden.findById(req.params.orden)
            .then(item => item.$remove('Tarjeta', req.params.tarjeta))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarOrdentarjetas', res))


    
    //* 43
    entregas = (req: Request, res: Response, next: NextFunction) =>
        Orden.findById(req.params.id)
            .then(item => item.$get('Entregas'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Ordenentregas', res))

    //* 43
    ligarentregas = (req: Request, res: Response, next: NextFunction) =>
        Orden.findById(req.params.orden)
            .then(item => item.$add('Entregas', req.params.entrega))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarOrdenentregas', res))

    //* 43
    desligarentregas = (req: Request, res: Response, next: NextFunction) =>
        Orden.findById(req.params.orden)
            .then(item => item.$remove('Entregas', req.params.entrega))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarOrdenentregas', res))

    
    //* 48
    cargos = (req: Request, res: Response, next: NextFunction) =>
        Orden.findById(req.params.id)
            .then(item => item.$get('Cargos'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Ordencargos', res))

    //* 48
    ligarcargos = (req: Request, res: Response, next: NextFunction) =>
        Orden.findById(req.params.orden)
            .then(item => item.$add('Cargos', req.params.cargo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarOrdencargos', res))

    //* 48
    desligarcargos = (req: Request, res: Response, next: NextFunction) =>
        Orden.findById(req.params.orden)
            .then(item => item.$remove('Cargos', req.params.cargo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarOrdencargos', res))

    
    crearOrden = (req: Request, res: Response, next: NextFunction) =>
        crearOrden(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Orden_crearOrden', res))
    
    crearCargo = (req: Request, res: Response, next: NextFunction) =>
        crearCargo(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Orden_crearCargo', res))
    
}