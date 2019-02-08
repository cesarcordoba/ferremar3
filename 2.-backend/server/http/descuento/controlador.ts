
const errorHandler = require('../error');
const _ = require('lodash');

import { Descuento } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class DescuentoController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Descuento.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearDescuento', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Descuento.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarDescuento', res))
        :
        Descuento.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarDescuento', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Descuento.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarDescuento', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Descuento.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarDescuento', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Descuento.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionDescuento', res))


    //* 9
    versiones = (req: Request, res: Response, next: NextFunction) =>
        Descuento.findById(req.params.id)
            .then(item => item.$get('Versiones'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Descuentoversiones', res))

    //* 9
    ligarversiones = (req: Request, res: Response, next: NextFunction) =>
        Descuento.findById(req.params.descuento)
            .then(item => item.$add('Versiones', req.params.version))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarDescuentoversiones', res))

    //* 9
    desligarversiones = (req: Request, res: Response, next: NextFunction) =>
        Descuento.findById(req.params.descuento)
            .then(item => item.$remove('Versiones', req.params.version))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarDescuentoversiones', res))

    
    //* 17
    xpromo = (req: Request, res: Response, next: NextFunction) =>
        Descuento.findAll(
            { where : { 'IdPromo' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xDescuentopromos', res))

    //* 17
    promo = (req: Request, res: Response, next: NextFunction) =>
        Descuento.findById(req.params.id )
            .then(item => item.$get('Promo'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Descuentopromos', res))

    //* 17
    ligarpromos = (req: Request, res: Response, next: NextFunction) =>
        Descuento.findById(req.params.descuento)
            .then(item => item.$set('Promo', req.params.promo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarDescuentopromos', res))

    //* 17
    desligarpromos = (req: Request, res: Response, next: NextFunction) =>
        Descuento.findById(req.params.descuento)
            .then(item => item.$remove('Promo', req.params.promo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarDescuentopromos', res))


    
    //* 32
    transacciones = (req: Request, res: Response, next: NextFunction) =>
        Descuento.findById(req.params.id)
            .then(item => item.$get('Transacciones'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Descuentotransacciones', res))

    //* 32
    ligartransacciones = (req: Request, res: Response, next: NextFunction) =>
        Descuento.findById(req.params.descuento)
            .then(item => item.$add('Transacciones', req.params.transaccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarDescuentotransacciones', res))

    //* 32
    desligartransacciones = (req: Request, res: Response, next: NextFunction) =>
        Descuento.findById(req.params.descuento)
            .then(item => item.$remove('Transacciones', req.params.transaccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarDescuentotransacciones', res))

    
}