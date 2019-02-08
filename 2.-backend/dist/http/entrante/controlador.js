"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = require('../error');
const _ = require('lodash');
const modelo_1 = require("./modelo");
class EntranteController {
    constructor() {
        //* null
        this.crear = (req, res, next) => modelo_1.Entrante.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearEntrante', res));
        //* null
        this.buscar = (req, res, next) => req.params.id ?
            modelo_1.Entrante.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
                .catch(err => errorHandler(err, 'buscarEntrante', res))
            :
                modelo_1.Entrante.findAll()
                    .then(response => res.status(200).jsonp(response))
                    .catch(err => errorHandler(err, 'buscarEntrante', res));
        //* null
        this.actualizar = (req, res, next) => modelo_1.Entrante.update(req.body, { where: { id: req.params.id } })
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarEntrante', res));
        //* null
        this.eliminar = (req, res, next) => modelo_1.Entrante.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarEntrante', res));
        //* null
        this.paginacion = (req, res, next) => modelo_1.Entrante.findAndCountAll({
            order: req.body.order,
            where: req.body.where
        }).then(response => res.status(200).jsonp(new Object({
            items: _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
            paginas: Math.round(response.count / req.body.limite)
        })))
            .catch(err => errorHandler(err, 'paginacionEntrante', res));
    }
}
exports.EntranteController = EntranteController;
