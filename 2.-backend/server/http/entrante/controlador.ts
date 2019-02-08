
const errorHandler = require('../error');
const _ = require('lodash');

import { Entrante } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class EntranteController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Entrante.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearEntrante', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Entrante.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarEntrante', res))
        :
        Entrante.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarEntrante', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Entrante.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarEntrante', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Entrante.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarEntrante', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Entrante.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionEntrante', res))


}