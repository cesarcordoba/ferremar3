"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = require('../error');
const _ = require('lodash');
const modelo_1 = require("./modelo");
class LlaveController {
    constructor() {
        //* null
        this.crear = (req, res, next) => modelo_1.Llave.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearLlave', res));
        //* null
        this.buscar = (req, res, next) => req.params.id ?
            modelo_1.Llave.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
                .catch(err => errorHandler(err, 'buscarLlave', res))
            :
                modelo_1.Llave.findAll()
                    .then(response => res.status(200).jsonp(response))
                    .catch(err => errorHandler(err, 'buscarLlave', res));
        //* null
        this.actualizar = (req, res, next) => modelo_1.Llave.update(req.body, { where: { id: req.params.id } })
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarLlave', res));
        //* null
        this.eliminar = (req, res, next) => modelo_1.Llave.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarLlave', res));
        //* null
        this.paginacion = (req, res, next) => modelo_1.Llave.findAndCountAll({
            order: req.body.order,
            where: req.body.where
        }).then(response => res.status(200).jsonp(new Object({
            items: _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
            paginas: Math.round(response.count / req.body.limite)
        })))
            .catch(err => errorHandler(err, 'paginacionLlave', res));
        //* 31
        this.xusuario = (req, res, next) => modelo_1.Llave.findAll({ where: { 'IdUsuario': req.params.id } })
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xLlaveusuarios', res));
        //* 31
        this.usuario = (req, res, next) => modelo_1.Llave.findById(req.params.id)
            .then(item => item.$get('Usuario'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Llaveusuarios', res));
        //* 31
        this.ligarusuarios = (req, res, next) => modelo_1.Llave.findById(req.params.llave)
            .then(item => item.$set('Usuario', req.params.usuario))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarLlaveusuarios', res));
        //* 31
        this.desligarusuarios = (req, res, next) => modelo_1.Llave.findById(req.params.llave)
            .then(item => item.$remove('Usuario', req.params.usuario))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarLlaveusuarios', res));
    }
}
exports.LlaveController = LlaveController;
