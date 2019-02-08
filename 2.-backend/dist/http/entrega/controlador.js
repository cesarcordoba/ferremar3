"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = require('../error');
const _ = require('lodash');
const modelo_1 = require("./modelo");
class EntregaController {
    constructor() {
        //* null
        this.crear = (req, res, next) => modelo_1.Entrega.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearEntrega', res));
        //* null
        this.buscar = (req, res, next) => req.params.id ?
            modelo_1.Entrega.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
                .catch(err => errorHandler(err, 'buscarEntrega', res))
            :
                modelo_1.Entrega.findAll()
                    .then(response => res.status(200).jsonp(response))
                    .catch(err => errorHandler(err, 'buscarEntrega', res));
        //* null
        this.actualizar = (req, res, next) => modelo_1.Entrega.update(req.body, { where: { id: req.params.id } })
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarEntrega', res));
        //* null
        this.eliminar = (req, res, next) => modelo_1.Entrega.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarEntrega', res));
        //* null
        this.paginacion = (req, res, next) => modelo_1.Entrega.findAndCountAll({
            order: req.body.order,
            where: req.body.where
        }).then(response => res.status(200).jsonp(new Object({
            items: _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
            paginas: Math.round(response.count / req.body.limite)
        })))
            .catch(err => errorHandler(err, 'paginacionEntrega', res));
        //* 32
        this.transacciones = (req, res, next) => modelo_1.Entrega.findById(req.params.id)
            .then(item => item.$get('Transacciones'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Entregatransacciones', res));
        //* 32
        this.ligartransacciones = (req, res, next) => modelo_1.Entrega.findById(req.params.entrega)
            .then(item => item.$add('Transacciones', req.params.transaccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarEntregatransacciones', res));
        //* 32
        this.desligartransacciones = (req, res, next) => modelo_1.Entrega.findById(req.params.entrega)
            .then(item => item.$remove('Transacciones', req.params.transaccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarEntregatransacciones', res));
        //* 33
        this.xorden = (req, res, next) => modelo_1.Entrega.findAll({ where: { 'IdOrden': req.params.id } })
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xEntregaordenes', res));
        //* 33
        this.orden = (req, res, next) => modelo_1.Entrega.findById(req.params.id)
            .then(item => item.$get('Orden'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Entregaordenes', res));
        //* 33
        this.ligarordenes = (req, res, next) => modelo_1.Entrega.findById(req.params.entrega)
            .then(item => item.$set('Orden', req.params.orden))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarEntregaordenes', res));
        //* 33
        this.desligarordenes = (req, res, next) => modelo_1.Entrega.findById(req.params.entrega)
            .then(item => item.$remove('Orden', req.params.orden))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarEntregaordenes', res));
    }
}
exports.EntregaController = EntregaController;
