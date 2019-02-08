"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xNombre = require('./xNombre/xNombre');
const errorHandler = require('../error');
const _ = require('lodash');
const modelo_1 = require("./modelo");
class LineaController {
    constructor() {
        //* null
        this.crear = (req, res, next) => modelo_1.Linea.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearLinea', res));
        //* null
        this.buscar = (req, res, next) => req.params.id ?
            modelo_1.Linea.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
                .catch(err => errorHandler(err, 'buscarLinea', res))
            :
                modelo_1.Linea.findAll()
                    .then(response => res.status(200).jsonp(response))
                    .catch(err => errorHandler(err, 'buscarLinea', res));
        //* null
        this.actualizar = (req, res, next) => modelo_1.Linea.update(req.body, { where: { id: req.params.id } })
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarLinea', res));
        //* null
        this.eliminar = (req, res, next) => modelo_1.Linea.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarLinea', res));
        //* null
        this.paginacion = (req, res, next) => modelo_1.Linea.findAndCountAll({
            order: req.body.order,
            where: req.body.where
        }).then(response => res.status(200).jsonp(new Object({
            items: _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
            paginas: Math.round(response.count / req.body.limite)
        })))
            .catch(err => errorHandler(err, 'paginacionLinea', res));
        //* 1
        this.productos = (req, res, next) => modelo_1.Linea.findById(req.params.id)
            .then(item => item.$get('Productos'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Lineaproductos', res));
        //* 1
        this.ligarproductos = (req, res, next) => modelo_1.Linea.findById(req.params.linea)
            .then(item => item.$add('Productos', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarLineaproductos', res));
        //* 1
        this.desligarproductos = (req, res, next) => modelo_1.Linea.findById(req.params.linea)
            .then(item => item.$remove('Productos', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarLineaproductos', res));
        //* 12
        this.xmarca = (req, res, next) => modelo_1.Linea.findAll({ where: { 'IdMarca': req.params.id } })
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xLineamarcas', res));
        //* 12
        this.marca = (req, res, next) => modelo_1.Linea.findById(req.params.id)
            .then(item => item.$get('Marca'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Lineamarcas', res));
        //* 12
        this.ligarmarcas = (req, res, next) => modelo_1.Linea.findById(req.params.linea)
            .then(item => item.$set('Marca', req.params.marca))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarLineamarcas', res));
        //* 12
        this.desligarmarcas = (req, res, next) => modelo_1.Linea.findById(req.params.linea)
            .then(item => item.$remove('Marca', req.params.marca))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarLineamarcas', res));
        this.xNombre = (req, res, next) => xNombre(req, res, next)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'Linea_xNombre', res));
    }
}
exports.LineaController = LineaController;
