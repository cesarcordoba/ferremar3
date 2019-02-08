
const errorHandler = require('../error');
const _ = require('lodash');

import { Posicion } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class PosicionController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Posicion.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearPosicion', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Posicion.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarPosicion', res))
        :
        Posicion.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarPosicion', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Posicion.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarPosicion', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Posicion.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarPosicion', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Posicion.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionPosicion', res))


}