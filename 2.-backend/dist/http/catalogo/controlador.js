"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = require('../error');
const _ = require('lodash');
const modelo_1 = require("./modelo");
class CatalogoController {
    constructor() {
        //* null
        this.crear = (req, res, next) => modelo_1.Catalogo.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearCatalogo', res));
        //* null
        this.buscar = (req, res, next) => req.params.id ?
            modelo_1.Catalogo.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
                .catch(err => errorHandler(err, 'buscarCatalogo', res))
            :
                modelo_1.Catalogo.findAll()
                    .then(response => res.status(200).jsonp(response))
                    .catch(err => errorHandler(err, 'buscarCatalogo', res));
        //* null
        this.actualizar = (req, res, next) => modelo_1.Catalogo.update(req.body, { where: { id: req.params.id } })
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarCatalogo', res));
        //* null
        this.eliminar = (req, res, next) => modelo_1.Catalogo.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarCatalogo', res));
        //* null
        this.paginacion = (req, res, next) => modelo_1.Catalogo.findAndCountAll({
            order: req.body.order,
            where: req.body.where
        }).then(response => res.status(200).jsonp(new Object({
            items: _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
            paginas: Math.round(response.count / req.body.limite)
        })))
            .catch(err => errorHandler(err, 'paginacionCatalogo', res));
        //* 12
        this.xmarca = (req, res, next) => modelo_1.Catalogo.findAll({ where: { 'IdMarca': req.params.id } })
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xCatalogomarcas', res));
        //* 12
        this.marca = (req, res, next) => modelo_1.Catalogo.findById(req.params.id)
            .then(item => item.$get('Marca'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Catalogomarcas', res));
        //* 12
        this.ligarmarcas = (req, res, next) => modelo_1.Catalogo.findById(req.params.catalogo)
            .then(item => item.$set('Marca', req.params.marca))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarCatalogomarcas', res));
        //* 12
        this.desligarmarcas = (req, res, next) => modelo_1.Catalogo.findById(req.params.catalogo)
            .then(item => item.$remove('Marca', req.params.marca))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarCatalogomarcas', res));
    }
}
exports.CatalogoController = CatalogoController;
