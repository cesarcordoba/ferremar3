
const errorHandler = require('../error');
const _ = require('lodash');

import { Imagen } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class ImagenController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Imagen.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearImagen', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Imagen.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarImagen', res))
        :
        Imagen.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarImagen', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Imagen.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarImagen', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Imagen.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarImagen', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Imagen.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionImagen', res))


    //* 1
    xproducto = (req: Request, res: Response, next: NextFunction) =>
        Imagen.findAll(
            { where : { 'IdProducto' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xImagenproductos', res))

    //* 1
    producto = (req: Request, res: Response, next: NextFunction) =>
        Imagen.findById(req.params.id )
            .then(item => item.$get('Producto'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Imagenproductos', res))

    //* 1
    ligarproductos = (req: Request, res: Response, next: NextFunction) =>
        Imagen.findById(req.params.imagen)
            .then(item => item.$set('Producto', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarImagenproductos', res))

    //* 1
    desligarproductos = (req: Request, res: Response, next: NextFunction) =>
        Imagen.findById(req.params.imagen)
            .then(item => item.$remove('Producto', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarImagenproductos', res))


    
}