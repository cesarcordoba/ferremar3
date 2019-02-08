"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = require('../error');
const _ = require('lodash');
const modelo_1 = require("./modelo");
class OfertaController {
    constructor() {
        //* null
        this.crear = (req, res, next) => modelo_1.Oferta.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearOferta', res));
        //* null
        this.buscar = (req, res, next) => req.params.id ?
            modelo_1.Oferta.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
                .catch(err => errorHandler(err, 'buscarOferta', res))
            :
                modelo_1.Oferta.findAll()
                    .then(response => res.status(200).jsonp(response))
                    .catch(err => errorHandler(err, 'buscarOferta', res));
        //* null
        this.actualizar = (req, res, next) => modelo_1.Oferta.update(req.body, { where: { id: req.params.id } })
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarOferta', res));
        //* null
        this.eliminar = (req, res, next) => modelo_1.Oferta.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarOferta', res));
        //* null
        this.paginacion = (req, res, next) => modelo_1.Oferta.findAndCountAll({
            order: req.body.order,
            where: req.body.where
        }).then(response => res.status(200).jsonp(new Object({
            items: _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
            paginas: Math.round(response.count / req.body.limite)
        })))
            .catch(err => errorHandler(err, 'paginacionOferta', res));
        //* 17
        this.xpromo = (req, res, next) => modelo_1.Oferta.findAll({ where: { 'IdPromo': req.params.id } })
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xOfertapromos', res));
        //* 17
        this.promo = (req, res, next) => modelo_1.Oferta.findById(req.params.id)
            .then(item => item.$get('Promo'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Ofertapromos', res));
        //* 17
        this.ligarpromos = (req, res, next) => modelo_1.Oferta.findById(req.params.oferta)
            .then(item => item.$set('Promo', req.params.promo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarOfertapromos', res));
        //* 17
        this.desligarpromos = (req, res, next) => modelo_1.Oferta.findById(req.params.oferta)
            .then(item => item.$remove('Promo', req.params.promo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarOfertapromos', res));
        //* 21
        this.salientes = (req, res, next) => modelo_1.Oferta.findById(req.params.id)
            .then(item => item.$get('Salientes'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'OfertaSalientes', res));
        //* 21
        this.ligarsalientes = (req, res, next) => modelo_1.Oferta.findById(req.params.oferta)
            .then(item => item.$add('Salientes', req.params.version, { through: req.body ? req.body : null }))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarOfertaSalientes', res));
        //* 21
        this.desligarsalientes = (req, res, next) => modelo_1.Oferta.findById(req.params.oferta)
            .then(item => item.$remove('Salientes', req.params.version))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarOfertaSalientes', res));
        //* 22
        this.entrantes = (req, res, next) => modelo_1.Oferta.findById(req.params.id)
            .then(item => item.$get('Entrantes'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'OfertaEntrantes', res));
        //* 22
        this.ligarentrantes = (req, res, next) => modelo_1.Oferta.findById(req.params.oferta)
            .then(item => item.$add('Entrantes', req.params.version, { through: req.body ? req.body : null }))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarOfertaEntrantes', res));
        //* 22
        this.desligarentrantes = (req, res, next) => modelo_1.Oferta.findById(req.params.oferta)
            .then(item => item.$remove('Entrantes', req.params.version))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarOfertaEntrantes', res));
    }
}
exports.OfertaController = OfertaController;
