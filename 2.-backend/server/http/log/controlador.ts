
const errorHandler = require('../error');
const _ = require('lodash');

import { Log } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class LogController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Log.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearLog', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Log.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarLog', res))
        :
        Log.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarLog', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Log.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarLog', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Log.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarLog', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Log.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionLog', res))


    //* 31
    xusuario = (req: Request, res: Response, next: NextFunction) =>
        Log.findAll(
            { where : { 'IdUsuario' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xLogusuarios', res))

    //* 31
    usuario = (req: Request, res: Response, next: NextFunction) =>
        Log.findById(req.params.id )
            .then(item => item.$get('Usuario'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Logusuarios', res))

    //* 31
    ligarusuarios = (req: Request, res: Response, next: NextFunction) =>
        Log.findById(req.params.log)
            .then(item => item.$set('Usuario', req.params.usuario))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarLogusuarios', res))

    //* 31
    desligarusuarios = (req: Request, res: Response, next: NextFunction) =>
        Log.findById(req.params.log)
            .then(item => item.$remove('Usuario', req.params.usuario))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarLogusuarios', res))


    
}