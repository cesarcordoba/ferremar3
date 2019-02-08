"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = require('../error');
const _ = require('lodash');
const modelo_1 = require("./modelo");
class PrecioController {
    constructor() {
        //* null
        this.crear = (req, res, next) => modelo_1.Precio.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearPrecio', res));
        //* null
        this.buscar = (req, res, next) => req.params.id ?
            modelo_1.Precio.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
                .catch(err => errorHandler(err, 'buscarPrecio', res))
            :
                modelo_1.Precio.findAll()
                    .then(response => res.status(200).jsonp(response))
                    .catch(err => errorHandler(err, 'buscarPrecio', res));
        //* null
        this.actualizar = (req, res, next) => modelo_1.Precio.update(req.body, { where: { id: req.params.id } })
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarPrecio', res));
        //* null
        this.eliminar = (req, res, next) => modelo_1.Precio.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarPrecio', res));
        //* null
        this.paginacion = (req, res, next) => modelo_1.Precio.findAndCountAll({
            order: req.body.order,
            where: req.body.where
        }).then(response => res.status(200).jsonp(new Object({
            items: _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
            paginas: Math.round(response.count / req.body.limite)
        })))
            .catch(err => errorHandler(err, 'paginacionPrecio', res));
        //* 32
        this.transacciones = (req, res, next) => modelo_1.Precio.findById(req.params.id)
            .then(item => item.$get('Transacciones'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Preciotransacciones', res));
        //* 32
        this.ligartransacciones = (req, res, next) => modelo_1.Precio.findById(req.params.precio)
            .then(item => item.$add('Transacciones', req.params.transaccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarPreciotransacciones', res));
        //* 32
        this.desligartransacciones = (req, res, next) => modelo_1.Precio.findById(req.params.precio)
            .then(item => item.$remove('Transacciones', req.params.transaccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarPreciotransacciones', res));
        //* 46
        this.inventarios = (req, res, next) => modelo_1.Precio.findById(req.params.id)
            .then(item => item.$get('Inventarios'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'PrecioInventarios', res));
        //* 46
        this.ligarinventarios = (req, res, next) => modelo_1.Precio.findById(req.params.precio)
            .then(item => item.$add('Inventarios', req.params.inventario, { through: req.body ? req.body : null }))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarPrecioInventarios', res));
        //* 46
        this.desligarinventarios = (req, res, next) => modelo_1.Precio.findById(req.params.precio)
            .then(item => item.$remove('Inventarios', req.params.inventario))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarPrecioInventarios', res));
    }
}
exports.PrecioController = PrecioController;
