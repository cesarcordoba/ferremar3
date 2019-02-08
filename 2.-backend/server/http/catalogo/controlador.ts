
const errorHandler = require('../error');
const _ = require('lodash');

import { Catalogo } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class CatalogoController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Catalogo.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearCatalogo', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Catalogo.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarCatalogo', res))
        :
        Catalogo.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarCatalogo', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Catalogo.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarCatalogo', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Catalogo.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarCatalogo', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Catalogo.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionCatalogo', res))


    //* 12
    xmarca = (req: Request, res: Response, next: NextFunction) =>
        Catalogo.findAll(
            { where : { 'IdMarca' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xCatalogomarcas', res))

    //* 12
    marca = (req: Request, res: Response, next: NextFunction) =>
        Catalogo.findById(req.params.id )
            .then(item => item.$get('Marca'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Catalogomarcas', res))

    //* 12
    ligarmarcas = (req: Request, res: Response, next: NextFunction) =>
        Catalogo.findById(req.params.catalogo)
            .then(item => item.$set('Marca', req.params.marca))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarCatalogomarcas', res))

    //* 12
    desligarmarcas = (req: Request, res: Response, next: NextFunction) =>
        Catalogo.findById(req.params.catalogo)
            .then(item => item.$remove('Marca', req.params.marca))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarCatalogomarcas', res))


    
}