"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const agrupar = require('./agrupar/agrupar');
const errorHandler = require('../error');
const _ = require('lodash');
const modelo_1 = require("./modelo");
class PortadaController {
    constructor() {
        //* null
        this.crear = (req, res, next) => modelo_1.Portada.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearPortada', res));
        //* null
        this.buscar = (req, res, next) => req.params.id ?
            modelo_1.Portada.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
                .catch(err => errorHandler(err, 'buscarPortada', res))
            :
                modelo_1.Portada.findAll()
                    .then(response => res.status(200).jsonp(response))
                    .catch(err => errorHandler(err, 'buscarPortada', res));
        //* null
        this.actualizar = (req, res, next) => modelo_1.Portada.update(req.body, { where: { id: req.params.id } })
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarPortada', res));
        //* null
        this.eliminar = (req, res, next) => modelo_1.Portada.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarPortada', res));
        //* null
        this.paginacion = (req, res, next) => modelo_1.Portada.findAndCountAll({
            order: req.body.order,
            where: req.body.where
        }).then(response => res.status(200).jsonp(new Object({
            items: _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
            paginas: Math.round(response.count / req.body.limite)
        })))
            .catch(err => errorHandler(err, 'paginacionPortada', res));
        //* 1
        this.xproducto = (req, res, next) => modelo_1.Portada.findAll({ where: { 'IdProducto': req.params.id } })
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xPortadaproductos', res));
        //* 1
        this.producto = (req, res, next) => modelo_1.Portada.findById(req.params.id)
            .then(item => item.$get('Producto'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Portadaproductos', res));
        //* 1
        this.ligarproductos = (req, res, next) => modelo_1.Portada.findById(req.params.portada)
            .then(item => item.$set('Producto', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarPortadaproductos', res));
        //* 1
        this.desligarproductos = (req, res, next) => modelo_1.Portada.findById(req.params.portada)
            .then(item => item.$remove('Producto', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarPortadaproductos', res));
        this.agrupar = (req, res, next) => agrupar(req, res, next)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'Portada_agrupar', res));
    }
}
exports.PortadaController = PortadaController;
