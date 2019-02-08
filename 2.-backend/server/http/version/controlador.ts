
const opcionesdisponibles = require('./opcionesdisponibles/opcionesdisponibles');
    
const precios = require('./precios/precios');
    
const xNombre = require('./xNombre/xNombre');
    
const precioactual = require('./precioactual/precioactual');
    
const margenes = require('./margenes/margenes');
    
const sincronizarPrecios = require('./sincronizarPrecios/sincronizarPrecios');
    
const recalcular = require('./recalcular/recalcular');
    
const errorHandler = require('../error');
const _ = require('lodash');

import { Version } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class VersionController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Version.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearVersion', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Version.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarVersion', res))
        :
        Version.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarVersion', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Version.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarVersion', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Version.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarVersion', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Version.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionVersion', res))


    //* 1
    xproducto = (req: Request, res: Response, next: NextFunction) =>
        Version.findAll(
            { where : { 'IdProducto' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xVersionproductos', res))

    //* 1
    producto = (req: Request, res: Response, next: NextFunction) =>
        Version.findById(req.params.id )
            .then(item => item.$get('Producto'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Versionproductos', res))

    //* 1
    ligarproductos = (req: Request, res: Response, next: NextFunction) =>
        Version.findById(req.params.version)
            .then(item => item.$set('Producto', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarVersionproductos', res))

    //* 1
    desligarproductos = (req: Request, res: Response, next: NextFunction) =>
        Version.findById(req.params.version)
            .then(item => item.$remove('Producto', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarVersionproductos', res))


    
    //* 11
    opciones = (req: Request, res: Response, next: NextFunction) =>
        Version.findById(req.params.id)
            .then(item => item.$get('Opciones'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Versionopciones', res))

    //* 11
    ligaropciones = (req: Request, res: Response, next: NextFunction) =>
        Version.findById(req.params.version)
            .then(item => item.$add('Opciones', req.params.opcion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarVersionopciones', res))

    //* 11
    desligaropciones = (req: Request, res: Response, next: NextFunction) =>
        Version.findById(req.params.version)
            .then(item => item.$remove('Opciones', req.params.opcion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarVersionopciones', res))

    
    //* 19
    descuentos = (req: Request, res: Response, next: NextFunction) =>
        Version.findById(req.params.id)
            .then(item => item.$get('Descuentos'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Versiondescuentos', res))

    //* 19
    ligardescuentos = (req: Request, res: Response, next: NextFunction) =>
        Version.findById(req.params.version)
            .then(item => item.$add('Descuentos', req.params.descuento))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarVersiondescuentos', res))

    //* 19
    desligardescuentos = (req: Request, res: Response, next: NextFunction) =>
        Version.findById(req.params.version)
            .then(item => item.$remove('Descuentos', req.params.descuento))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarVersiondescuentos', res))

    
    //* 32
    transacciones = (req: Request, res: Response, next: NextFunction) =>
        Version.findById(req.params.id)
            .then(item => item.$get('Transacciones'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Versiontransacciones', res))

    //* 32
    ligartransacciones = (req: Request, res: Response, next: NextFunction) =>
        Version.findById(req.params.version)
            .then(item => item.$add('Transacciones', req.params.transaccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarVersiontransacciones', res))

    //* 32
    desligartransacciones = (req: Request, res: Response, next: NextFunction) =>
        Version.findById(req.params.version)
            .then(item => item.$remove('Transacciones', req.params.transaccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarVersiontransacciones', res))

    
    //* 21
    salientes = (req: Request, res: Response, next: NextFunction) =>
        Version.findById(req.params.id)
            .then(item => item.$get('Salientes'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'VersionSalientes', res))

    //* 21
    ligarsalientes = (req: Request, res: Response, next: NextFunction) =>
        Version.findById(req.params.version)
            .then(item => item.$add('Salientes', req.params.oferta, { through :  req.body ? req.body : null }))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarVersionSalientes', res))

    //* 21
    desligarsalientes = (req: Request, res: Response, next: NextFunction) =>
        Version.findById(req.params.version)
            .then(item => item.$remove('Salientes', req.params.oferta))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarVersionSalientes', res))

                
    //* 22
    entrantes = (req: Request, res: Response, next: NextFunction) =>
        Version.findById(req.params.id)
            .then(item => item.$get('Entrantes'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'VersionEntrantes', res))

    //* 22
    ligarentrantes = (req: Request, res: Response, next: NextFunction) =>
        Version.findById(req.params.version)
            .then(item => item.$add('Entrantes', req.params.oferta, { through :  req.body ? req.body : null }))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarVersionEntrantes', res))

    //* 22
    desligarentrantes = (req: Request, res: Response, next: NextFunction) =>
        Version.findById(req.params.version)
            .then(item => item.$remove('Entrantes', req.params.oferta))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarVersionEntrantes', res))

                
    //* 23
    sucursales = (req: Request, res: Response, next: NextFunction) =>
        Version.findById(req.params.id)
            .then(item => item.$get('Sucursales'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'VersionSucursales', res))

    //* 23
    ligarsucursales = (req: Request, res: Response, next: NextFunction) =>
        Version.findById(req.params.version)
            .then(item => item.$add('Sucursales', req.params.sucursal, { through :  req.body ? req.body : null }))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarVersionSucursales', res))

    //* 23
    desligarsucursales = (req: Request, res: Response, next: NextFunction) =>
        Version.findById(req.params.version)
            .then(item => item.$remove('Sucursales', req.params.sucursal))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarVersionSucursales', res))

                
    //* 36
    usuarios = (req: Request, res: Response, next: NextFunction) =>
        Version.findById(req.params.id)
            .then(item => item.$get('Usuarios'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'VersionUsuarios', res))

    //* 36
    ligarusuarios = (req: Request, res: Response, next: NextFunction) =>
        Version.findById(req.params.version)
            .then(item => item.$add('Usuarios', req.params.usuario, { through :  req.body ? req.body : null }))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarVersionUsuarios', res))

    //* 36
    desligarusuarios = (req: Request, res: Response, next: NextFunction) =>
        Version.findById(req.params.version)
            .then(item => item.$remove('Usuarios', req.params.usuario))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarVersionUsuarios', res))

                
    opcionesdisponibles = (req: Request, res: Response, next: NextFunction) =>
        opcionesdisponibles(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Version_opcionesdisponibles', res))
    
    precios = (req: Request, res: Response, next: NextFunction) =>
        precios(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Version_precios', res))
    
    xNombre = (req: Request, res: Response, next: NextFunction) =>
        xNombre(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Version_xNombre', res))
    
    precioactual = (req: Request, res: Response, next: NextFunction) =>
        precioactual(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Version_precioactual', res))
    
    margenes = (req: Request, res: Response, next: NextFunction) =>
        margenes(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Version_margenes', res))
    
    sincronizarPrecios = (req: Request, res: Response, next: NextFunction) =>
        sincronizarPrecios(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Version_sincronizarPrecios', res))
    
    recalcular = (req: Request, res: Response, next: NextFunction) =>
        recalcular(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Version_recalcular', res))
    
}