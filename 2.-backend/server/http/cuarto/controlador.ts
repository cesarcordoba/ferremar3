
const errorHandler = require('../error');
const _ = require('lodash');

import { Cuarto } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class CuartoController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Cuarto.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearCuarto', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Cuarto.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarCuarto', res))
        :
        Cuarto.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarCuarto', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Cuarto.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarCuarto', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Cuarto.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarCuarto', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Cuarto.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionCuarto', res))


    //* 27
    ambientes = (req: Request, res: Response, next: NextFunction) =>
        Cuarto.findById(req.params.id)
            .then(item => item.$get('Ambientes'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Cuartoambientes', res))

    //* 27
    ligarambientes = (req: Request, res: Response, next: NextFunction) =>
        Cuarto.findById(req.params.cuarto)
            .then(item => item.$add('Ambientes', req.params.ambiente))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarCuartoambientes', res))

    //* 27
    desligarambientes = (req: Request, res: Response, next: NextFunction) =>
        Cuarto.findById(req.params.cuarto)
            .then(item => item.$remove('Ambientes', req.params.ambiente))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarCuartoambientes', res))

    
}