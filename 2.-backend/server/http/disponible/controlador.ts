
const errorHandler = require('../error');
const _ = require('lodash');

import { Disponible } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class DisponibleController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Disponible.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearDisponible', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Disponible.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarDisponible', res))
        :
        Disponible.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarDisponible', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Disponible.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarDisponible', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Disponible.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarDisponible', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Disponible.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionDisponible', res))


}