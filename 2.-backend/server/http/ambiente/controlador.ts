
const errorHandler = require('../error');
const _ = require('lodash');

import { Ambiente } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class AmbienteController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Ambiente.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearAmbiente', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Ambiente.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarAmbiente', res))
        :
        Ambiente.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarAmbiente', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Ambiente.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarAmbiente', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Ambiente.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarAmbiente', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Ambiente.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionAmbiente', res))


    //* 29
    xcuarto = (req: Request, res: Response, next: NextFunction) =>
        Ambiente.findAll(
            { where : { 'IdCuarto' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xAmbientecuartos', res))

    //* 29
    cuarto = (req: Request, res: Response, next: NextFunction) =>
        Ambiente.findById(req.params.id )
            .then(item => item.$get('Cuarto'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Ambientecuartos', res))

    //* 29
    ligarcuartos = (req: Request, res: Response, next: NextFunction) =>
        Ambiente.findById(req.params.ambiente)
            .then(item => item.$set('Cuarto', req.params.cuarto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarAmbientecuartos', res))

    //* 29
    desligarcuartos = (req: Request, res: Response, next: NextFunction) =>
        Ambiente.findById(req.params.ambiente)
            .then(item => item.$remove('Cuarto', req.params.cuarto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarAmbientecuartos', res))


    
    //* 30
    espacios = (req: Request, res: Response, next: NextFunction) =>
        Ambiente.findById(req.params.id)
            .then(item => item.$get('Espacios'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Ambienteespacios', res))

    //* 30
    ligarespacios = (req: Request, res: Response, next: NextFunction) =>
        Ambiente.findById(req.params.ambiente)
            .then(item => item.$add('Espacios', req.params.espacio))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarAmbienteespacios', res))

    //* 30
    desligarespacios = (req: Request, res: Response, next: NextFunction) =>
        Ambiente.findById(req.params.ambiente)
            .then(item => item.$remove('Espacios', req.params.espacio))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarAmbienteespacios', res))

    
    //* 28
    productos = (req: Request, res: Response, next: NextFunction) =>
        Ambiente.findById(req.params.id)
            .then(item => item.$get('Productos'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'AmbienteProductos', res))

    //* 28
    ligarproductos = (req: Request, res: Response, next: NextFunction) =>
        Ambiente.findById(req.params.ambiente)
            .then(item => item.$add('Productos', req.params.producto, { through :  req.body ? req.body : null }))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarAmbienteProductos', res))

    //* 28
    desligarproductos = (req: Request, res: Response, next: NextFunction) =>
        Ambiente.findById(req.params.ambiente)
            .then(item => item.$remove('Productos', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarAmbienteProductos', res))

                
}