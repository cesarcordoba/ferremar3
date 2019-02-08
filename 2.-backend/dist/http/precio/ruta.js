"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controlador_1 = require("./controlador");
class PrecioRouter {
    constructor() {
        this._rutas = express_1.Router();
        this.controlador = new controlador_1.PrecioController();
        this.init();
    }
    init() {
        //*
        this._rutas.route('/data/precio')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);
        //*
        this._rutas.route('/data/precio/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);
        //*
        this._rutas.route('/data/precio/paginacion')
            .post(this.controlador.paginacion);
        //*
        this._rutas.route('/data/precio/transacciones/:id')
            .get(this.controlador.transacciones);
        //*
        this._rutas.route('/data/precio-transaccion/:precio/:transaccion')
            .put(this.controlador.ligartransacciones)
            .delete(this.controlador.desligartransacciones);
        //*
        this._rutas.route('/data/precio/Inventarios/:id')
            .get(this.controlador.inventarios);
        //*
        this._rutas.route('/data/precio-inventario-inventarios/:precio/:inventario')
            .put(this.controlador.ligarinventarios)
            .delete(this.controlador.desligarinventarios);
    }
    rutas() {
        return this._rutas;
    }
}
exports.PrecioRouter = PrecioRouter;
