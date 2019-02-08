"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = require('../error');
const _ = require('lodash');
const modelo_1 = require("./modelo");
class CartelController {
    constructor() {
        //* null
        this.crear = (req, res, next) => modelo_1.Cartel.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearCartel', res));
        //* null
        this.buscar = (req, res, next) => req.params.id ?
            modelo_1.Cartel.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
                .catch(err => errorHandler(err, 'buscarCartel', res))
            :
                modelo_1.Cartel.findAll()
                    .then(response => res.status(200).jsonp(response))
                    .catch(err => errorHandler(err, 'buscarCartel', res));
        //* null
        this.actualizar = (req, res, next) => modelo_1.Cartel.update(req.body, { where: { id: req.params.id } })
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarCartel', res));
        //* null
        this.eliminar = (req, res, next) => modelo_1.Cartel.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarCartel', res));
        //* null
        this.paginacion = (req, res, next) => modelo_1.Cartel.findAndCountAll({
            order: req.body.order,
            where: req.body.where
        }).then(response => res.status(200).jsonp(new Object({
            items: _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
            paginas: Math.round(response.count / req.body.limite)
        })))
            .catch(err => errorHandler(err, 'paginacionCartel', res));
        //* 41
        this.xanuncio = (req, res, next) => modelo_1.Cartel.findAll({ where: { 'IdAnuncio': req.params.id } })
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xCartelanuncios', res));
        //* 41
        this.anuncio = (req, res, next) => modelo_1.Cartel.findById(req.params.id)
            .then(item => item.$get('Anuncio'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Cartelanuncios', res));
        //* 41
        this.ligaranuncios = (req, res, next) => modelo_1.Cartel.findById(req.params.cartel)
            .then(item => item.$set('Anuncio', req.params.anuncio))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarCartelanuncios', res));
        //* 41
        this.desligaranuncios = (req, res, next) => modelo_1.Cartel.findById(req.params.cartel)
            .then(item => item.$remove('Anuncio', req.params.anuncio))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarCartelanuncios', res));
    }
}
exports.CartelController = CartelController;
