"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = require('../error');
const _ = require('lodash');
const modelo_1 = require("./modelo");
class DescuentoController {
    constructor() {
        //* null
        this.crear = (req, res, next) => modelo_1.Descuento.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearDescuento', res));
        //* null
        this.buscar = (req, res, next) => req.params.id ?
            modelo_1.Descuento.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
                .catch(err => errorHandler(err, 'buscarDescuento', res))
            :
                modelo_1.Descuento.findAll()
                    .then(response => res.status(200).jsonp(response))
                    .catch(err => errorHandler(err, 'buscarDescuento', res));
        //* null
        this.actualizar = (req, res, next) => modelo_1.Descuento.update(req.body, { where: { id: req.params.id } })
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarDescuento', res));
        //* null
        this.eliminar = (req, res, next) => modelo_1.Descuento.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarDescuento', res));
        //* null
        this.paginacion = (req, res, next) => modelo_1.Descuento.findAndCountAll({
            order: req.body.order,
            where: req.body.where
        }).then(response => res.status(200).jsonp(new Object({
            items: _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
            paginas: Math.round(response.count / req.body.limite)
        })))
            .catch(err => errorHandler(err, 'paginacionDescuento', res));
        //* 9
        this.versiones = (req, res, next) => modelo_1.Descuento.findById(req.params.id)
            .then(item => item.$get('Versiones'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Descuentoversiones', res));
        //* 9
        this.ligarversiones = (req, res, next) => modelo_1.Descuento.findById(req.params.descuento)
            .then(item => item.$add('Versiones', req.params.version))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarDescuentoversiones', res));
        //* 9
        this.desligarversiones = (req, res, next) => modelo_1.Descuento.findById(req.params.descuento)
            .then(item => item.$remove('Versiones', req.params.version))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarDescuentoversiones', res));
        //* 17
        this.xpromo = (req, res, next) => modelo_1.Descuento.findAll({ where: { 'IdPromo': req.params.id } })
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xDescuentopromos', res));
        //* 17
        this.promo = (req, res, next) => modelo_1.Descuento.findById(req.params.id)
            .then(item => item.$get('Promo'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Descuentopromos', res));
        //* 17
        this.ligarpromos = (req, res, next) => modelo_1.Descuento.findById(req.params.descuento)
            .then(item => item.$set('Promo', req.params.promo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarDescuentopromos', res));
        //* 17
        this.desligarpromos = (req, res, next) => modelo_1.Descuento.findById(req.params.descuento)
            .then(item => item.$remove('Promo', req.params.promo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarDescuentopromos', res));
        //* 32
        this.transacciones = (req, res, next) => modelo_1.Descuento.findById(req.params.id)
            .then(item => item.$get('Transacciones'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Descuentotransacciones', res));
        //* 32
        this.ligartransacciones = (req, res, next) => modelo_1.Descuento.findById(req.params.descuento)
            .then(item => item.$add('Transacciones', req.params.transaccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarDescuentotransacciones', res));
        //* 32
        this.desligartransacciones = (req, res, next) => modelo_1.Descuento.findById(req.params.descuento)
            .then(item => item.$remove('Transacciones', req.params.transaccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarDescuentotransacciones', res));
    }
}
exports.DescuentoController = DescuentoController;
