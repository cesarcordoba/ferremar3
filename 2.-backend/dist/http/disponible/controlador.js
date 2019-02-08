"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = require('../error');
const _ = require('lodash');
const modelo_1 = require("./modelo");
class DisponibleController {
    constructor() {
        //* null
        this.crear = (req, res, next) => modelo_1.Disponible.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearDisponible', res));
        //* null
        this.buscar = (req, res, next) => req.params.id ?
            modelo_1.Disponible.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
                .catch(err => errorHandler(err, 'buscarDisponible', res))
            :
                modelo_1.Disponible.findAll()
                    .then(response => res.status(200).jsonp(response))
                    .catch(err => errorHandler(err, 'buscarDisponible', res));
        //* null
        this.actualizar = (req, res, next) => modelo_1.Disponible.update(req.body, { where: { id: req.params.id } })
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarDisponible', res));
        //* null
        this.eliminar = (req, res, next) => modelo_1.Disponible.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarDisponible', res));
        //* null
        this.paginacion = (req, res, next) => modelo_1.Disponible.findAndCountAll({
            order: req.body.order,
            where: req.body.where
        }).then(response => res.status(200).jsonp(new Object({
            items: _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
            paginas: Math.round(response.count / req.body.limite)
        })))
            .catch(err => errorHandler(err, 'paginacionDisponible', res));
    }
}
exports.DisponibleController = DisponibleController;
