
const ambientes = require('./ambientes/ambientes');
    
const xNombre = require('./xNombre/xNombre');
    
const errorHandler = require('../error');
const _ = require('lodash');

import { Gama } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class GamaController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Gama.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearGama', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Gama.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarGama', res))
        :
        Gama.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarGama', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Gama.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarGama', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Gama.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarGama', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Gama.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionGama', res))


    //* 1
    productos = (req: Request, res: Response, next: NextFunction) =>
        Gama.findById(req.params.id)
            .then(item => item.$get('Productos'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Gamaproductos', res))

    //* 1
    ligarproductos = (req: Request, res: Response, next: NextFunction) =>
        Gama.findById(req.params.gama)
            .then(item => item.$add('Productos', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarGamaproductos', res))

    //* 1
    desligarproductos = (req: Request, res: Response, next: NextFunction) =>
        Gama.findById(req.params.gama)
            .then(item => item.$remove('Productos', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarGamaproductos', res))

    
    //* 12
    xmarca = (req: Request, res: Response, next: NextFunction) =>
        Gama.findAll(
            { where : { 'IdMarca' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xGamamarcas', res))

    //* 12
    marca = (req: Request, res: Response, next: NextFunction) =>
        Gama.findById(req.params.id )
            .then(item => item.$get('Marca'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Gamamarcas', res))

    //* 12
    ligarmarcas = (req: Request, res: Response, next: NextFunction) =>
        Gama.findById(req.params.gama)
            .then(item => item.$set('Marca', req.params.marca))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarGamamarcas', res))

    //* 12
    desligarmarcas = (req: Request, res: Response, next: NextFunction) =>
        Gama.findById(req.params.gama)
            .then(item => item.$remove('Marca', req.params.marca))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarGamamarcas', res))


    
    ambientes = (req: Request, res: Response, next: NextFunction) =>
        ambientes(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Gama_ambientes', res))
    
    xNombre = (req: Request, res: Response, next: NextFunction) =>
        xNombre(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Gama_xNombre', res))
    
}