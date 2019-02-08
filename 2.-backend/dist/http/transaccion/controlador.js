"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = require('../error');
const _ = require('lodash');
const modelo_1 = require("./modelo");
class TransaccionController {
    constructor() {
        //* null
        this.crear = (req, res, next) => modelo_1.Transaccion.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearTransaccion', res));
        //* null
        this.buscar = (req, res, next) => req.params.id ?
            modelo_1.Transaccion.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
                .catch(err => errorHandler(err, 'buscarTransaccion', res))
            :
                modelo_1.Transaccion.findAll()
                    .then(response => res.status(200).jsonp(response))
                    .catch(err => errorHandler(err, 'buscarTransaccion', res));
        //* null
        this.actualizar = (req, res, next) => modelo_1.Transaccion.update(req.body, { where: { id: req.params.id } })
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarTransaccion', res));
        //* null
        this.eliminar = (req, res, next) => modelo_1.Transaccion.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarTransaccion', res));
        //* null
        this.paginacion = (req, res, next) => modelo_1.Transaccion.findAndCountAll({
            order: req.body.order,
            where: req.body.where
        }).then(response => res.status(200).jsonp(new Object({
            items: _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
            paginas: Math.round(response.count / req.body.limite)
        })))
            .catch(err => errorHandler(err, 'paginacionTransaccion', res));
        //* 9
        this.xversion = (req, res, next) => modelo_1.Transaccion.findAll({ where: { 'IdVersion': req.params.id } })
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xTransaccionversiones', res));
        //* 9
        this.version = (req, res, next) => modelo_1.Transaccion.findById(req.params.id)
            .then(item => item.$get('Version'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Transaccionversiones', res));
        //* 9
        this.ligarversiones = (req, res, next) => modelo_1.Transaccion.findById(req.params.transaccion)
            .then(item => item.$set('Version', req.params.version))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarTransaccionversiones', res));
        //* 9
        this.desligarversiones = (req, res, next) => modelo_1.Transaccion.findById(req.params.transaccion)
            .then(item => item.$remove('Version', req.params.version))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarTransaccionversiones', res));
        //* 15
        this.margenes = (req, res, next) => modelo_1.Transaccion.findById(req.params.id)
            .then(item => item.$get('Margenes'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Transaccionmargenes', res));
        //* 15
        this.ligarmargenes = (req, res, next) => modelo_1.Transaccion.findById(req.params.transaccion)
            .then(item => item.$add('Margenes', req.params.margen))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarTransaccionmargenes', res));
        //* 15
        this.desligarmargenes = (req, res, next) => modelo_1.Transaccion.findById(req.params.transaccion)
            .then(item => item.$remove('Margenes', req.params.margen))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarTransaccionmargenes', res));
        //* 17
        this.xpromo = (req, res, next) => modelo_1.Transaccion.findAll({ where: { 'IdPromo': req.params.id } })
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xTransaccionpromos', res));
        //* 17
        this.promo = (req, res, next) => modelo_1.Transaccion.findById(req.params.id)
            .then(item => item.$get('Promo'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Transaccionpromos', res));
        //* 17
        this.ligarpromos = (req, res, next) => modelo_1.Transaccion.findById(req.params.transaccion)
            .then(item => item.$set('Promo', req.params.promo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarTransaccionpromos', res));
        //* 17
        this.desligarpromos = (req, res, next) => modelo_1.Transaccion.findById(req.params.transaccion)
            .then(item => item.$remove('Promo', req.params.promo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarTransaccionpromos', res));
        //* 19
        this.descuentos = (req, res, next) => modelo_1.Transaccion.findById(req.params.id)
            .then(item => item.$get('Descuentos'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Transacciondescuentos', res));
        //* 19
        this.ligardescuentos = (req, res, next) => modelo_1.Transaccion.findById(req.params.transaccion)
            .then(item => item.$add('Descuentos', req.params.descuento))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarTransacciondescuentos', res));
        //* 19
        this.desligardescuentos = (req, res, next) => modelo_1.Transaccion.findById(req.params.transaccion)
            .then(item => item.$remove('Descuentos', req.params.descuento))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarTransacciondescuentos', res));
        //* 24
        this.xprecio = (req, res, next) => modelo_1.Transaccion.findAll({ where: { 'IdPrecio': req.params.id } })
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xTransaccionprecios', res));
        //* 24
        this.precio = (req, res, next) => modelo_1.Transaccion.findById(req.params.id)
            .then(item => item.$get('Precio'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Transaccionprecios', res));
        //* 24
        this.ligarprecios = (req, res, next) => modelo_1.Transaccion.findById(req.params.transaccion)
            .then(item => item.$set('Precio', req.params.precio))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarTransaccionprecios', res));
        //* 24
        this.desligarprecios = (req, res, next) => modelo_1.Transaccion.findById(req.params.transaccion)
            .then(item => item.$remove('Precio', req.params.precio))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarTransaccionprecios', res));
        //* 33
        this.xorden = (req, res, next) => modelo_1.Transaccion.findAll({ where: { 'IdOrden': req.params.id } })
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xTransaccionordenes', res));
        //* 33
        this.orden = (req, res, next) => modelo_1.Transaccion.findById(req.params.id)
            .then(item => item.$get('Orden'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Transaccionordenes', res));
        //* 33
        this.ligarordenes = (req, res, next) => modelo_1.Transaccion.findById(req.params.transaccion)
            .then(item => item.$set('Orden', req.params.orden))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarTransaccionordenes', res));
        //* 33
        this.desligarordenes = (req, res, next) => modelo_1.Transaccion.findById(req.params.transaccion)
            .then(item => item.$remove('Orden', req.params.orden))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarTransaccionordenes', res));
        //* 43
        this.xentrega = (req, res, next) => modelo_1.Transaccion.findAll({ where: { 'IdEntrega': req.params.id } })
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xTransaccionentregas', res));
        //* 43
        this.entrega = (req, res, next) => modelo_1.Transaccion.findById(req.params.id)
            .then(item => item.$get('Entrega'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Transaccionentregas', res));
        //* 43
        this.ligarentregas = (req, res, next) => modelo_1.Transaccion.findById(req.params.transaccion)
            .then(item => item.$set('Entrega', req.params.entrega))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarTransaccionentregas', res));
        //* 43
        this.desligarentregas = (req, res, next) => modelo_1.Transaccion.findById(req.params.transaccion)
            .then(item => item.$remove('Entrega', req.params.entrega))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarTransaccionentregas', res));
    }
}
exports.TransaccionController = TransaccionController;
