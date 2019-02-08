"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = require('../error');
const _ = require('lodash');
const modelo_1 = require("./modelo");
class AccionController {
    constructor() {
        //* null
        this.crear = (req, res, next) => modelo_1.Accion.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearAccion', res));
        //* null
        this.buscar = (req, res, next) => req.params.id ?
            modelo_1.Accion.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
                .catch(err => errorHandler(err, 'buscarAccion', res))
            :
                modelo_1.Accion.findAll()
                    .then(response => res.status(200).jsonp(response))
                    .catch(err => errorHandler(err, 'buscarAccion', res));
        //* null
        this.actualizar = (req, res, next) => modelo_1.Accion.update(req.body, { where: { id: req.params.id } })
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarAccion', res));
        //* null
        this.eliminar = (req, res, next) => modelo_1.Accion.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarAccion', res));
        //* null
        this.paginacion = (req, res, next) => modelo_1.Accion.findAndCountAll({
            order: req.body.order,
            where: req.body.where
        }).then(response => res.status(200).jsonp(new Object({
            items: _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
            paginas: Math.round(response.count / req.body.limite)
        })))
            .catch(err => errorHandler(err, 'paginacionAccion', res));
        //* 31
        this.xusuario = (req, res, next) => modelo_1.Accion.findAll({ where: { 'IdUsuario': req.params.id } })
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xAccionusuarios', res));
        //* 31
        this.usuario = (req, res, next) => modelo_1.Accion.findById(req.params.id)
            .then(item => item.$get('Usuario'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Accionusuarios', res));
        //* 31
        this.ligarusuarios = (req, res, next) => modelo_1.Accion.findById(req.params.accion)
            .then(item => item.$set('Usuario', req.params.usuario))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarAccionusuarios', res));
        //* 31
        this.desligarusuarios = (req, res, next) => modelo_1.Accion.findById(req.params.accion)
            .then(item => item.$remove('Usuario', req.params.usuario))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarAccionusuarios', res));
    }
}
exports.AccionController = AccionController;
