
const cambiarStatus = require('./cambiarStatus/cambiarStatus');
    
const errorHandler = require('../error');
const _ = require('lodash');

import { Variacionmargen } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class VariacionmargenController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Variacionmargen.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearVariacionmargen', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Variacionmargen.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarVariacionmargen', res))
        :
        Variacionmargen.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarVariacionmargen', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Variacionmargen.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarVariacionmargen', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Variacionmargen.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarVariacionmargen', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Variacionmargen.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionVariacionmargen', res))


    cambiarStatus = (req: Request, res: Response, next: NextFunction) =>
        cambiarStatus(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Variacionmargen_cambiarStatus', res))
    
}