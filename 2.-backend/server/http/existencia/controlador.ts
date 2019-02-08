
const errorHandler = require('../error');
const _ = require('lodash');

import { Existencia } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class ExistenciaController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Existencia.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearExistencia', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Existencia.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarExistencia', res))
        :
        Existencia.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarExistencia', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Existencia.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarExistencia', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Existencia.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarExistencia', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Existencia.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionExistencia', res))


    //* 23
    inventarios = (req: Request, res: Response, next: NextFunction) =>
        Existencia.findById(req.params.id)
            .then(item => item.$get('Inventarios'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Existenciainventarios', res))

    //* 23
    ligarinventarios = (req: Request, res: Response, next: NextFunction) =>
        Existencia.findById(req.params.existencia)
            .then(item => item.$add('Inventarios', req.params.inventario))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarExistenciainventarios', res))

    //* 23
    desligarinventarios = (req: Request, res: Response, next: NextFunction) =>
        Existencia.findById(req.params.existencia)
            .then(item => item.$remove('Inventarios', req.params.inventario))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarExistenciainventarios', res))

    
}