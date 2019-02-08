
const disponibles = require('./disponibles/disponibles');
    
const errorHandler = require('../error');
const _ = require('lodash');

import { Color } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class ColorController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Color.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearColor', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Color.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarColor', res))
        :
        Color.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarColor', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Color.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarColor', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Color.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarColor', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Color.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionColor', res))


    //* 1
    productos = (req: Request, res: Response, next: NextFunction) =>
        Color.findById(req.params.id)
            .then(item => item.$get('Productos'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Colorproductos', res))

    //* 1
    ligarproductos = (req: Request, res: Response, next: NextFunction) =>
        Color.findById(req.params.color)
            .then(item => item.$add('Productos', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarColorproductos', res))

    //* 1
    desligarproductos = (req: Request, res: Response, next: NextFunction) =>
        Color.findById(req.params.color)
            .then(item => item.$remove('Productos', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarColorproductos', res))

    
    disponibles = (req: Request, res: Response, next: NextFunction) =>
        disponibles(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Color_disponibles', res))
    
}