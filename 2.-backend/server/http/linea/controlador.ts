
const xNombre = require('./xNombre/xNombre');
    
const errorHandler = require('../error');
const _ = require('lodash');

import { Linea } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class LineaController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Linea.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearLinea', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Linea.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarLinea', res))
        :
        Linea.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarLinea', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Linea.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarLinea', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Linea.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarLinea', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Linea.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionLinea', res))


    //* 1
    productos = (req: Request, res: Response, next: NextFunction) =>
        Linea.findById(req.params.id)
            .then(item => item.$get('Productos'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Lineaproductos', res))

    //* 1
    ligarproductos = (req: Request, res: Response, next: NextFunction) =>
        Linea.findById(req.params.linea)
            .then(item => item.$add('Productos', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarLineaproductos', res))

    //* 1
    desligarproductos = (req: Request, res: Response, next: NextFunction) =>
        Linea.findById(req.params.linea)
            .then(item => item.$remove('Productos', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarLineaproductos', res))

    
    //* 12
    xmarca = (req: Request, res: Response, next: NextFunction) =>
        Linea.findAll(
            { where : { 'IdMarca' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xLineamarcas', res))

    //* 12
    marca = (req: Request, res: Response, next: NextFunction) =>
        Linea.findById(req.params.id )
            .then(item => item.$get('Marca'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Lineamarcas', res))

    //* 12
    ligarmarcas = (req: Request, res: Response, next: NextFunction) =>
        Linea.findById(req.params.linea)
            .then(item => item.$set('Marca', req.params.marca))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarLineamarcas', res))

    //* 12
    desligarmarcas = (req: Request, res: Response, next: NextFunction) =>
        Linea.findById(req.params.linea)
            .then(item => item.$remove('Marca', req.params.marca))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarLineamarcas', res))


    
    xNombre = (req: Request, res: Response, next: NextFunction) =>
        xNombre(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Linea_xNombre', res))
    
}