
const errorHandler = require('../error');
const _ = require('lodash');

import { Saliente } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class SalienteController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Saliente.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearSaliente', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Saliente.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarSaliente', res))
        :
        Saliente.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarSaliente', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Saliente.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarSaliente', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Saliente.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarSaliente', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Saliente.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionSaliente', res))


}