
const asignarPrincipal = require('./asignarPrincipal/asignarPrincipal');
    
const errorHandler = require('../error');
const _ = require('lodash');

import { Direccion } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class DireccionController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Direccion.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearDireccion', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Direccion.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarDireccion', res))
        :
        Direccion.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarDireccion', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Direccion.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarDireccion', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Direccion.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarDireccion', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Direccion.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionDireccion', res))


    //* 31
    xusuario = (req: Request, res: Response, next: NextFunction) =>
        Direccion.findAll(
            { where : { 'IdUsuario' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xDireccionusuarios', res))

    //* 31
    usuario = (req: Request, res: Response, next: NextFunction) =>
        Direccion.findById(req.params.id )
            .then(item => item.$get('Usuario'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Direccionusuarios', res))

    //* 31
    ligarusuarios = (req: Request, res: Response, next: NextFunction) =>
        Direccion.findById(req.params.direccion)
            .then(item => item.$set('Usuario', req.params.usuario))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarDireccionusuarios', res))

    //* 31
    desligarusuarios = (req: Request, res: Response, next: NextFunction) =>
        Direccion.findById(req.params.direccion)
            .then(item => item.$remove('Usuario', req.params.usuario))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarDireccionusuarios', res))


    
    //* 33
    ordenes = (req: Request, res: Response, next: NextFunction) =>
        Direccion.findById(req.params.id)
            .then(item => item.$get('Ordenes'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Direccionordenes', res))

    //* 33
    ligarordenes = (req: Request, res: Response, next: NextFunction) =>
        Direccion.findById(req.params.direccion)
            .then(item => item.$add('Ordenes', req.params.orden))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarDireccionordenes', res))

    //* 33
    desligarordenes = (req: Request, res: Response, next: NextFunction) =>
        Direccion.findById(req.params.direccion)
            .then(item => item.$remove('Ordenes', req.params.orden))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarDireccionordenes', res))

    
    asignarPrincipal = (req: Request, res: Response, next: NextFunction) =>
        asignarPrincipal(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Direccion_asignarPrincipal', res))
    
}