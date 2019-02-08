
const setFavoritos = require('./setFavoritos/setFavoritos');
    
const errorHandler = require('../error');
const _ = require('lodash');

import { Usuario } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class UsuarioController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Usuario.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearUsuario', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Usuario.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarUsuario', res))
        :
        Usuario.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarUsuario', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Usuario.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarUsuario', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Usuario.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarUsuario', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Usuario.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionUsuario', res))


    //* 25
    xsucursal = (req: Request, res: Response, next: NextFunction) =>
        Usuario.findAll(
            { where : { 'IdSucursal' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xUsuariosucursales', res))

    //* 25
    sucursal = (req: Request, res: Response, next: NextFunction) =>
        Usuario.findById(req.params.id )
            .then(item => item.$get('Sucursal'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Usuariosucursales', res))

    //* 25
    ligarsucursales = (req: Request, res: Response, next: NextFunction) =>
        Usuario.findById(req.params.usuario)
            .then(item => item.$set('Sucursal', req.params.sucursal))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarUsuariosucursales', res))

    //* 25
    desligarsucursales = (req: Request, res: Response, next: NextFunction) =>
        Usuario.findById(req.params.usuario)
            .then(item => item.$remove('Sucursal', req.params.sucursal))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarUsuariosucursales', res))


    
    //* 33
    ordenes = (req: Request, res: Response, next: NextFunction) =>
        Usuario.findById(req.params.id)
            .then(item => item.$get('Ordenes'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Usuarioordenes', res))

    //* 33
    ligarordenes = (req: Request, res: Response, next: NextFunction) =>
        Usuario.findById(req.params.usuario)
            .then(item => item.$add('Ordenes', req.params.orden))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarUsuarioordenes', res))

    //* 33
    desligarordenes = (req: Request, res: Response, next: NextFunction) =>
        Usuario.findById(req.params.usuario)
            .then(item => item.$remove('Ordenes', req.params.orden))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarUsuarioordenes', res))

    

    //* 34
    llave = (req: Request, res: Response, next: NextFunction) =>
        Usuario.findById(req.params.id )
            .then(item => item.$get('Llave'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Usuariollaves', res))

    //* 34
    ligarllaves = (req: Request, res: Response, next: NextFunction) =>
        Usuario.findById(req.params.usuario)
            .then(item => item.$set('Llave', req.params.llave))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarUsuariollaves', res))

    //* 34
    desligarllaves = (req: Request, res: Response, next: NextFunction) =>
        Usuario.findById(req.params.usuario)
            .then(item => item.$remove('Llave', req.params.llave))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarUsuariollaves', res))


    
    //* 35
    avatares = (req: Request, res: Response, next: NextFunction) =>
        Usuario.findById(req.params.id)
            .then(item => item.$get('Avatares'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Usuarioavatares', res))

    //* 35
    ligaravatares = (req: Request, res: Response, next: NextFunction) =>
        Usuario.findById(req.params.usuario)
            .then(item => item.$add('Avatares', req.params.avatar))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarUsuarioavatares', res))

    //* 35
    desligaravatares = (req: Request, res: Response, next: NextFunction) =>
        Usuario.findById(req.params.usuario)
            .then(item => item.$remove('Avatares', req.params.avatar))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarUsuarioavatares', res))

    
    //* 37
    logs = (req: Request, res: Response, next: NextFunction) =>
        Usuario.findById(req.params.id)
            .then(item => item.$get('Logs'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Usuariologs', res))

    //* 37
    ligarlogs = (req: Request, res: Response, next: NextFunction) =>
        Usuario.findById(req.params.usuario)
            .then(item => item.$add('Logs', req.params.log))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarUsuariologs', res))

    //* 37
    desligarlogs = (req: Request, res: Response, next: NextFunction) =>
        Usuario.findById(req.params.usuario)
            .then(item => item.$remove('Logs', req.params.log))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarUsuariologs', res))

    
    //* 38
    acciones = (req: Request, res: Response, next: NextFunction) =>
        Usuario.findById(req.params.id)
            .then(item => item.$get('Acciones'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Usuarioacciones', res))

    //* 38
    ligaracciones = (req: Request, res: Response, next: NextFunction) =>
        Usuario.findById(req.params.usuario)
            .then(item => item.$add('Acciones', req.params.accion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarUsuarioacciones', res))

    //* 38
    desligaracciones = (req: Request, res: Response, next: NextFunction) =>
        Usuario.findById(req.params.usuario)
            .then(item => item.$remove('Acciones', req.params.accion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarUsuarioacciones', res))

    
    //* 39
    direcciones = (req: Request, res: Response, next: NextFunction) =>
        Usuario.findById(req.params.id)
            .then(item => item.$get('Direcciones'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Usuariodirecciones', res))

    //* 39
    ligardirecciones = (req: Request, res: Response, next: NextFunction) =>
        Usuario.findById(req.params.usuario)
            .then(item => item.$add('Direcciones', req.params.direccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarUsuariodirecciones', res))

    //* 39
    desligardirecciones = (req: Request, res: Response, next: NextFunction) =>
        Usuario.findById(req.params.usuario)
            .then(item => item.$remove('Direcciones', req.params.direccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarUsuariodirecciones', res))

    
    //* 40
    tarjetas = (req: Request, res: Response, next: NextFunction) =>
        Usuario.findById(req.params.id)
            .then(item => item.$get('Tarjetas'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Usuariotarjetas', res))

    //* 40
    ligartarjetas = (req: Request, res: Response, next: NextFunction) =>
        Usuario.findById(req.params.usuario)
            .then(item => item.$add('Tarjetas', req.params.tarjeta))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarUsuariotarjetas', res))

    //* 40
    desligartarjetas = (req: Request, res: Response, next: NextFunction) =>
        Usuario.findById(req.params.usuario)
            .then(item => item.$remove('Tarjetas', req.params.tarjeta))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarUsuariotarjetas', res))

    
    //* 36
    versiones = (req: Request, res: Response, next: NextFunction) =>
        Usuario.findById(req.params.id)
            .then(item => item.$get('Versiones'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'UsuarioVersiones', res))

    //* 36
    ligarversiones = (req: Request, res: Response, next: NextFunction) =>
        Usuario.findById(req.params.usuario)
            .then(item => item.$add('Versiones', req.params.version, { through :  req.body ? req.body : null }))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarUsuarioVersiones', res))

    //* 36
    desligarversiones = (req: Request, res: Response, next: NextFunction) =>
        Usuario.findById(req.params.usuario)
            .then(item => item.$remove('Versiones', req.params.version))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarUsuarioVersiones', res))

                
    setFavoritos = (req: Request, res: Response, next: NextFunction) =>
        setFavoritos(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Usuario_setFavoritos', res))
    
}