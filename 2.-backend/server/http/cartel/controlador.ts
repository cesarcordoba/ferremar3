
const errorHandler = require('../error');
const _ = require('lodash');

import { Cartel } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class CartelController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Cartel.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearCartel', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Cartel.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarCartel', res))
        :
        Cartel.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarCartel', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Cartel.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarCartel', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Cartel.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarCartel', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Cartel.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionCartel', res))


    //* 41
    xanuncio = (req: Request, res: Response, next: NextFunction) =>
        Cartel.findAll(
            { where : { 'IdAnuncio' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xCartelanuncios', res))

    //* 41
    anuncio = (req: Request, res: Response, next: NextFunction) =>
        Cartel.findById(req.params.id )
            .then(item => item.$get('Anuncio'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Cartelanuncios', res))

    //* 41
    ligaranuncios = (req: Request, res: Response, next: NextFunction) =>
        Cartel.findById(req.params.cartel)
            .then(item => item.$set('Anuncio', req.params.anuncio))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarCartelanuncios', res))

    //* 41
    desligaranuncios = (req: Request, res: Response, next: NextFunction) =>
        Cartel.findById(req.params.cartel)
            .then(item => item.$remove('Anuncio', req.params.anuncio))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarCartelanuncios', res))


    
}