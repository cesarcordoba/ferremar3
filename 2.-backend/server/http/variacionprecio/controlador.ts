
const errorHandler = require('../error');
const _ = require('lodash');

import { Variacionprecio } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class VariacionprecioController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Variacionprecio.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearVariacionprecio', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Variacionprecio.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarVariacionprecio', res))
        :
        Variacionprecio.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarVariacionprecio', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Variacionprecio.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarVariacionprecio', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Variacionprecio.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarVariacionprecio', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Variacionprecio.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionVariacionprecio', res))


}