"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controlador_1 = require("./controlador");
class UsuarioRouter {
    constructor() {
        this._rutas = express_1.Router();
        this.controlador = new controlador_1.UsuarioController();
        this.init();
    }
    init() {
        //*
        this._rutas.route('/data/usuario')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);
        //*
        this._rutas.route('/data/usuario/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);
        //*
        this._rutas.route('/data/usuario/paginacion')
            .post(this.controlador.paginacion);
        this._rutas.route('/data/usuario/xSucursal/:id')
            .get(this.controlador.xsucursal);
        this._rutas.route('/data/usuario/Sucursal/:id')
            .get(this.controlador.sucursal);
        //*
        this._rutas.route('/data/usuario-sucursal/:usuario/:sucursal')
            .put(this.controlador.ligarsucursales)
            .delete(this.controlador.desligarsucursales);
        //*
        this._rutas.route('/data/usuario/ordenes/:id')
            .get(this.controlador.ordenes);
        //*
        this._rutas.route('/data/usuario-orden/:usuario/:orden')
            .put(this.controlador.ligarordenes)
            .delete(this.controlador.desligarordenes);
        this._rutas.route('/data/usuario/Llave/:id')
            .get(this.controlador.llave);
        //*
        this._rutas.route('/data/usuario-llave/:usuario/:llave')
            .put(this.controlador.ligarllaves)
            .delete(this.controlador.desligarllaves);
        //*
        this._rutas.route('/data/usuario/avatares/:id')
            .get(this.controlador.avatares);
        //*
        this._rutas.route('/data/usuario-avatar/:usuario/:avatar')
            .put(this.controlador.ligaravatares)
            .delete(this.controlador.desligaravatares);
        //*
        this._rutas.route('/data/usuario/logs/:id')
            .get(this.controlador.logs);
        //*
        this._rutas.route('/data/usuario-log/:usuario/:log')
            .put(this.controlador.ligarlogs)
            .delete(this.controlador.desligarlogs);
        //*
        this._rutas.route('/data/usuario/acciones/:id')
            .get(this.controlador.acciones);
        //*
        this._rutas.route('/data/usuario-accion/:usuario/:accion')
            .put(this.controlador.ligaracciones)
            .delete(this.controlador.desligaracciones);
        //*
        this._rutas.route('/data/usuario/direcciones/:id')
            .get(this.controlador.direcciones);
        //*
        this._rutas.route('/data/usuario-direccion/:usuario/:direccion')
            .put(this.controlador.ligardirecciones)
            .delete(this.controlador.desligardirecciones);
        //*
        this._rutas.route('/data/usuario/tarjetas/:id')
            .get(this.controlador.tarjetas);
        //*
        this._rutas.route('/data/usuario-tarjeta/:usuario/:tarjeta')
            .put(this.controlador.ligartarjetas)
            .delete(this.controlador.desligartarjetas);
        //*
        this._rutas.route('/data/usuario/Versiones/:id')
            .get(this.controlador.versiones);
        //*
        this._rutas.route('/data/usuario-version-versiones/:usuario/:version')
            .put(this.controlador.ligarversiones)
            .delete(this.controlador.desligarversiones);
        this._rutas.route('/data/usuario_setFavoritos/')
            .put(this.controlador.setFavoritos);
    }
    rutas() {
        return this._rutas;
    }
}
exports.UsuarioRouter = UsuarioRouter;
