
const errorHandler = require('../error');
const _ = require('lodash');

import { Entrega } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class EntregaController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Entrega.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearEntrega', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Entrega.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarEntrega', res))
        :
        Entrega.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarEntrega', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Entrega.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarEntrega', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Entrega.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarEntrega', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Entrega.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionEntrega', res))


    //* 32
    transacciones = (req: Request, res: Response, next: NextFunction) =>
        Entrega.findById(req.params.id)
            .then(item => item.$get('Transacciones'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Entregatransacciones', res))

    //* 32
    ligartransacciones = (req: Request, res: Response, next: NextFunction) =>
        Entrega.findById(req.params.entrega)
            .then(item => item.$add('Transacciones', req.params.transaccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarEntregatransacciones', res))

    //* 32
    desligartransacciones = (req: Request, res: Response, next: NextFunction) =>
        Entrega.findById(req.params.entrega)
            .then(item => item.$remove('Transacciones', req.params.transaccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarEntregatransacciones', res))

    
    //* 33
    xorden = (req: Request, res: Response, next: NextFunction) =>
        Entrega.findAll(
            { where : { 'IdOrden' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xEntregaordenes', res))

    //* 33
    orden = (req: Request, res: Response, next: NextFunction) =>
        Entrega.findById(req.params.id )
            .then(item => item.$get('Orden'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Entregaordenes', res))

    //* 33
    ligarordenes = (req: Request, res: Response, next: NextFunction) =>
        Entrega.findById(req.params.entrega)
            .then(item => item.$set('Orden', req.params.orden))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarEntregaordenes', res))

    //* 33
    desligarordenes = (req: Request, res: Response, next: NextFunction) =>
        Entrega.findById(req.params.entrega)
            .then(item => item.$remove('Orden', req.params.orden))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarEntregaordenes', res))


    
}