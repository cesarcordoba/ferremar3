"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = require('../error');
const _ = require('lodash');
const modelo_1 = require("./modelo");
class AnuncioController {
    constructor() {
        //* null
        this.crear = (req, res, next) => modelo_1.Anuncio.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearAnuncio', res));
        //* null
        this.buscar = (req, res, next) => req.params.id ?
            modelo_1.Anuncio.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
                .catch(err => errorHandler(err, 'buscarAnuncio', res))
            :
                modelo_1.Anuncio.findAll()
                    .then(response => res.status(200).jsonp(response))
                    .catch(err => errorHandler(err, 'buscarAnuncio', res));
        //* null
        this.actualizar = (req, res, next) => modelo_1.Anuncio.update(req.body, { where: { id: req.params.id } })
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarAnuncio', res));
        //* null
        this.eliminar = (req, res, next) => modelo_1.Anuncio.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarAnuncio', res));
        //* null
        this.paginacion = (req, res, next) => modelo_1.Anuncio.findAndCountAll({
            order: req.body.order,
            where: req.body.where
        }).then(response => res.status(200).jsonp(new Object({
            items: _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
            paginas: Math.round(response.count / req.body.limite)
        })))
            .catch(err => errorHandler(err, 'paginacionAnuncio', res));
        //* 42
        this.carteles = (req, res, next) => modelo_1.Anuncio.findById(req.params.id)
            .then(item => item.$get('Carteles'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Anunciocarteles', res));
        //* 42
        this.ligarcarteles = (req, res, next) => modelo_1.Anuncio.findById(req.params.anuncio)
            .then(item => item.$add('Carteles', req.params.cartel))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarAnunciocarteles', res));
        //* 42
        this.desligarcarteles = (req, res, next) => modelo_1.Anuncio.findById(req.params.anuncio)
            .then(item => item.$remove('Carteles', req.params.cartel))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarAnunciocarteles', res));
    }
}
exports.AnuncioController = AnuncioController;
