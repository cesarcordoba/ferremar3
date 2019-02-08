
const errorHandler = require('../error');
const _ = require('lodash');

import { Cargo } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class CargoController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Cargo.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearCargo', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Cargo.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarCargo', res))
        :
        Cargo.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarCargo', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Cargo.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarCargo', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Cargo.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarCargo', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Cargo.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionCargo', res))


    //* 33
    xorden = (req: Request, res: Response, next: NextFunction) =>
        Cargo.findAll(
            { where : { 'IdOrden' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xCargoordenes', res))

    //* 33
    orden = (req: Request, res: Response, next: NextFunction) =>
        Cargo.findById(req.params.id )
            .then(item => item.$get('Orden'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Cargoordenes', res))

    //* 33
    ligarordenes = (req: Request, res: Response, next: NextFunction) =>
        Cargo.findById(req.params.cargo)
            .then(item => item.$set('Orden', req.params.orden))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarCargoordenes', res))

    //* 33
    desligarordenes = (req: Request, res: Response, next: NextFunction) =>
        Cargo.findById(req.params.cargo)
            .then(item => item.$remove('Orden', req.params.orden))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarCargoordenes', res))


    
    //* 40
    xtarjeta = (req: Request, res: Response, next: NextFunction) =>
        Cargo.findAll(
            { where : { 'IdTarjeta' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xCargotarjetas', res))

    //* 40
    tarjeta = (req: Request, res: Response, next: NextFunction) =>
        Cargo.findById(req.params.id )
            .then(item => item.$get('Tarjeta'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Cargotarjetas', res))

    //* 40
    ligartarjetas = (req: Request, res: Response, next: NextFunction) =>
        Cargo.findById(req.params.cargo)
            .then(item => item.$set('Tarjeta', req.params.tarjeta))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarCargotarjetas', res))

    //* 40
    desligartarjetas = (req: Request, res: Response, next: NextFunction) =>
        Cargo.findById(req.params.cargo)
            .then(item => item.$remove('Tarjeta', req.params.tarjeta))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarCargotarjetas', res))


    
}