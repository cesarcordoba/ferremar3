
const errorHandler = require('../error');
const _ = require('lodash');

import { Precio } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class PrecioController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Precio.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearPrecio', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Precio.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarPrecio', res))
        :
        Precio.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarPrecio', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Precio.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarPrecio', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Precio.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarPrecio', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Precio.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionPrecio', res))


    //* 32
    transacciones = (req: Request, res: Response, next: NextFunction) =>
        Precio.findById(req.params.id)
            .then(item => item.$get('Transacciones'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Preciotransacciones', res))

    //* 32
    ligartransacciones = (req: Request, res: Response, next: NextFunction) =>
        Precio.findById(req.params.precio)
            .then(item => item.$add('Transacciones', req.params.transaccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarPreciotransacciones', res))

    //* 32
    desligartransacciones = (req: Request, res: Response, next: NextFunction) =>
        Precio.findById(req.params.precio)
            .then(item => item.$remove('Transacciones', req.params.transaccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarPreciotransacciones', res))

    
    //* 46
    inventarios = (req: Request, res: Response, next: NextFunction) =>
        Precio.findById(req.params.id)
            .then(item => item.$get('Inventarios'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'PrecioInventarios', res))

    //* 46
    ligarinventarios = (req: Request, res: Response, next: NextFunction) =>
        Precio.findById(req.params.precio)
            .then(item => item.$add('Inventarios', req.params.inventario, { through :  req.body ? req.body : null }))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarPrecioInventarios', res))

    //* 46
    desligarinventarios = (req: Request, res: Response, next: NextFunction) =>
        Precio.findById(req.params.precio)
            .then(item => item.$remove('Inventarios', req.params.inventario))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarPrecioInventarios', res))

                
}