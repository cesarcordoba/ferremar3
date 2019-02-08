
const errorHandler = require('../error');
const _ = require('lodash');

import { Transaccion } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class TransaccionController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Transaccion.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearTransaccion', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Transaccion.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarTransaccion', res))
        :
        Transaccion.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarTransaccion', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Transaccion.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarTransaccion', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Transaccion.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarTransaccion', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Transaccion.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionTransaccion', res))


    //* 9
    xversion = (req: Request, res: Response, next: NextFunction) =>
        Transaccion.findAll(
            { where : { 'IdVersion' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xTransaccionversiones', res))

    //* 9
    version = (req: Request, res: Response, next: NextFunction) =>
        Transaccion.findById(req.params.id )
            .then(item => item.$get('Version'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Transaccionversiones', res))

    //* 9
    ligarversiones = (req: Request, res: Response, next: NextFunction) =>
        Transaccion.findById(req.params.transaccion)
            .then(item => item.$set('Version', req.params.version))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarTransaccionversiones', res))

    //* 9
    desligarversiones = (req: Request, res: Response, next: NextFunction) =>
        Transaccion.findById(req.params.transaccion)
            .then(item => item.$remove('Version', req.params.version))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarTransaccionversiones', res))


    
    //* 15
    margenes = (req: Request, res: Response, next: NextFunction) =>
        Transaccion.findById(req.params.id)
            .then(item => item.$get('Margenes'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Transaccionmargenes', res))

    //* 15
    ligarmargenes = (req: Request, res: Response, next: NextFunction) =>
        Transaccion.findById(req.params.transaccion)
            .then(item => item.$add('Margenes', req.params.margen))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarTransaccionmargenes', res))

    //* 15
    desligarmargenes = (req: Request, res: Response, next: NextFunction) =>
        Transaccion.findById(req.params.transaccion)
            .then(item => item.$remove('Margenes', req.params.margen))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarTransaccionmargenes', res))

    
    //* 17
    xpromo = (req: Request, res: Response, next: NextFunction) =>
        Transaccion.findAll(
            { where : { 'IdPromo' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xTransaccionpromos', res))

    //* 17
    promo = (req: Request, res: Response, next: NextFunction) =>
        Transaccion.findById(req.params.id )
            .then(item => item.$get('Promo'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Transaccionpromos', res))

    //* 17
    ligarpromos = (req: Request, res: Response, next: NextFunction) =>
        Transaccion.findById(req.params.transaccion)
            .then(item => item.$set('Promo', req.params.promo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarTransaccionpromos', res))

    //* 17
    desligarpromos = (req: Request, res: Response, next: NextFunction) =>
        Transaccion.findById(req.params.transaccion)
            .then(item => item.$remove('Promo', req.params.promo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarTransaccionpromos', res))


    
    //* 19
    descuentos = (req: Request, res: Response, next: NextFunction) =>
        Transaccion.findById(req.params.id)
            .then(item => item.$get('Descuentos'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Transacciondescuentos', res))

    //* 19
    ligardescuentos = (req: Request, res: Response, next: NextFunction) =>
        Transaccion.findById(req.params.transaccion)
            .then(item => item.$add('Descuentos', req.params.descuento))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarTransacciondescuentos', res))

    //* 19
    desligardescuentos = (req: Request, res: Response, next: NextFunction) =>
        Transaccion.findById(req.params.transaccion)
            .then(item => item.$remove('Descuentos', req.params.descuento))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarTransacciondescuentos', res))

    
    //* 24
    xprecio = (req: Request, res: Response, next: NextFunction) =>
        Transaccion.findAll(
            { where : { 'IdPrecio' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xTransaccionprecios', res))

    //* 24
    precio = (req: Request, res: Response, next: NextFunction) =>
        Transaccion.findById(req.params.id )
            .then(item => item.$get('Precio'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Transaccionprecios', res))

    //* 24
    ligarprecios = (req: Request, res: Response, next: NextFunction) =>
        Transaccion.findById(req.params.transaccion)
            .then(item => item.$set('Precio', req.params.precio))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarTransaccionprecios', res))

    //* 24
    desligarprecios = (req: Request, res: Response, next: NextFunction) =>
        Transaccion.findById(req.params.transaccion)
            .then(item => item.$remove('Precio', req.params.precio))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarTransaccionprecios', res))


    
    //* 33
    xorden = (req: Request, res: Response, next: NextFunction) =>
        Transaccion.findAll(
            { where : { 'IdOrden' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xTransaccionordenes', res))

    //* 33
    orden = (req: Request, res: Response, next: NextFunction) =>
        Transaccion.findById(req.params.id )
            .then(item => item.$get('Orden'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Transaccionordenes', res))

    //* 33
    ligarordenes = (req: Request, res: Response, next: NextFunction) =>
        Transaccion.findById(req.params.transaccion)
            .then(item => item.$set('Orden', req.params.orden))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarTransaccionordenes', res))

    //* 33
    desligarordenes = (req: Request, res: Response, next: NextFunction) =>
        Transaccion.findById(req.params.transaccion)
            .then(item => item.$remove('Orden', req.params.orden))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarTransaccionordenes', res))


    
    //* 43
    xentrega = (req: Request, res: Response, next: NextFunction) =>
        Transaccion.findAll(
            { where : { 'IdEntrega' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xTransaccionentregas', res))

    //* 43
    entrega = (req: Request, res: Response, next: NextFunction) =>
        Transaccion.findById(req.params.id )
            .then(item => item.$get('Entrega'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Transaccionentregas', res))

    //* 43
    ligarentregas = (req: Request, res: Response, next: NextFunction) =>
        Transaccion.findById(req.params.transaccion)
            .then(item => item.$set('Entrega', req.params.entrega))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarTransaccionentregas', res))

    //* 43
    desligarentregas = (req: Request, res: Response, next: NextFunction) =>
        Transaccion.findById(req.params.transaccion)
            .then(item => item.$remove('Entrega', req.params.entrega))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarTransaccionentregas', res))


    
}