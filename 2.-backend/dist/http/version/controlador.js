"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const opcionesdisponibles = require('./opcionesdisponibles/opcionesdisponibles');
const precios = require('./precios/precios');
const xNombre = require('./xNombre/xNombre');
const precioactual = require('./precioactual/precioactual');
const margenes = require('./margenes/margenes');
const sincronizarPrecios = require('./sincronizarPrecios/sincronizarPrecios');
const recalcular = require('./recalcular/recalcular');
const errorHandler = require('../error');
const _ = require('lodash');
const modelo_1 = require("./modelo");
class VersionController {
    constructor() {
        //* null
        this.crear = (req, res, next) => modelo_1.Version.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearVersion', res));
        //* null
        this.buscar = (req, res, next) => req.params.id ?
            modelo_1.Version.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
                .catch(err => errorHandler(err, 'buscarVersion', res))
            :
                modelo_1.Version.findAll()
                    .then(response => res.status(200).jsonp(response))
                    .catch(err => errorHandler(err, 'buscarVersion', res));
        //* null
        this.actualizar = (req, res, next) => modelo_1.Version.update(req.body, { where: { id: req.params.id } })
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarVersion', res));
        //* null
        this.eliminar = (req, res, next) => modelo_1.Version.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarVersion', res));
        //* null
        this.paginacion = (req, res, next) => modelo_1.Version.findAndCountAll({
            order: req.body.order,
            where: req.body.where
        }).then(response => res.status(200).jsonp(new Object({
            items: _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
            paginas: Math.round(response.count / req.body.limite)
        })))
            .catch(err => errorHandler(err, 'paginacionVersion', res));
        //* 1
        this.xproducto = (req, res, next) => modelo_1.Version.findAll({ where: { 'IdProducto': req.params.id } })
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xVersionproductos', res));
        //* 1
        this.producto = (req, res, next) => modelo_1.Version.findById(req.params.id)
            .then(item => item.$get('Producto'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Versionproductos', res));
        //* 1
        this.ligarproductos = (req, res, next) => modelo_1.Version.findById(req.params.version)
            .then(item => item.$set('Producto', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarVersionproductos', res));
        //* 1
        this.desligarproductos = (req, res, next) => modelo_1.Version.findById(req.params.version)
            .then(item => item.$remove('Producto', req.params.producto))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarVersionproductos', res));
        //* 11
        this.opciones = (req, res, next) => modelo_1.Version.findById(req.params.id)
            .then(item => item.$get('Opciones'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Versionopciones', res));
        //* 11
        this.ligaropciones = (req, res, next) => modelo_1.Version.findById(req.params.version)
            .then(item => item.$add('Opciones', req.params.opcion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarVersionopciones', res));
        //* 11
        this.desligaropciones = (req, res, next) => modelo_1.Version.findById(req.params.version)
            .then(item => item.$remove('Opciones', req.params.opcion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarVersionopciones', res));
        //* 19
        this.descuentos = (req, res, next) => modelo_1.Version.findById(req.params.id)
            .then(item => item.$get('Descuentos'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Versiondescuentos', res));
        //* 19
        this.ligardescuentos = (req, res, next) => modelo_1.Version.findById(req.params.version)
            .then(item => item.$add('Descuentos', req.params.descuento))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarVersiondescuentos', res));
        //* 19
        this.desligardescuentos = (req, res, next) => modelo_1.Version.findById(req.params.version)
            .then(item => item.$remove('Descuentos', req.params.descuento))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarVersiondescuentos', res));
        //* 32
        this.transacciones = (req, res, next) => modelo_1.Version.findById(req.params.id)
            .then(item => item.$get('Transacciones'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Versiontransacciones', res));
        //* 32
        this.ligartransacciones = (req, res, next) => modelo_1.Version.findById(req.params.version)
            .then(item => item.$add('Transacciones', req.params.transaccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarVersiontransacciones', res));
        //* 32
        this.desligartransacciones = (req, res, next) => modelo_1.Version.findById(req.params.version)
            .then(item => item.$remove('Transacciones', req.params.transaccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarVersiontransacciones', res));
        //* 21
        this.salientes = (req, res, next) => modelo_1.Version.findById(req.params.id)
            .then(item => item.$get('Salientes'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'VersionSalientes', res));
        //* 21
        this.ligarsalientes = (req, res, next) => modelo_1.Version.findById(req.params.version)
            .then(item => item.$add('Salientes', req.params.oferta, { through: req.body ? req.body : null }))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarVersionSalientes', res));
        //* 21
        this.desligarsalientes = (req, res, next) => modelo_1.Version.findById(req.params.version)
            .then(item => item.$remove('Salientes', req.params.oferta))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarVersionSalientes', res));
        //* 22
        this.entrantes = (req, res, next) => modelo_1.Version.findById(req.params.id)
            .then(item => item.$get('Entrantes'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'VersionEntrantes', res));
        //* 22
        this.ligarentrantes = (req, res, next) => modelo_1.Version.findById(req.params.version)
            .then(item => item.$add('Entrantes', req.params.oferta, { through: req.body ? req.body : null }))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarVersionEntrantes', res));
        //* 22
        this.desligarentrantes = (req, res, next) => modelo_1.Version.findById(req.params.version)
            .then(item => item.$remove('Entrantes', req.params.oferta))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarVersionEntrantes', res));
        //* 23
        this.sucursales = (req, res, next) => modelo_1.Version.findById(req.params.id)
            .then(item => item.$get('Sucursales'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'VersionSucursales', res));
        //* 23
        this.ligarsucursales = (req, res, next) => modelo_1.Version.findById(req.params.version)
            .then(item => item.$add('Sucursales', req.params.sucursal, { through: req.body ? req.body : null }))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarVersionSucursales', res));
        //* 23
        this.desligarsucursales = (req, res, next) => modelo_1.Version.findById(req.params.version)
            .then(item => item.$remove('Sucursales', req.params.sucursal))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarVersionSucursales', res));
        //* 36
        this.usuarios = (req, res, next) => modelo_1.Version.findById(req.params.id)
            .then(item => item.$get('Usuarios'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'VersionUsuarios', res));
        //* 36
        this.ligarusuarios = (req, res, next) => modelo_1.Version.findById(req.params.version)
            .then(item => item.$add('Usuarios', req.params.usuario, { through: req.body ? req.body : null }))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarVersionUsuarios', res));
        //* 36
        this.desligarusuarios = (req, res, next) => modelo_1.Version.findById(req.params.version)
            .then(item => item.$remove('Usuarios', req.params.usuario))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarVersionUsuarios', res));
        this.opcionesdisponibles = (req, res, next) => opcionesdisponibles(req, res, next)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'Version_opcionesdisponibles', res));
        this.precios = (req, res, next) => precios(req, res, next)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'Version_precios', res));
        this.xNombre = (req, res, next) => xNombre(req, res, next)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'Version_xNombre', res));
        this.precioactual = (req, res, next) => precioactual(req, res, next)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'Version_precioactual', res));
        this.margenes = (req, res, next) => margenes(req, res, next)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'Version_margenes', res));
        this.sincronizarPrecios = (req, res, next) => sincronizarPrecios(req, res, next)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'Version_sincronizarPrecios', res));
        this.recalcular = (req, res, next) => recalcular(req, res, next)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'Version_recalcular', res));
    }
}
exports.VersionController = VersionController;
