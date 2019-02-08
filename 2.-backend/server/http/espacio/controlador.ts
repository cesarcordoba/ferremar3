
const errorHandler = require('../error');
const _ = require('lodash');

import { Espacio } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class EspacioController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Espacio.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearEspacio', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Espacio.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarEspacio', res))
        :
        Espacio.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarEspacio', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Espacio.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarEspacio', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Espacio.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarEspacio', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Espacio.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionEspacio', res))


    //* 27
    xambiente = (req: Request, res: Response, next: NextFunction) =>
        Espacio.findAll(
            { where : { 'IdAmbiente' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xEspacioambientes', res))

    //* 27
    ambiente = (req: Request, res: Response, next: NextFunction) =>
        Espacio.findById(req.params.id )
            .then(item => item.$get('Ambiente'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Espacioambientes', res))

    //* 27
    ligarambientes = (req: Request, res: Response, next: NextFunction) =>
        Espacio.findById(req.params.espacio)
            .then(item => item.$set('Ambiente', req.params.ambiente))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarEspacioambientes', res))

    //* 27
    desligarambientes = (req: Request, res: Response, next: NextFunction) =>
        Espacio.findById(req.params.espacio)
            .then(item => item.$remove('Ambiente', req.params.ambiente))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarEspacioambientes', res))


    
}