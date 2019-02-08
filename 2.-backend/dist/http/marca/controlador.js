"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const disponibles = require('./disponibles/disponibles');
const xNombre = require('./xNombre/xNombre');
const errorHandler = require('../error');
const _ = require('lodash');
const modelo_1 = require("./modelo");
class MarcaController {
    constructor() {
        //* null
        this.crear = (req, res, next) => modelo_1.Marca.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearMarca', res));
        //* null
        this.buscar = (req, res, next) => req.params.id ?
            modelo_1.Marca.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
                .catch(err => errorHandler(err, 'buscarMarca', res))
            :
                modelo_1.Marca.findAll()
                    .then(response => res.status(200).jsonp(response))
                    .catch(err => errorHandler(err, 'buscarMarca', res));
        //* null
        this.actualizar = (req, res, next) => modelo_1.Marca.update(req.body, { where: { id: req.params.id } })
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarMarca', res));
        //* null
        this.eliminar = (req, res, next) => modelo_1.Marca.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarMarca', res));
        //* null
        this.paginacion = (req, res, next) => modelo_1.Marca.findAndCountAll({
            order: req.body.order,
            where: req.body.where
        }).then(response => res.status(200).jsonp(new Object({
            items: _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
            paginas: Math.round(response.count / req.body.limite)
        })))
            .catch(err => errorHandler(err, 'paginacionMarca', res));
        //* 1
        this.productos = (req, res, next) => modelo_1.Marca.findById(req.params.id)
            .then(item => item.$get('Productos'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Marcaproductos', res));
        //* 1
        this.ligarproductos = (req, res, next) => modelo_1.Marca.findById(req.params.marca)
            .then(item => item.$add('Productos', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarMarcaproductos', res));
        //* 1
        this.desligarproductos = (req, res, next) => modelo_1.Marca.findById(req.params.marca)
            .then(item => item.$remove('Productos', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarMarcaproductos', res));
        //* 13
        this.gamas = (req, res, next) => modelo_1.Marca.findById(req.params.id)
            .then(item => item.$get('Gamas'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Marcagamas', res));
        //* 13
        this.ligargamas = (req, res, next) => modelo_1.Marca.findById(req.params.marca)
            .then(item => item.$add('Gamas', req.params.gama))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarMarcagamas', res));
        //* 13
        this.desligargamas = (req, res, next) => modelo_1.Marca.findById(req.params.marca)
            .then(item => item.$remove('Gamas', req.params.gama))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarMarcagamas', res));
        //* 14
        this.lineas = (req, res, next) => modelo_1.Marca.findById(req.params.id)
            .then(item => item.$get('Lineas'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Marcalineas', res));
        //* 14
        this.ligarlineas = (req, res, next) => modelo_1.Marca.findById(req.params.marca)
            .then(item => item.$add('Lineas', req.params.linea))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarMarcalineas', res));
        //* 14
        this.desligarlineas = (req, res, next) => modelo_1.Marca.findById(req.params.marca)
            .then(item => item.$remove('Lineas', req.params.linea))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarMarcalineas', res));
        //* 15
        this.margenes = (req, res, next) => modelo_1.Marca.findById(req.params.id)
            .then(item => item.$get('Margenes'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Marcamargenes', res));
        //* 15
        this.ligarmargenes = (req, res, next) => modelo_1.Marca.findById(req.params.marca)
            .then(item => item.$add('Margenes', req.params.margen))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarMarcamargenes', res));
        //* 15
        this.desligarmargenes = (req, res, next) => modelo_1.Marca.findById(req.params.marca)
            .then(item => item.$remove('Margenes', req.params.margen))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarMarcamargenes', res));
        //* 16
        this.catalogos = (req, res, next) => modelo_1.Marca.findById(req.params.id)
            .then(item => item.$get('Catalogos'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Marcacatalogos', res));
        //* 16
        this.ligarcatalogos = (req, res, next) => modelo_1.Marca.findById(req.params.marca)
            .then(item => item.$add('Catalogos', req.params.catalogo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarMarcacatalogos', res));
        //* 16
        this.desligarcatalogos = (req, res, next) => modelo_1.Marca.findById(req.params.marca)
            .then(item => item.$remove('Catalogos', req.params.catalogo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarMarcacatalogos', res));
        this.disponibles = (req, res, next) => disponibles(req, res, next)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'Marca_disponibles', res));
        this.xNombre = (req, res, next) => xNombre(req, res, next)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'Marca_xNombre', res));
    }
}
exports.MarcaController = MarcaController;
