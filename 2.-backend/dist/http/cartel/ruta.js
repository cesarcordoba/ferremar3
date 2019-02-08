"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controlador_1 = require("./controlador");
class CartelRouter {
    constructor() {
        this._rutas = express_1.Router();
        this.controlador = new controlador_1.CartelController();
        this.init();
    }
    init() {
        //*
        this._rutas.route('/data/cartel')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);
        //*
        this._rutas.route('/data/cartel/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);
        //*
        this._rutas.route('/data/cartel/paginacion')
            .post(this.controlador.paginacion);
        this._rutas.route('/data/cartel/xAnuncio/:id')
            .get(this.controlador.xanuncio);
        this._rutas.route('/data/cartel/Anuncio/:id')
            .get(this.controlador.anuncio);
        //*
        this._rutas.route('/data/cartel-anuncio/:cartel/:anuncio')
            .put(this.controlador.ligaranuncios)
            .delete(this.controlador.desligaranuncios);
    }
    rutas() {
        return this._rutas;
    }
}
exports.CartelRouter = CartelRouter;
