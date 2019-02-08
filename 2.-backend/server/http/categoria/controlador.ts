
const ultimoproducto = require('./ultimoproducto/ultimoproducto');
    
const nivel = require('./nivel/nivel');
    
const xNombre = require('./xNombre/xNombre');
    
const completo = require('./completo/completo');
    
const padres = require('./padres/padres');
    
const restructurar = require('./restructurar/restructurar');
    
const errorHandler = require('../error');
const _ = require('lodash');

import { Categoria } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class CategoriaController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Categoria.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearCategoria', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Categoria.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarCategoria', res))
        :
        Categoria.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarCategoria', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Categoria.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarCategoria', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Categoria.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarCategoria', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Categoria.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionCategoria', res))


    //* 1
    productos = (req: Request, res: Response, next: NextFunction) =>
        Categoria.findById(req.params.id)
            .then(item => item.$get('Productos'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Categoriaproductos', res))

    //* 1
    ligarproductos = (req: Request, res: Response, next: NextFunction) =>
        Categoria.findById(req.params.categoria)
            .then(item => item.$add('Productos', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarCategoriaproductos', res))

    //* 1
    desligarproductos = (req: Request, res: Response, next: NextFunction) =>
        Categoria.findById(req.params.categoria)
            .then(item => item.$remove('Productos', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarCategoriaproductos', res))

    

    //* 2
    subcategorias = (req: Request, res: Response, next: NextFunction) =>
    Categoria.findById(req.params.id)
        .then(item => item.$get('SubCategorias'))
        .then(result => res.status(200).jsonp(result))
        .catch(err => errorHandler(err, 'subCategoriacategorias', res))

    //* 2
    precategorias = (req: Request, res: Response, next: NextFunction) =>
    Categoria.findById(req.params.id)
        .then(item => item.$get('PreCategorias'))
        .then(result => res.status(200).jsonp(result))
        .catch(err => errorHandler(err, 'preCategoriacategorias', res))

        
    //* 10
    atributos = (req: Request, res: Response, next: NextFunction) =>
        Categoria.findById(req.params.id)
            .then(item => item.$get('Atributos'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Categoriaatributos', res))

    //* 10
    ligaratributos = (req: Request, res: Response, next: NextFunction) =>
        Categoria.findById(req.params.categoria)
            .then(item => item.$add('Atributos', req.params.atributo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarCategoriaatributos', res))

    //* 10
    desligaratributos = (req: Request, res: Response, next: NextFunction) =>
        Categoria.findById(req.params.categoria)
            .then(item => item.$remove('Atributos', req.params.atributo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarCategoriaatributos', res))

    
    ultimoproducto = (req: Request, res: Response, next: NextFunction) =>
        ultimoproducto(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Categoria_ultimoproducto', res))
    
    nivel = (req: Request, res: Response, next: NextFunction) =>
        nivel(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Categoria_nivel', res))
    
    xNombre = (req: Request, res: Response, next: NextFunction) =>
        xNombre(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Categoria_xNombre', res))
    
    completo = (req: Request, res: Response, next: NextFunction) =>
        completo(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Categoria_completo', res))
    
    padres = (req: Request, res: Response, next: NextFunction) =>
        padres(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Categoria_padres', res))
    
    restructurar = (req: Request, res: Response, next: NextFunction) =>
        restructurar(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Categoria_restructurar', res))
    
}