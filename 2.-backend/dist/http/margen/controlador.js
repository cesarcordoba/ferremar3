"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sincronizarMargenes = require('./sincronizarMargenes/sincronizarMargenes');
const errorHandler = require('../error');
const _ = require('lodash');
const modelo_1 = require("./modelo");
class MargenController {
    constructor() {
        //* null
        this.crear = (req, res, next) => modelo_1.Margen.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearMargen', res));
        //* null
        this.buscar = (req, res, next) => req.params.id ?
            modelo_1.Margen.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
                .catch(err => errorHandler(err, 'buscarMargen', res))
            :
                modelo_1.Margen.findAll()
                    .then(response => res.status(200).jsonp(response))
                    .catch(err => errorHandler(err, 'buscarMargen', res));
        //* null
        this.actualizar = (req, res, next) => modelo_1.Margen.update(req.body, { where: { id: req.params.id } })
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarMargen', res));
        //* null
        this.eliminar = (req, res, next) => modelo_1.Margen.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarMargen', res));
        //* null
        this.paginacion = (req, res, next) => modelo_1.Margen.findAndCountAll({
            order: req.body.order,
            where: req.body.where
        }).then(response => res.status(200).jsonp(new Object({
            items: _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
            paginas: Math.round(response.count / req.body.limite)
        })))
            .catch(err => errorHandler(err, 'paginacionMargen', res));
        //* 1
        this.productos = (req, res, next) => modelo_1.Margen.findById(req.params.id)
            .then(item => item.$get('Productos'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Margenproductos', res));
        //* 1
        this.ligarproductos = (req, res, next) => modelo_1.Margen.findById(req.params.margen)
            .then(item => item.$add('Productos', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarMargenproductos', res));
        //* 1
        this.desligarproductos = (req, res, next) => modelo_1.Margen.findById(req.params.margen)
            .then(item => item.$remove('Productos', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarMargenproductos', res));
        //* 12
        this.xmarca = (req, res, next) => modelo_1.Margen.findAll({ where: { 'IdMarca': req.params.id } })
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xMargenmarcas', res));
        //* 12
        this.marca = (req, res, next) => modelo_1.Margen.findById(req.params.id)
            .then(item => item.$get('Marca'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Margenmarcas', res));
        //* 12
        this.ligarmarcas = (req, res, next) => modelo_1.Margen.findById(req.params.margen)
            .then(item => item.$set('Marca', req.params.marca))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarMargenmarcas', res));
        //* 12
        this.desligarmarcas = (req, res, next) => modelo_1.Margen.findById(req.params.margen)
            .then(item => item.$remove('Marca', req.params.marca))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarMargenmarcas', res));
        //* 32
        this.transacciones = (req, res, next) => modelo_1.Margen.findById(req.params.id)
            .then(item => item.$get('Transacciones'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Margentransacciones', res));
        //* 32
        this.ligartransacciones = (req, res, next) => modelo_1.Margen.findById(req.params.margen)
            .then(item => item.$add('Transacciones', req.params.transaccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarMargentransacciones', res));
        //* 32
        this.desligartransacciones = (req, res, next) => modelo_1.Margen.findById(req.params.margen)
            .then(item => item.$remove('Transacciones', req.params.transaccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarMargentransacciones', res));
        //* 44
        this.inventarios = (req, res, next) => modelo_1.Margen.findById(req.params.id)
            .then(item => item.$get('Inventarios'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'MargenInventarios', res));
        //* 44
        this.ligarinventarios = (req, res, next) => modelo_1.Margen.findById(req.params.margen)
            .then(item => item.$add('Inventarios', req.params.inventario, { through: req.body ? req.body : null }))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarMargenInventarios', res));
        //* 44
        this.desligarinventarios = (req, res, next) => modelo_1.Margen.findById(req.params.margen)
            .then(item => item.$remove('Inventarios', req.params.inventario))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarMargenInventarios', res));
        this.sincronizarMargenes = (req, res, next) => sincronizarMargenes(req, res, next)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'Margen_sincronizarMargenes', res));
    }
}
exports.MargenController = MargenController;
