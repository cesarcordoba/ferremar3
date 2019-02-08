
const errorHandler = require('../error');
const _ = require('lodash');

import { Opcion } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class OpcionController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Opcion.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearOpcion', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Opcion.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarOpcion', res))
        :
        Opcion.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarOpcion', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Opcion.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarOpcion', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Opcion.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarOpcion', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Opcion.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionOpcion', res))


    //* 9
    versiones = (req: Request, res: Response, next: NextFunction) =>
        Opcion.findById(req.params.id)
            .then(item => item.$get('Versiones'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Opcionversiones', res))

    //* 9
    ligarversiones = (req: Request, res: Response, next: NextFunction) =>
        Opcion.findById(req.params.opcion)
            .then(item => item.$add('Versiones', req.params.version))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarOpcionversiones', res))

    //* 9
    desligarversiones = (req: Request, res: Response, next: NextFunction) =>
        Opcion.findById(req.params.opcion)
            .then(item => item.$remove('Versiones', req.params.version))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarOpcionversiones', res))

    
    //* 10
    xatributo = (req: Request, res: Response, next: NextFunction) =>
        Opcion.findAll(
            { where : { 'IdAtributo' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xOpcionatributos', res))

    //* 10
    atributo = (req: Request, res: Response, next: NextFunction) =>
        Opcion.findById(req.params.id )
            .then(item => item.$get('Atributo'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Opcionatributos', res))

    //* 10
    ligaratributos = (req: Request, res: Response, next: NextFunction) =>
        Opcion.findById(req.params.opcion)
            .then(item => item.$set('Atributo', req.params.atributo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarOpcionatributos', res))

    //* 10
    desligaratributos = (req: Request, res: Response, next: NextFunction) =>
        Opcion.findById(req.params.opcion)
            .then(item => item.$remove('Atributo', req.params.atributo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarOpcionatributos', res))


    
}