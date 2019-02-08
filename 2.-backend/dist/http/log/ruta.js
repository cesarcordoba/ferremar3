"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controlador_1 = require("./controlador");
class LogRouter {
    constructor() {
        this._rutas = express_1.Router();
        this.controlador = new controlador_1.LogController();
        this.init();
    }
    init() {
        //*
        this._rutas.route('/data/log')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);
        //*
        this._rutas.route('/data/log/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);
        //*
        this._rutas.route('/data/log/paginacion')
            .post(this.controlador.paginacion);
        this._rutas.route('/data/log/xUsuario/:id')
            .get(this.controlador.xusuario);
        this._rutas.route('/data/log/Usuario/:id')
            .get(this.controlador.usuario);
        //*
        this._rutas.route('/data/log-usuario/:log/:usuario')
            .put(this.controlador.ligarusuarios)
            .delete(this.controlador.desligarusuarios);
    }
    rutas() {
        return this._rutas;
    }
}
exports.LogRouter = LogRouter;
