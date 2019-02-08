"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crearOrden = require('./crearOrden/crearOrden');
const crearCargo = require('./crearCargo/crearCargo');
const errorHandler = require('../error');
const _ = require('lodash');
const modelo_1 = require("./modelo");
class OrdenController {
    constructor() {
        //* null
        this.crear = (req, res, next) => modelo_1.Orden.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearOrden', res));
        //* null
        this.buscar = (req, res, next) => req.params.id ?
            modelo_1.Orden.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
                .catch(err => errorHandler(err, 'buscarOrden', res))
            :
                modelo_1.Orden.findAll()
                    .then(response => res.status(200).jsonp(response))
                    .catch(err => errorHandler(err, 'buscarOrden', res));
        //* null
        this.actualizar = (req, res, next) => modelo_1.Orden.update(req.body, { where: { id: req.params.id } })
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarOrden', res));
        //* null
        this.eliminar = (req, res, next) => modelo_1.Orden.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarOrden', res));
        //* null
        this.paginacion = (req, res, next) => modelo_1.Orden.findAndCountAll({
            order: req.body.order,
            where: req.body.where
        }).then(response => res.status(200).jsonp(new Object({
            items: _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
            paginas: Math.round(response.count / req.body.limite)
        })))
            .catch(err => errorHandler(err, 'paginacionOrden', res));
        //* 25
        this.xsucursal = (req, res, next) => modelo_1.Orden.findAll({ where: { 'IdSucursal': req.params.id } })
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xOrdensucursales', res));
        //* 25
        this.sucursal = (req, res, next) => modelo_1.Orden.findById(req.params.id)
            .then(item => item.$get('Sucursal'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Ordensucursales', res));
        //* 25
        this.ligarsucursales = (req, res, next) => modelo_1.Orden.findById(req.params.orden)
            .then(item => item.$set('Sucursal', req.params.sucursal))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarOrdensucursales', res));
        //* 25
        this.desligarsucursales = (req, res, next) => modelo_1.Orden.findById(req.params.orden)
            .then(item => item.$remove('Sucursal', req.params.sucursal))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarOrdensucursales', res));
        //* 31
        this.xusuario = (req, res, next) => modelo_1.Orden.findAll({ where: { 'IdUsuario': req.params.id } })
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xOrdenusuarios', res));
        //* 31
        this.usuario = (req, res, next) => modelo_1.Orden.findById(req.params.id)
            .then(item => item.$get('Usuario'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Ordenusuarios', res));
        //* 31
        this.ligarusuarios = (req, res, next) => modelo_1.Orden.findById(req.params.orden)
            .then(item => item.$set('Usuario', req.params.usuario))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarOrdenusuarios', res));
        //* 31
        this.desligarusuarios = (req, res, next) => modelo_1.Orden.findById(req.params.orden)
            .then(item => item.$remove('Usuario', req.params.usuario))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarOrdenusuarios', res));
        //* 32
        this.transacciones = (req, res, next) => modelo_1.Orden.findById(req.params.id)
            .then(item => item.$get('Transacciones'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Ordentransacciones', res));
        //* 32
        this.ligartransacciones = (req, res, next) => modelo_1.Orden.findById(req.params.orden)
            .then(item => item.$add('Transacciones', req.params.transaccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarOrdentransacciones', res));
        //* 32
        this.desligartransacciones = (req, res, next) => modelo_1.Orden.findById(req.params.orden)
            .then(item => item.$remove('Transacciones', req.params.transaccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarOrdentransacciones', res));
        //* 39
        this.xdireccion = (req, res, next) => modelo_1.Orden.findAll({ where: { 'IdDireccion': req.params.id } })
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xOrdendirecciones', res));
        //* 39
        this.direccion = (req, res, next) => modelo_1.Orden.findById(req.params.id)
            .then(item => item.$get('Direccion'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Ordendirecciones', res));
        //* 39
        this.ligardirecciones = (req, res, next) => modelo_1.Orden.findById(req.params.orden)
            .then(item => item.$set('Direccion', req.params.direccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarOrdendirecciones', res));
        //* 39
        this.desligardirecciones = (req, res, next) => modelo_1.Orden.findById(req.params.orden)
            .then(item => item.$remove('Direccion', req.params.direccion))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarOrdendirecciones', res));
        //* 40
        this.xtarjeta = (req, res, next) => modelo_1.Orden.findAll({ where: { 'IdTarjeta': req.params.id } })
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xOrdentarjetas', res));
        //* 40
        this.tarjeta = (req, res, next) => modelo_1.Orden.findById(req.params.id)
            .then(item => item.$get('Tarjeta'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Ordentarjetas', res));
        //* 40
        this.ligartarjetas = (req, res, next) => modelo_1.Orden.findById(req.params.orden)
            .then(item => item.$set('Tarjeta', req.params.tarjeta))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarOrdentarjetas', res));
        //* 40
        this.desligartarjetas = (req, res, next) => modelo_1.Orden.findById(req.params.orden)
            .then(item => item.$remove('Tarjeta', req.params.tarjeta))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarOrdentarjetas', res));
        //* 43
        this.entregas = (req, res, next) => modelo_1.Orden.findById(req.params.id)
            .then(item => item.$get('Entregas'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Ordenentregas', res));
        //* 43
        this.ligarentregas = (req, res, next) => modelo_1.Orden.findById(req.params.orden)
            .then(item => item.$add('Entregas', req.params.entrega))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarOrdenentregas', res));
        //* 43
        this.desligarentregas = (req, res, next) => modelo_1.Orden.findById(req.params.orden)
            .then(item => item.$remove('Entregas', req.params.entrega))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarOrdenentregas', res));
        //* 48
        this.cargos = (req, res, next) => modelo_1.Orden.findById(req.params.id)
            .then(item => item.$get('Cargos'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Ordencargos', res));
        //* 48
        this.ligarcargos = (req, res, next) => modelo_1.Orden.findById(req.params.orden)
            .then(item => item.$add('Cargos', req.params.cargo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarOrdencargos', res));
        //* 48
        this.desligarcargos = (req, res, next) => modelo_1.Orden.findById(req.params.orden)
            .then(item => item.$remove('Cargos', req.params.cargo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarOrdencargos', res));
        this.crearOrden = (req, res, next) => crearOrden(req, res, next)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'Orden_crearOrden', res));
        this.crearCargo = (req, res, next) => crearCargo(req, res, next)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'Orden_crearCargo', res));
    }
}
exports.OrdenController = OrdenController;
