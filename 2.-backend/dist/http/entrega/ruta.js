"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controlador_1 = require("./controlador");
class EntregaRouter {
    constructor() {
        this._rutas = express_1.Router();
        this.controlador = new controlador_1.EntregaController();
        this.init();
    }
    init() {
        //*
        this._rutas.route('/data/entrega')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);
        //*
        this._rutas.route('/data/entrega/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);
        //*
        this._rutas.route('/data/entrega/paginacion')
            .post(this.controlador.paginacion);
        //*
        this._rutas.route('/data/entrega/transacciones/:id')
            .get(this.controlador.transacciones);
        //*
        this._rutas.route('/data/entrega-transaccion/:entrega/:transaccion')
            .put(this.controlador.ligartransacciones)
            .delete(this.controlador.desligartransacciones);
        this._rutas.route('/data/entrega/xOrden/:id')
            .get(this.controlador.xorden);
        this._rutas.route('/data/entrega/Orden/:id')
            .get(this.controlador.orden);
        //*
        this._rutas.route('/data/entrega-orden/:entrega/:orden')
            .put(this.controlador.ligarordenes)
            .delete(this.controlador.desligarordenes);
    }
    rutas() {
        return this._rutas;
    }
}
exports.EntregaRouter = EntregaRouter;
