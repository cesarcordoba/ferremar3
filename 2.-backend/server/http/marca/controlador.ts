
const disponibles = require('./disponibles/disponibles');
    
const xNombre = require('./xNombre/xNombre');
    
const errorHandler = require('../error');
const _ = require('lodash');

import { Marca } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class MarcaController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Marca.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearMarca', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Marca.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarMarca', res))
        :
        Marca.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarMarca', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Marca.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarMarca', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Marca.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarMarca', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Marca.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionMarca', res))


    //* 1
    productos = (req: Request, res: Response, next: NextFunction) =>
        Marca.findById(req.params.id)
            .then(item => item.$get('Productos'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Marcaproductos', res))

    //* 1
    ligarproductos = (req: Request, res: Response, next: NextFunction) =>
        Marca.findById(req.params.marca)
            .then(item => item.$add('Productos', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarMarcaproductos', res))

    //* 1
    desligarproductos = (req: Request, res: Response, next: NextFunction) =>
        Marca.findById(req.params.marca)
            .then(item => item.$remove('Productos', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarMarcaproductos', res))

    
    //* 13
    gamas = (req: Request, res: Response, next: NextFunction) =>
        Marca.findById(req.params.id)
            .then(item => item.$get('Gamas'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Marcagamas', res))

    //* 13
    ligargamas = (req: Request, res: Response, next: NextFunction) =>
        Marca.findById(req.params.marca)
            .then(item => item.$add('Gamas', req.params.gama))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarMarcagamas', res))

    //* 13
    desligargamas = (req: Request, res: Response, next: NextFunction) =>
        Marca.findById(req.params.marca)
            .then(item => item.$remove('Gamas', req.params.gama))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarMarcagamas', res))

    
    //* 14
    lineas = (req: Request, res: Response, next: NextFunction) =>
        Marca.findById(req.params.id)
            .then(item => item.$get('Lineas'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Marcalineas', res))

    //* 14
    ligarlineas = (req: Request, res: Response, next: NextFunction) =>
        Marca.findById(req.params.marca)
            .then(item => item.$add('Lineas', req.params.linea))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarMarcalineas', res))

    //* 14
    desligarlineas = (req: Request, res: Response, next: NextFunction) =>
        Marca.findById(req.params.marca)
            .then(item => item.$remove('Lineas', req.params.linea))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarMarcalineas', res))

    
    //* 15
    margenes = (req: Request, res: Response, next: NextFunction) =>
        Marca.findById(req.params.id)
            .then(item => item.$get('Margenes'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Marcamargenes', res))

    //* 15
    ligarmargenes = (req: Request, res: Response, next: NextFunction) =>
        Marca.findById(req.params.marca)
            .then(item => item.$add('Margenes', req.params.margen))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarMarcamargenes', res))

    //* 15
    desligarmargenes = (req: Request, res: Response, next: NextFunction) =>
        Marca.findById(req.params.marca)
            .then(item => item.$remove('Margenes', req.params.margen))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarMarcamargenes', res))

    
    //* 16
    catalogos = (req: Request, res: Response, next: NextFunction) =>
        Marca.findById(req.params.id)
            .then(item => item.$get('Catalogos'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Marcacatalogos', res))

    //* 16
    ligarcatalogos = (req: Request, res: Response, next: NextFunction) =>
        Marca.findById(req.params.marca)
            .then(item => item.$add('Catalogos', req.params.catalogo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarMarcacatalogos', res))

    //* 16
    desligarcatalogos = (req: Request, res: Response, next: NextFunction) =>
        Marca.findById(req.params.marca)
            .then(item => item.$remove('Catalogos', req.params.catalogo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarMarcacatalogos', res))

    
    disponibles = (req: Request, res: Response, next: NextFunction) =>
        disponibles(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Marca_disponibles', res))
    
    xNombre = (req: Request, res: Response, next: NextFunction) =>
        xNombre(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Marca_xNombre', res))
    
}