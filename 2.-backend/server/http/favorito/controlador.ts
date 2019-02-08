
const errorHandler = require('../error');
const _ = require('lodash');

import { Favorito } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class FavoritoController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Favorito.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearFavorito', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Favorito.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarFavorito', res))
        :
        Favorito.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarFavorito', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Favorito.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarFavorito', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Favorito.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarFavorito', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Favorito.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionFavorito', res))


}