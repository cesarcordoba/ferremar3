
const verificarProducto = require('./verificarProducto/verificarProducto');
    
const errorHandler = require('../error');
const _ = require('lodash');

import { Promo } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class PromoController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Promo.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearPromo', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Promo.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarPromo', res))
        :
        Promo.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarPromo', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Promo.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarPromo', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Promo.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarPromo', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Promo.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionPromo', res))


    //* 19
    descuentos = (req: Request, res: Response, next: NextFunction) =>
        Promo.findById(req.params.id)
            .then(item => item.$get('Descuentos'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Promodescuentos', res))

    //* 19
    ligardescuentos = (req: Request, res: Response, next: NextFunction) =>
        Promo.findById(req.params.promo)
            .then(item => item.$add('Descuentos', req.params.descuento))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarPromodescuentos', res))

    //* 19
    desligardescuentos = (req: Request, res: Response, next: NextFunction) =>
        Promo.findById(req.params.promo)
            .then(item => item.$remove('Descuentos', req.params.descuento))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarPromodescuentos', res))

    
    //* 20
    ofertas = (req: Request, res: Response, next: NextFunction) =>
        Promo.findById(req.params.id)
            .then(item => item.$get('Ofertas'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Promoofertas', res))

    //* 20
    ligarofertas = (req: Request, res: Response, next: NextFunction) =>
        Promo.findById(req.params.promo)
            .then(item => item.$add('Ofertas', req.params.oferta))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarPromoofertas', res))

    //* 20
    desligarofertas = (req: Request, res: Response, next: NextFunction) =>
        Promo.findById(req.params.promo)
            .then(item => item.$remove('Ofertas', req.params.oferta))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarPromoofertas', res))

    
    //* 32
    transacciones = (req: Request, res: Response, next: NextFunction) =>
        Promo.findById(req.params.id)
            .then(item => item.$get('Transacciones'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Promotransacciones', res))

    //* 32
    ligartransacciones = (req: Request, res: Response, next: NextFunction) =>
        Promo.findById(req.params.promo)
            .then(item => item.$add('Transacciones', req.params.transaccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarPromotransacciones', res))

    //* 32
    desligartransacciones = (req: Request, res: Response, next: NextFunction) =>
        Promo.findById(req.params.promo)
            .then(item => item.$remove('Transacciones', req.params.transaccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarPromotransacciones', res))

    
    //* 18
    productos = (req: Request, res: Response, next: NextFunction) =>
        Promo.findById(req.params.id)
            .then(item => item.$get('Productos'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'PromoProductos', res))

    //* 18
    ligarproductos = (req: Request, res: Response, next: NextFunction) =>
        Promo.findById(req.params.promo)
            .then(item => item.$add('Productos', req.params.producto, { through :  req.body ? req.body : null }))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarPromoProductos', res))

    //* 18
    desligarproductos = (req: Request, res: Response, next: NextFunction) =>
        Promo.findById(req.params.promo)
            .then(item => item.$remove('Productos', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarPromoProductos', res))

                
    verificarProducto = (req: Request, res: Response, next: NextFunction) =>
        verificarProducto(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Promo_verificarProducto', res))
    
}