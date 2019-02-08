"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ultimoproducto = require('./ultimoproducto/ultimoproducto');
const nivel = require('./nivel/nivel');
const xNombre = require('./xNombre/xNombre');
const completo = require('./completo/completo');
const padres = require('./padres/padres');
const restructurar = require('./restructurar/restructurar');
const errorHandler = require('../error');
const _ = require('lodash');
const modelo_1 = require("./modelo");
class CategoriaController {
    constructor() {
        //* null
        this.crear = (req, res, next) => modelo_1.Categoria.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearCategoria', res));
        //* null
        this.buscar = (req, res, next) => req.params.id ?
            modelo_1.Categoria.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
                .catch(err => errorHandler(err, 'buscarCategoria', res))
            :
                modelo_1.Categoria.findAll()
                    .then(response => res.status(200).jsonp(response))
                    .catch(err => errorHandler(err, 'buscarCategoria', res));
        //* null
        this.actualizar = (req, res, next) => modelo_1.Categoria.update(req.body, { where: { id: req.params.id } })
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarCategoria', res));
        //* null
        this.eliminar = (req, res, next) => modelo_1.Categoria.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarCategoria', res));
        //* null
        this.paginacion = (req, res, next) => modelo_1.Categoria.findAndCountAll({
            order: req.body.order,
            where: req.body.where
        }).then(response => res.status(200).jsonp(new Object({
            items: _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
            paginas: Math.round(response.count / req.body.limite)
        })))
            .catch(err => errorHandler(err, 'paginacionCategoria', res));
        //* 1
        this.productos = (req, res, next) => modelo_1.Categoria.findById(req.params.id)
            .then(item => item.$get('Productos'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Categoriaproductos', res));
        //* 1
        this.ligarproductos = (req, res, next) => modelo_1.Categoria.findById(req.params.categoria)
            .then(item => item.$add('Productos', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarCategoriaproductos', res));
        //* 1
        this.desligarproductos = (req, res, next) => modelo_1.Categoria.findById(req.params.categoria)
            .then(item => item.$remove('Productos', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarCategoriaproductos', res));
        //* 2
        this.subcategorias = (req, res, next) => modelo_1.Categoria.findById(req.params.id)
            .then(item => item.$get('SubCategorias'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'subCategoriacategorias', res));
        //* 2
        this.precategorias = (req, res, next) => modelo_1.Categoria.findById(req.params.id)
            .then(item => item.$get('PreCategorias'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'preCategoriacategorias', res));
        //* 10
        this.atributos = (req, res, next) => modelo_1.Categoria.findById(req.params.id)
            .then(item => item.$get('Atributos'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Categoriaatributos', res));
        //* 10
        this.ligaratributos = (req, res, next) => modelo_1.Categoria.findById(req.params.categoria)
            .then(item => item.$add('Atributos', req.params.atributo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarCategoriaatributos', res));
        //* 10
        this.desligaratributos = (req, res, next) => modelo_1.Categoria.findById(req.params.categoria)
            .then(item => item.$remove('Atributos', req.params.atributo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarCategoriaatributos', res));
        this.ultimoproducto = (req, res, next) => ultimoproducto(req, res, next)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'Categoria_ultimoproducto', res));
        this.nivel = (req, res, next) => nivel(req, res, next)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'Categoria_nivel', res));
        this.xNombre = (req, res, next) => xNombre(req, res, next)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'Categoria_xNombre', res));
        this.completo = (req, res, next) => completo(req, res, next)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'Categoria_completo', res));
        this.padres = (req, res, next) => padres(req, res, next)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'Categoria_padres', res));
        this.restructurar = (req, res, next) => restructurar(req, res, next)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'Categoria_restructurar', res));
    }
}
exports.CategoriaController = CategoriaController;
