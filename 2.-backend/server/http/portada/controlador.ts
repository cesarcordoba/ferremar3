
const agrupar = require('./agrupar/agrupar');
    
const errorHandler = require('../error');
const _ = require('lodash');

import { Portada } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class PortadaController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Portada.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearPortada', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Portada.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarPortada', res))
        :
        Portada.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarPortada', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Portada.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarPortada', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Portada.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarPortada', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Portada.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionPortada', res))


    //* 1
    xproducto = (req: Request, res: Response, next: NextFunction) =>
        Portada.findAll(
            { where : { 'IdProducto' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xPortadaproductos', res))

    //* 1
    producto = (req: Request, res: Response, next: NextFunction) =>
        Portada.findById(req.params.id )
            .then(item => item.$get('Producto'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Portadaproductos', res))

    //* 1
    ligarproductos = (req: Request, res: Response, next: NextFunction) =>
        Portada.findById(req.params.portada)
            .then(item => item.$set('Producto', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarPortadaproductos', res))

    //* 1
    desligarproductos = (req: Request, res: Response, next: NextFunction) =>
        Portada.findById(req.params.portada)
            .then(item => item.$remove('Producto', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarPortadaproductos', res))


    
    agrupar = (req: Request, res: Response, next: NextFunction) =>
        agrupar(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Portada_agrupar', res))
    
}