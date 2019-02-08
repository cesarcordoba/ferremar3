
const errorHandler = require('../error');
const _ = require('lodash');

import { Oferta } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class OfertaController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Oferta.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearOferta', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Oferta.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarOferta', res))
        :
        Oferta.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarOferta', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Oferta.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarOferta', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Oferta.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarOferta', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Oferta.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionOferta', res))


    //* 17
    xpromo = (req: Request, res: Response, next: NextFunction) =>
        Oferta.findAll(
            { where : { 'IdPromo' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xOfertapromos', res))

    //* 17
    promo = (req: Request, res: Response, next: NextFunction) =>
        Oferta.findById(req.params.id )
            .then(item => item.$get('Promo'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Ofertapromos', res))

    //* 17
    ligarpromos = (req: Request, res: Response, next: NextFunction) =>
        Oferta.findById(req.params.oferta)
            .then(item => item.$set('Promo', req.params.promo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarOfertapromos', res))

    //* 17
    desligarpromos = (req: Request, res: Response, next: NextFunction) =>
        Oferta.findById(req.params.oferta)
            .then(item => item.$remove('Promo', req.params.promo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarOfertapromos', res))


    
    //* 21
    salientes = (req: Request, res: Response, next: NextFunction) =>
        Oferta.findById(req.params.id)
            .then(item => item.$get('Salientes'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'OfertaSalientes', res))

    //* 21
    ligarsalientes = (req: Request, res: Response, next: NextFunction) =>
        Oferta.findById(req.params.oferta)
            .then(item => item.$add('Salientes', req.params.version, { through :  req.body ? req.body : null }))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarOfertaSalientes', res))

    //* 21
    desligarsalientes = (req: Request, res: Response, next: NextFunction) =>
        Oferta.findById(req.params.oferta)
            .then(item => item.$remove('Salientes', req.params.version))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarOfertaSalientes', res))

                
    //* 22
    entrantes = (req: Request, res: Response, next: NextFunction) =>
        Oferta.findById(req.params.id)
            .then(item => item.$get('Entrantes'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'OfertaEntrantes', res))

    //* 22
    ligarentrantes = (req: Request, res: Response, next: NextFunction) =>
        Oferta.findById(req.params.oferta)
            .then(item => item.$add('Entrantes', req.params.version, { through :  req.body ? req.body : null }))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarOfertaEntrantes', res))

    //* 22
    desligarentrantes = (req: Request, res: Response, next: NextFunction) =>
        Oferta.findById(req.params.oferta)
            .then(item => item.$remove('Entrantes', req.params.version))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarOfertaEntrantes', res))

                
}