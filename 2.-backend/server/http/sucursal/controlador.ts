
const errorHandler = require('../error');
const _ = require('lodash');

import { Sucursal } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class SucursalController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Sucursal.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearSucursal', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Sucursal.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarSucursal', res))
        :
        Sucursal.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarSucursal', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Sucursal.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarSucursal', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Sucursal.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarSucursal', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Sucursal.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionSucursal', res))



    //* 31
    usuario = (req: Request, res: Response, next: NextFunction) =>
        Sucursal.findById(req.params.id )
            .then(item => item.$get('Usuario'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Sucursalusuarios', res))

    //* 31
    ligarusuarios = (req: Request, res: Response, next: NextFunction) =>
        Sucursal.findById(req.params.sucursal)
            .then(item => item.$set('Usuario', req.params.usuario))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarSucursalusuarios', res))

    //* 31
    desligarusuarios = (req: Request, res: Response, next: NextFunction) =>
        Sucursal.findById(req.params.sucursal)
            .then(item => item.$remove('Usuario', req.params.usuario))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarSucursalusuarios', res))


    
    //* 33
    ordenes = (req: Request, res: Response, next: NextFunction) =>
        Sucursal.findById(req.params.id)
            .then(item => item.$get('Ordenes'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Sucursalordenes', res))

    //* 33
    ligarordenes = (req: Request, res: Response, next: NextFunction) =>
        Sucursal.findById(req.params.sucursal)
            .then(item => item.$add('Ordenes', req.params.orden))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarSucursalordenes', res))

    //* 33
    desligarordenes = (req: Request, res: Response, next: NextFunction) =>
        Sucursal.findById(req.params.sucursal)
            .then(item => item.$remove('Ordenes', req.params.orden))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarSucursalordenes', res))

    
    //* 23
    versiones = (req: Request, res: Response, next: NextFunction) =>
        Sucursal.findById(req.params.id)
            .then(item => item.$get('Versiones'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'SucursalVersiones', res))

    //* 23
    ligarversiones = (req: Request, res: Response, next: NextFunction) =>
        Sucursal.findById(req.params.sucursal)
            .then(item => item.$add('Versiones', req.params.version, { through :  req.body ? req.body : null }))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarSucursalVersiones', res))

    //* 23
    desligarversiones = (req: Request, res: Response, next: NextFunction) =>
        Sucursal.findById(req.params.sucursal)
            .then(item => item.$remove('Versiones', req.params.version))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarSucursalVersiones', res))

                
}