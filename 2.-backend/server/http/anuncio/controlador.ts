
const errorHandler = require('../error');
const _ = require('lodash');

import { Anuncio } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class AnuncioController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Anuncio.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearAnuncio', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Anuncio.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarAnuncio', res))
        :
        Anuncio.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarAnuncio', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Anuncio.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarAnuncio', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Anuncio.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarAnuncio', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Anuncio.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionAnuncio', res))


    //* 42
    carteles = (req: Request, res: Response, next: NextFunction) =>
        Anuncio.findById(req.params.id)
            .then(item => item.$get('Carteles'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Anunciocarteles', res))

    //* 42
    ligarcarteles = (req: Request, res: Response, next: NextFunction) =>
        Anuncio.findById(req.params.anuncio)
            .then(item => item.$add('Carteles', req.params.cartel))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarAnunciocarteles', res))

    //* 42
    desligarcarteles = (req: Request, res: Response, next: NextFunction) =>
        Anuncio.findById(req.params.anuncio)
            .then(item => item.$remove('Carteles', req.params.cartel))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarAnunciocarteles', res))

    
}