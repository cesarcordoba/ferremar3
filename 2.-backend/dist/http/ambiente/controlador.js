"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = require('../error');
const _ = require('lodash');
const modelo_1 = require("./modelo");
class AmbienteController {
    constructor() {
        //* null
        this.crear = (req, res, next) => modelo_1.Ambiente.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearAmbiente', res));
        //* null
        this.buscar = (req, res, next) => req.params.id ?
            modelo_1.Ambiente.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
                .catch(err => errorHandler(err, 'buscarAmbiente', res))
            :
                modelo_1.Ambiente.findAll()
                    .then(response => res.status(200).jsonp(response))
                    .catch(err => errorHandler(err, 'buscarAmbiente', res));
        //* null
        this.actualizar = (req, res, next) => modelo_1.Ambiente.update(req.body, { where: { id: req.params.id } })
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarAmbiente', res));
        //* null
        this.eliminar = (req, res, next) => modelo_1.Ambiente.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarAmbiente', res));
        //* null
        this.paginacion = (req, res, next) => modelo_1.Ambiente.findAndCountAll({
            order: req.body.order,
            where: req.body.where
        }).then(response => res.status(200).jsonp(new Object({
            items: _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
            paginas: Math.round(response.count / req.body.limite)
        })))
            .catch(err => errorHandler(err, 'paginacionAmbiente', res));
        //* 29
        this.xcuarto = (req, res, next) => modelo_1.Ambiente.findAll({ where: { 'IdCuarto': req.params.id } })
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xAmbientecuartos', res));
        //* 29
        this.cuarto = (req, res, next) => modelo_1.Ambiente.findById(req.params.id)
            .then(item => item.$get('Cuarto'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Ambientecuartos', res));
        //* 29
        this.ligarcuartos = (req, res, next) => modelo_1.Ambiente.findById(req.params.ambiente)
            .then(item => item.$set('Cuarto', req.params.cuarto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarAmbientecuartos', res));
        //* 29
        this.desligarcuartos = (req, res, next) => modelo_1.Ambiente.findById(req.params.ambiente)
            .then(item => item.$remove('Cuarto', req.params.cuarto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarAmbientecuartos', res));
        //* 30
        this.espacios = (req, res, next) => modelo_1.Ambiente.findById(req.params.id)
            .then(item => item.$get('Espacios'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Ambienteespacios', res));
        //* 30
        this.ligarespacios = (req, res, next) => modelo_1.Ambiente.findById(req.params.ambiente)
            .then(item => item.$add('Espacios', req.params.espacio))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarAmbienteespacios', res));
        //* 30
        this.desligarespacios = (req, res, next) => modelo_1.Ambiente.findById(req.params.ambiente)
            .then(item => item.$remove('Espacios', req.params.espacio))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarAmbienteespacios', res));
        //* 28
        this.productos = (req, res, next) => modelo_1.Ambiente.findById(req.params.id)
            .then(item => item.$get('Productos'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'AmbienteProductos', res));
        //* 28
        this.ligarproductos = (req, res, next) => modelo_1.Ambiente.findById(req.params.ambiente)
            .then(item => item.$add('Productos', req.params.producto, { through: req.body ? req.body : null }))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarAmbienteProductos', res));
        //* 28
        this.desligarproductos = (req, res, next) => modelo_1.Ambiente.findById(req.params.ambiente)
            .then(item => item.$remove('Productos', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarAmbienteProductos', res));
    }
}
exports.AmbienteController = AmbienteController;
