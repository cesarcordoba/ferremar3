"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = require('../error');
const _ = require('lodash');
const modelo_1 = require("./modelo");
class OpcionController {
    constructor() {
        //* null
        this.crear = (req, res, next) => modelo_1.Opcion.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearOpcion', res));
        //* null
        this.buscar = (req, res, next) => req.params.id ?
            modelo_1.Opcion.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
                .catch(err => errorHandler(err, 'buscarOpcion', res))
            :
                modelo_1.Opcion.findAll()
                    .then(response => res.status(200).jsonp(response))
                    .catch(err => errorHandler(err, 'buscarOpcion', res));
        //* null
        this.actualizar = (req, res, next) => modelo_1.Opcion.update(req.body, { where: { id: req.params.id } })
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarOpcion', res));
        //* null
        this.eliminar = (req, res, next) => modelo_1.Opcion.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarOpcion', res));
        //* null
        this.paginacion = (req, res, next) => modelo_1.Opcion.findAndCountAll({
            order: req.body.order,
            where: req.body.where
        }).then(response => res.status(200).jsonp(new Object({
            items: _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
            paginas: Math.round(response.count / req.body.limite)
        })))
            .catch(err => errorHandler(err, 'paginacionOpcion', res));
        //* 9
        this.versiones = (req, res, next) => modelo_1.Opcion.findById(req.params.id)
            .then(item => item.$get('Versiones'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Opcionversiones', res));
        //* 9
        this.ligarversiones = (req, res, next) => modelo_1.Opcion.findById(req.params.opcion)
            .then(item => item.$add('Versiones', req.params.version))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarOpcionversiones', res));
        //* 9
        this.desligarversiones = (req, res, next) => modelo_1.Opcion.findById(req.params.opcion)
            .then(item => item.$remove('Versiones', req.params.version))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarOpcionversiones', res));
        //* 10
        this.xatributo = (req, res, next) => modelo_1.Opcion.findAll({ where: { 'IdAtributo': req.params.id } })
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xOpcionatributos', res));
        //* 10
        this.atributo = (req, res, next) => modelo_1.Opcion.findById(req.params.id)
            .then(item => item.$get('Atributo'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Opcionatributos', res));
        //* 10
        this.ligaratributos = (req, res, next) => modelo_1.Opcion.findById(req.params.opcion)
            .then(item => item.$set('Atributo', req.params.atributo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarOpcionatributos', res));
        //* 10
        this.desligaratributos = (req, res, next) => modelo_1.Opcion.findById(req.params.opcion)
            .then(item => item.$remove('Atributo', req.params.atributo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarOpcionatributos', res));
    }
}
exports.OpcionController = OpcionController;
