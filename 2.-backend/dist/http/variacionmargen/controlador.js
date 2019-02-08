"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cambiarStatus = require('./cambiarStatus/cambiarStatus');
const errorHandler = require('../error');
const _ = require('lodash');
const modelo_1 = require("./modelo");
class VariacionmargenController {
    constructor() {
        //* null
        this.crear = (req, res, next) => modelo_1.Variacionmargen.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearVariacionmargen', res));
        //* null
        this.buscar = (req, res, next) => req.params.id ?
            modelo_1.Variacionmargen.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
                .catch(err => errorHandler(err, 'buscarVariacionmargen', res))
            :
                modelo_1.Variacionmargen.findAll()
                    .then(response => res.status(200).jsonp(response))
                    .catch(err => errorHandler(err, 'buscarVariacionmargen', res));
        //* null
        this.actualizar = (req, res, next) => modelo_1.Variacionmargen.update(req.body, { where: { id: req.params.id } })
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarVariacionmargen', res));
        //* null
        this.eliminar = (req, res, next) => modelo_1.Variacionmargen.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarVariacionmargen', res));
        //* null
        this.paginacion = (req, res, next) => modelo_1.Variacionmargen.findAndCountAll({
            order: req.body.order,
            where: req.body.where
        }).then(response => res.status(200).jsonp(new Object({
            items: _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
            paginas: Math.round(response.count / req.body.limite)
        })))
            .catch(err => errorHandler(err, 'paginacionVariacionmargen', res));
        this.cambiarStatus = (req, res, next) => cambiarStatus(req, res, next)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'Variacionmargen_cambiarStatus', res));
    }
}
exports.VariacionmargenController = VariacionmargenController;
