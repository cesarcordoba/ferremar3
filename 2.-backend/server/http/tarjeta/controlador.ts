
const asignarPrincipal = require('./asignarPrincipal/asignarPrincipal');
    
const validarOpenpay = require('./validarOpenpay/validarOpenpay');
    
const errorHandler = require('../error');
const _ = require('lodash');

import { Tarjeta } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class TarjetaController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Tarjeta.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearTarjeta', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Tarjeta.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarTarjeta', res))
        :
        Tarjeta.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarTarjeta', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Tarjeta.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarTarjeta', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Tarjeta.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarTarjeta', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Tarjeta.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionTarjeta', res))


    //* 31
    xusuario = (req: Request, res: Response, next: NextFunction) =>
        Tarjeta.findAll(
            { where : { 'IdUsuario' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xTarjetausuarios', res))

    //* 31
    usuario = (req: Request, res: Response, next: NextFunction) =>
        Tarjeta.findById(req.params.id )
            .then(item => item.$get('Usuario'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Tarjetausuarios', res))

    //* 31
    ligarusuarios = (req: Request, res: Response, next: NextFunction) =>
        Tarjeta.findById(req.params.tarjeta)
            .then(item => item.$set('Usuario', req.params.usuario))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarTarjetausuarios', res))

    //* 31
    desligarusuarios = (req: Request, res: Response, next: NextFunction) =>
        Tarjeta.findById(req.params.tarjeta)
            .then(item => item.$remove('Usuario', req.params.usuario))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarTarjetausuarios', res))


    
    //* 33
    ordenes = (req: Request, res: Response, next: NextFunction) =>
        Tarjeta.findById(req.params.id)
            .then(item => item.$get('Ordenes'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Tarjetaordenes', res))

    //* 33
    ligarordenes = (req: Request, res: Response, next: NextFunction) =>
        Tarjeta.findById(req.params.tarjeta)
            .then(item => item.$add('Ordenes', req.params.orden))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarTarjetaordenes', res))

    //* 33
    desligarordenes = (req: Request, res: Response, next: NextFunction) =>
        Tarjeta.findById(req.params.tarjeta)
            .then(item => item.$remove('Ordenes', req.params.orden))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarTarjetaordenes', res))

    
    //* 48
    cargos = (req: Request, res: Response, next: NextFunction) =>
        Tarjeta.findById(req.params.id)
            .then(item => item.$get('Cargos'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Tarjetacargos', res))

    //* 48
    ligarcargos = (req: Request, res: Response, next: NextFunction) =>
        Tarjeta.findById(req.params.tarjeta)
            .then(item => item.$add('Cargos', req.params.cargo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarTarjetacargos', res))

    //* 48
    desligarcargos = (req: Request, res: Response, next: NextFunction) =>
        Tarjeta.findById(req.params.tarjeta)
            .then(item => item.$remove('Cargos', req.params.cargo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarTarjetacargos', res))

    
    asignarPrincipal = (req: Request, res: Response, next: NextFunction) =>
        asignarPrincipal(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Tarjeta_asignarPrincipal', res))
    
    validarOpenpay = (req: Request, res: Response, next: NextFunction) =>
        validarOpenpay(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Tarjeta_validarOpenpay', res))
    
}