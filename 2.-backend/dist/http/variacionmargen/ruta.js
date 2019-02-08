"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controlador_1 = require("./controlador");
class VariacionmargenRouter {
    constructor() {
        this._rutas = express_1.Router();
        this.controlador = new controlador_1.VariacionmargenController();
        this.init();
    }
    init() {
        //*
        this._rutas.route('/data/variacionmargen')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);
        //*
        this._rutas.route('/data/variacionmargen/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);
        //*
        this._rutas.route('/data/variacionmargen/paginacion')
            .post(this.controlador.paginacion);
        this._rutas.route('/data/variacionmargen_cambiarStatus')
            .get(this.controlador.cambiarStatus);
    }
    rutas() {
        return this._rutas;
    }
}
exports.VariacionmargenRouter = VariacionmargenRouter;
