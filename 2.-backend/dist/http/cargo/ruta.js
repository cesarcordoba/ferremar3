"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controlador_1 = require("./controlador");
class CargoRouter {
    constructor() {
        this._rutas = express_1.Router();
        this.controlador = new controlador_1.CargoController();
        this.init();
    }
    init() {
        //*
        this._rutas.route('/data/cargo')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);
        //*
        this._rutas.route('/data/cargo/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);
        //*
        this._rutas.route('/data/cargo/paginacion')
            .post(this.controlador.paginacion);
        this._rutas.route('/data/cargo/xOrden/:id')
            .get(this.controlador.xorden);
        this._rutas.route('/data/cargo/Orden/:id')
            .get(this.controlador.orden);
        //*
        this._rutas.route('/data/cargo-orden/:cargo/:orden')
            .put(this.controlador.ligarordenes)
            .delete(this.controlador.desligarordenes);
        this._rutas.route('/data/cargo/xTarjeta/:id')
            .get(this.controlador.xtarjeta);
        this._rutas.route('/data/cargo/Tarjeta/:id')
            .get(this.controlador.tarjeta);
        //*
        this._rutas.route('/data/cargo-tarjeta/:cargo/:tarjeta')
            .put(this.controlador.ligartarjetas)
            .delete(this.controlador.desligartarjetas);
    }
    rutas() {
        return this._rutas;
    }
}
exports.CargoRouter = CargoRouter;
