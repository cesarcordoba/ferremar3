"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = require('../error');
const _ = require('lodash');
const modelo_1 = require("./modelo");
class CargoController {
    constructor() {
        //* null
        this.crear = (req, res, next) => modelo_1.Cargo.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearCargo', res));
        //* null
        this.buscar = (req, res, next) => req.params.id ?
            modelo_1.Cargo.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
                .catch(err => errorHandler(err, 'buscarCargo', res))
            :
                modelo_1.Cargo.findAll()
                    .then(response => res.status(200).jsonp(response))
                    .catch(err => errorHandler(err, 'buscarCargo', res));
        //* null
        this.actualizar = (req, res, next) => modelo_1.Cargo.update(req.body, { where: { id: req.params.id } })
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarCargo', res));
        //* null
        this.eliminar = (req, res, next) => modelo_1.Cargo.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarCargo', res));
        //* null
        this.paginacion = (req, res, next) => modelo_1.Cargo.findAndCountAll({
            order: req.body.order,
            where: req.body.where
        }).then(response => res.status(200).jsonp(new Object({
            items: _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
            paginas: Math.round(response.count / req.body.limite)
        })))
            .catch(err => errorHandler(err, 'paginacionCargo', res));
        //* 33
        this.xorden = (req, res, next) => modelo_1.Cargo.findAll({ where: { 'IdOrden': req.params.id } })
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xCargoordenes', res));
        //* 33
        this.orden = (req, res, next) => modelo_1.Cargo.findById(req.params.id)
            .then(item => item.$get('Orden'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Cargoordenes', res));
        //* 33
        this.ligarordenes = (req, res, next) => modelo_1.Cargo.findById(req.params.cargo)
            .then(item => item.$set('Orden', req.params.orden))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarCargoordenes', res));
        //* 33
        this.desligarordenes = (req, res, next) => modelo_1.Cargo.findById(req.params.cargo)
            .then(item => item.$remove('Orden', req.params.orden))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarCargoordenes', res));
        //* 40
        this.xtarjeta = (req, res, next) => modelo_1.Cargo.findAll({ where: { 'IdTarjeta': req.params.id } })
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xCargotarjetas', res));
        //* 40
        this.tarjeta = (req, res, next) => modelo_1.Cargo.findById(req.params.id)
            .then(item => item.$get('Tarjeta'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Cargotarjetas', res));
        //* 40
        this.ligartarjetas = (req, res, next) => modelo_1.Cargo.findById(req.params.cargo)
            .then(item => item.$set('Tarjeta', req.params.tarjeta))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarCargotarjetas', res));
        //* 40
        this.desligartarjetas = (req, res, next) => modelo_1.Cargo.findById(req.params.cargo)
            .then(item => item.$remove('Tarjeta', req.params.tarjeta))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarCargotarjetas', res));
    }
}
exports.CargoController = CargoController;
