"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = require('../error');
const _ = require('lodash');
const modelo_1 = require("./modelo");
class CuartoController {
    constructor() {
        //* null
        this.crear = (req, res, next) => modelo_1.Cuarto.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearCuarto', res));
        //* null
        this.buscar = (req, res, next) => req.params.id ?
            modelo_1.Cuarto.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
                .catch(err => errorHandler(err, 'buscarCuarto', res))
            :
                modelo_1.Cuarto.findAll()
                    .then(response => res.status(200).jsonp(response))
                    .catch(err => errorHandler(err, 'buscarCuarto', res));
        //* null
        this.actualizar = (req, res, next) => modelo_1.Cuarto.update(req.body, { where: { id: req.params.id } })
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarCuarto', res));
        //* null
        this.eliminar = (req, res, next) => modelo_1.Cuarto.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarCuarto', res));
        //* null
        this.paginacion = (req, res, next) => modelo_1.Cuarto.findAndCountAll({
            order: req.body.order,
            where: req.body.where
        }).then(response => res.status(200).jsonp(new Object({
            items: _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
            paginas: Math.round(response.count / req.body.limite)
        })))
            .catch(err => errorHandler(err, 'paginacionCuarto', res));
        //* 27
        this.ambientes = (req, res, next) => modelo_1.Cuarto.findById(req.params.id)
            .then(item => item.$get('Ambientes'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Cuartoambientes', res));
        //* 27
        this.ligarambientes = (req, res, next) => modelo_1.Cuarto.findById(req.params.cuarto)
            .then(item => item.$add('Ambientes', req.params.ambiente))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarCuartoambientes', res));
        //* 27
        this.desligarambientes = (req, res, next) => modelo_1.Cuarto.findById(req.params.cuarto)
            .then(item => item.$remove('Ambientes', req.params.ambiente))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarCuartoambientes', res));
    }
}
exports.CuartoController = CuartoController;
