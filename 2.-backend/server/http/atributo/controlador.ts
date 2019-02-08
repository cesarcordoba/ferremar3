
const errorHandler = require('../error');
const _ = require('lodash');

import { Atributo } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class AtributoController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Atributo.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearAtributo', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Atributo.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarAtributo', res))
        :
        Atributo.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarAtributo', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Atributo.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarAtributo', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Atributo.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarAtributo', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Atributo.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionAtributo', res))


    //* 2
    categorias = (req: Request, res: Response, next: NextFunction) =>
        Atributo.findById(req.params.id)
            .then(item => item.$get('Categorias'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Atributocategorias', res))

    //* 2
    ligarcategorias = (req: Request, res: Response, next: NextFunction) =>
        Atributo.findById(req.params.atributo)
            .then(item => item.$add('Categorias', req.params.categoria))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarAtributocategorias', res))

    //* 2
    desligarcategorias = (req: Request, res: Response, next: NextFunction) =>
        Atributo.findById(req.params.atributo)
            .then(item => item.$remove('Categorias', req.params.categoria))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarAtributocategorias', res))

    
    //* 11
    opciones = (req: Request, res: Response, next: NextFunction) =>
        Atributo.findById(req.params.id)
            .then(item => item.$get('Opciones'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Atributoopciones', res))

    //* 11
    ligaropciones = (req: Request, res: Response, next: NextFunction) =>
        Atributo.findById(req.params.atributo)
            .then(item => item.$add('Opciones', req.params.opcion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarAtributoopciones', res))

    //* 11
    desligaropciones = (req: Request, res: Response, next: NextFunction) =>
        Atributo.findById(req.params.atributo)
            .then(item => item.$remove('Opciones', req.params.opcion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarAtributoopciones', res))

    
}