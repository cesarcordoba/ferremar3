"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sincronizarStatus = require('./sincronizarStatus/sincronizarStatus');
const cambiarStatus = require('./cambiarStatus/cambiarStatus');
const sincronizarPrecios = require('./sincronizarPrecios/sincronizarPrecios');
const errorHandler = require('../error');
const _ = require('lodash');
const modelo_1 = require("./modelo");
class InventarioController {
    constructor() {
        //* null
        this.crear = (req, res, next) => modelo_1.Inventario.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearInventario', res));
        //* null
        this.buscar = (req, res, next) => req.params.id ?
            modelo_1.Inventario.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
                .catch(err => errorHandler(err, 'buscarInventario', res))
            :
                modelo_1.Inventario.findAll()
                    .then(response => res.status(200).jsonp(response))
                    .catch(err => errorHandler(err, 'buscarInventario', res));
        //* null
        this.actualizar = (req, res, next) => modelo_1.Inventario.update(req.body, { where: { id: req.params.id } })
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarInventario', res));
        //* null
        this.eliminar = (req, res, next) => modelo_1.Inventario.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarInventario', res));
        //* null
        this.paginacion = (req, res, next) => modelo_1.Inventario.findAndCountAll({
            order: req.body.order,
            where: req.body.where
        }).then(response => res.status(200).jsonp(new Object({
            items: _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
            paginas: Math.round(response.count / req.body.limite)
        })))
            .catch(err => errorHandler(err, 'paginacionInventario', res));
        //* 26
        this.existencias = (req, res, next) => modelo_1.Inventario.findById(req.params.id)
            .then(item => item.$get('Existencias'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Inventarioexistencias', res));
        //* 26
        this.ligarexistencias = (req, res, next) => modelo_1.Inventario.findById(req.params.inventario)
            .then(item => item.$add('Existencias', req.params.existencia))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarInventarioexistencias', res));
        //* 26
        this.desligarexistencias = (req, res, next) => modelo_1.Inventario.findById(req.params.inventario)
            .then(item => item.$remove('Existencias', req.params.existencia))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarInventarioexistencias', res));
        //* 44
        this.margenes = (req, res, next) => modelo_1.Inventario.findById(req.params.id)
            .then(item => item.$get('Margenes'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'InventarioMargenes', res));
        //* 44
        this.ligarmargenes = (req, res, next) => modelo_1.Inventario.findById(req.params.inventario)
            .then(item => item.$add('Margenes', req.params.margen, { through: req.body ? req.body : null }))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarInventarioMargenes', res));
        //* 44
        this.desligarmargenes = (req, res, next) => modelo_1.Inventario.findById(req.params.inventario)
            .then(item => item.$remove('Margenes', req.params.margen))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarInventarioMargenes', res));
        //* 46
        this.precios = (req, res, next) => modelo_1.Inventario.findById(req.params.id)
            .then(item => item.$get('Precios'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'InventarioPrecios', res));
        //* 46
        this.ligarprecios = (req, res, next) => modelo_1.Inventario.findById(req.params.inventario)
            .then(item => item.$add('Precios', req.params.precio, { through: req.body ? req.body : null }))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarInventarioPrecios', res));
        //* 46
        this.desligarprecios = (req, res, next) => modelo_1.Inventario.findById(req.params.inventario)
            .then(item => item.$remove('Precios', req.params.precio))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarInventarioPrecios', res));
        this.sincronizarStatus = (req, res, next) => sincronizarStatus(req, res, next)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'Inventario_sincronizarStatus', res));
        this.cambiarStatus = (req, res, next) => cambiarStatus(req, res, next)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'Inventario_cambiarStatus', res));
        this.sincronizarPrecios = (req, res, next) => sincronizarPrecios(req, res, next)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'Inventario_sincronizarPrecios', res));
    }
}
exports.InventarioController = InventarioController;
