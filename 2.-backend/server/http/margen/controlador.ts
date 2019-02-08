
const sincronizarMargenes = require('./sincronizarMargenes/sincronizarMargenes');
    
const errorHandler = require('../error');
const _ = require('lodash');

import { Margen } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class MargenController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Margen.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearMargen', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Margen.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarMargen', res))
        :
        Margen.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarMargen', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Margen.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarMargen', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Margen.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarMargen', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Margen.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionMargen', res))


    //* 1
    productos = (req: Request, res: Response, next: NextFunction) =>
        Margen.findById(req.params.id)
            .then(item => item.$get('Productos'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Margenproductos', res))

    //* 1
    ligarproductos = (req: Request, res: Response, next: NextFunction) =>
        Margen.findById(req.params.margen)
            .then(item => item.$add('Productos', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarMargenproductos', res))

    //* 1
    desligarproductos = (req: Request, res: Response, next: NextFunction) =>
        Margen.findById(req.params.margen)
            .then(item => item.$remove('Productos', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarMargenproductos', res))

    
    //* 12
    xmarca = (req: Request, res: Response, next: NextFunction) =>
        Margen.findAll(
            { where : { 'IdMarca' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xMargenmarcas', res))

    //* 12
    marca = (req: Request, res: Response, next: NextFunction) =>
        Margen.findById(req.params.id )
            .then(item => item.$get('Marca'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Margenmarcas', res))

    //* 12
    ligarmarcas = (req: Request, res: Response, next: NextFunction) =>
        Margen.findById(req.params.margen)
            .then(item => item.$set('Marca', req.params.marca))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarMargenmarcas', res))

    //* 12
    desligarmarcas = (req: Request, res: Response, next: NextFunction) =>
        Margen.findById(req.params.margen)
            .then(item => item.$remove('Marca', req.params.marca))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarMargenmarcas', res))


    
    //* 32
    transacciones = (req: Request, res: Response, next: NextFunction) =>
        Margen.findById(req.params.id)
            .then(item => item.$get('Transacciones'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Margentransacciones', res))

    //* 32
    ligartransacciones = (req: Request, res: Response, next: NextFunction) =>
        Margen.findById(req.params.margen)
            .then(item => item.$add('Transacciones', req.params.transaccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarMargentransacciones', res))

    //* 32
    desligartransacciones = (req: Request, res: Response, next: NextFunction) =>
        Margen.findById(req.params.margen)
            .then(item => item.$remove('Transacciones', req.params.transaccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarMargentransacciones', res))

    
    //* 44
    inventarios = (req: Request, res: Response, next: NextFunction) =>
        Margen.findById(req.params.id)
            .then(item => item.$get('Inventarios'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'MargenInventarios', res))

    //* 44
    ligarinventarios = (req: Request, res: Response, next: NextFunction) =>
        Margen.findById(req.params.margen)
            .then(item => item.$add('Inventarios', req.params.inventario, { through :  req.body ? req.body : null }))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarMargenInventarios', res))

    //* 44
    desligarinventarios = (req: Request, res: Response, next: NextFunction) =>
        Margen.findById(req.params.margen)
            .then(item => item.$remove('Inventarios', req.params.inventario))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarMargenInventarios', res))

                
    sincronizarMargenes = (req: Request, res: Response, next: NextFunction) =>
        sincronizarMargenes(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Margen_sincronizarMargenes', res))
    
}