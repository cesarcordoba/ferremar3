
const errorHandler = require('../error');
const _ = require('lodash');

import { Accion } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class AccionController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Accion.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearAccion', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Accion.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarAccion', res))
        :
        Accion.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarAccion', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Accion.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarAccion', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Accion.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarAccion', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Accion.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionAccion', res))


    //* 31
    xusuario = (req: Request, res: Response, next: NextFunction) =>
        Accion.findAll(
            { where : { 'IdUsuario' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xAccionusuarios', res))

    //* 31
    usuario = (req: Request, res: Response, next: NextFunction) =>
        Accion.findById(req.params.id )
            .then(item => item.$get('Usuario'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Accionusuarios', res))

    //* 31
    ligarusuarios = (req: Request, res: Response, next: NextFunction) =>
        Accion.findById(req.params.accion)
            .then(item => item.$set('Usuario', req.params.usuario))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarAccionusuarios', res))

    //* 31
    desligarusuarios = (req: Request, res: Response, next: NextFunction) =>
        Accion.findById(req.params.accion)
            .then(item => item.$remove('Usuario', req.params.usuario))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarAccionusuarios', res))


    
}