"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asignarPrincipal = require('./asignarPrincipal/asignarPrincipal');
const validarOpenpay = require('./validarOpenpay/validarOpenpay');
const errorHandler = require('../error');
const _ = require('lodash');
const modelo_1 = require("./modelo");
class TarjetaController {
    constructor() {
        //* null
        this.crear = (req, res, next) => modelo_1.Tarjeta.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearTarjeta', res));
        //* null
        this.buscar = (req, res, next) => req.params.id ?
            modelo_1.Tarjeta.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
                .catch(err => errorHandler(err, 'buscarTarjeta', res))
            :
                modelo_1.Tarjeta.findAll()
                    .then(response => res.status(200).jsonp(response))
                    .catch(err => errorHandler(err, 'buscarTarjeta', res));
        //* null
        this.actualizar = (req, res, next) => modelo_1.Tarjeta.update(req.body, { where: { id: req.params.id } })
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarTarjeta', res));
        //* null
        this.eliminar = (req, res, next) => modelo_1.Tarjeta.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarTarjeta', res));
        //* null
        this.paginacion = (req, res, next) => modelo_1.Tarjeta.findAndCountAll({
            order: req.body.order,
            where: req.body.where
        }).then(response => res.status(200).jsonp(new Object({
            items: _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
            paginas: Math.round(response.count / req.body.limite)
        })))
            .catch(err => errorHandler(err, 'paginacionTarjeta', res));
        //* 31
        this.xusuario = (req, res, next) => modelo_1.Tarjeta.findAll({ where: { 'IdUsuario': req.params.id } })
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xTarjetausuarios', res));
        //* 31
        this.usuario = (req, res, next) => modelo_1.Tarjeta.findById(req.params.id)
            .then(item => item.$get('Usuario'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Tarjetausuarios', res));
        //* 31
        this.ligarusuarios = (req, res, next) => modelo_1.Tarjeta.findById(req.params.tarjeta)
            .then(item => item.$set('Usuario', req.params.usuario))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarTarjetausuarios', res));
        //* 31
        this.desligarusuarios = (req, res, next) => modelo_1.Tarjeta.findById(req.params.tarjeta)
            .then(item => item.$remove('Usuario', req.params.usuario))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarTarjetausuarios', res));
        //* 33
        this.ordenes = (req, res, next) => modelo_1.Tarjeta.findById(req.params.id)
            .then(item => item.$get('Ordenes'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Tarjetaordenes', res));
        //* 33
        this.ligarordenes = (req, res, next) => modelo_1.Tarjeta.findById(req.params.tarjeta)
            .then(item => item.$add('Ordenes', req.params.orden))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarTarjetaordenes', res));
        //* 33
        this.desligarordenes = (req, res, next) => modelo_1.Tarjeta.findById(req.params.tarjeta)
            .then(item => item.$remove('Ordenes', req.params.orden))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarTarjetaordenes', res));
        //* 48
        this.cargos = (req, res, next) => modelo_1.Tarjeta.findById(req.params.id)
            .then(item => item.$get('Cargos'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Tarjetacargos', res));
        //* 48
        this.ligarcargos = (req, res, next) => modelo_1.Tarjeta.findById(req.params.tarjeta)
            .then(item => item.$add('Cargos', req.params.cargo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarTarjetacargos', res));
        //* 48
        this.desligarcargos = (req, res, next) => modelo_1.Tarjeta.findById(req.params.tarjeta)
            .then(item => item.$remove('Cargos', req.params.cargo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarTarjetacargos', res));
        this.asignarPrincipal = (req, res, next) => asignarPrincipal(req, res, next)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'Tarjeta_asignarPrincipal', res));
        this.validarOpenpay = (req, res, next) => validarOpenpay(req, res, next)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'Tarjeta_validarOpenpay', res));
    }
}
exports.TarjetaController = TarjetaController;
