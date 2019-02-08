"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controlador_1 = require("./controlador");
class AnuncioRouter {
    constructor() {
        this._rutas = express_1.Router();
        this.controlador = new controlador_1.AnuncioController();
        this.init();
    }
    init() {
        //*
        this._rutas.route('/data/anuncio')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);
        //*
        this._rutas.route('/data/anuncio/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);
        //*
        this._rutas.route('/data/anuncio/paginacion')
            .post(this.controlador.paginacion);
        //*
        this._rutas.route('/data/anuncio/carteles/:id')
            .get(this.controlador.carteles);
        //*
        this._rutas.route('/data/anuncio-cartel/:anuncio/:cartel')
            .put(this.controlador.ligarcarteles)
            .delete(this.controlador.desligarcarteles);
    }
    rutas() {
        return this._rutas;
    }
}
exports.AnuncioRouter = AnuncioRouter;
