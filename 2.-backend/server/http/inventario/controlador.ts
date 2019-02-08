
const sincronizarStatus = require('./sincronizarStatus/sincronizarStatus');
    
const cambiarStatus = require('./cambiarStatus/cambiarStatus');
    
const sincronizarPrecios = require('./sincronizarPrecios/sincronizarPrecios');
    
const errorHandler = require('../error');
const _ = require('lodash');

import { Inventario } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class InventarioController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Inventario.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearInventario', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Inventario.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarInventario', res))
        :
        Inventario.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarInventario', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Inventario.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarInventario', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Inventario.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarInventario', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Inventario.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionInventario', res))


    //* 26
    existencias = (req: Request, res: Response, next: NextFunction) =>
        Inventario.findById(req.params.id)
            .then(item => item.$get('Existencias'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Inventarioexistencias', res))

    //* 26
    ligarexistencias = (req: Request, res: Response, next: NextFunction) =>
        Inventario.findById(req.params.inventario)
            .then(item => item.$add('Existencias', req.params.existencia))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarInventarioexistencias', res))

    //* 26
    desligarexistencias = (req: Request, res: Response, next: NextFunction) =>
        Inventario.findById(req.params.inventario)
            .then(item => item.$remove('Existencias', req.params.existencia))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarInventarioexistencias', res))

    
    //* 44
    margenes = (req: Request, res: Response, next: NextFunction) =>
        Inventario.findById(req.params.id)
            .then(item => item.$get('Margenes'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'InventarioMargenes', res))

    //* 44
    ligarmargenes = (req: Request, res: Response, next: NextFunction) =>
        Inventario.findById(req.params.inventario)
            .then(item => item.$add('Margenes', req.params.margen, { through :  req.body ? req.body : null }))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarInventarioMargenes', res))

    //* 44
    desligarmargenes = (req: Request, res: Response, next: NextFunction) =>
        Inventario.findById(req.params.inventario)
            .then(item => item.$remove('Margenes', req.params.margen))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarInventarioMargenes', res))

                
    //* 46
    precios = (req: Request, res: Response, next: NextFunction) =>
        Inventario.findById(req.params.id)
            .then(item => item.$get('Precios'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'InventarioPrecios', res))

    //* 46
    ligarprecios = (req: Request, res: Response, next: NextFunction) =>
        Inventario.findById(req.params.inventario)
            .then(item => item.$add('Precios', req.params.precio, { through :  req.body ? req.body : null }))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarInventarioPrecios', res))

    //* 46
    desligarprecios = (req: Request, res: Response, next: NextFunction) =>
        Inventario.findById(req.params.inventario)
            .then(item => item.$remove('Precios', req.params.precio))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarInventarioPrecios', res))

                
    sincronizarStatus = (req: Request, res: Response, next: NextFunction) =>
        sincronizarStatus(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Inventario_sincronizarStatus', res))
    
    cambiarStatus = (req: Request, res: Response, next: NextFunction) =>
        cambiarStatus(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Inventario_cambiarStatus', res))
    
    sincronizarPrecios = (req: Request, res: Response, next: NextFunction) =>
        sincronizarPrecios(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Inventario_sincronizarPrecios', res))
    
}