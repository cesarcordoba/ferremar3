
const errorHandler = require('../error');
const _ = require('lodash');

import { Avatar } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class AvatarController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Avatar.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearAvatar', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Avatar.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarAvatar', res))
        :
        Avatar.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarAvatar', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Avatar.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarAvatar', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Avatar.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarAvatar', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Avatar.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionAvatar', res))


    //* 31
    xusuario = (req: Request, res: Response, next: NextFunction) =>
        Avatar.findAll(
            { where : { 'IdUsuario' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xAvatarusuarios', res))

    //* 31
    usuario = (req: Request, res: Response, next: NextFunction) =>
        Avatar.findById(req.params.id )
            .then(item => item.$get('Usuario'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Avatarusuarios', res))

    //* 31
    ligarusuarios = (req: Request, res: Response, next: NextFunction) =>
        Avatar.findById(req.params.avatar)
            .then(item => item.$set('Usuario', req.params.usuario))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarAvatarusuarios', res))

    //* 31
    desligarusuarios = (req: Request, res: Response, next: NextFunction) =>
        Avatar.findById(req.params.avatar)
            .then(item => item.$remove('Usuario', req.params.usuario))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarAvatarusuarios', res))


    
}