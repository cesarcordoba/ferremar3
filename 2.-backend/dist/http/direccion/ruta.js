"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controlador_1 = require("./controlador");
class DireccionRouter {
    constructor() {
        this._rutas = express_1.Router();
        this.controlador = new controlador_1.DireccionController();
        this.init();
    }
    init() {
        //*
        this._rutas.route('/data/direccion')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);
        //*
        this._rutas.route('/data/direccion/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);
        //*
        this._rutas.route('/data/direccion/paginacion')
            .post(this.controlador.paginacion);
        this._rutas.route('/data/direccion/xUsuario/:id')
            .get(this.controlador.xusuario);
        this._rutas.route('/data/direccion/Usuario/:id')
            .get(this.controlador.usuario);
        //*
        this._rutas.route('/data/direccion-usuario/:direccion/:usuario')
            .put(this.controlador.ligarusuarios)
            .delete(this.controlador.desligarusuarios);
        //*
        this._rutas.route('/data/direccion/ordenes/:id')
            .get(this.controlador.ordenes);
        //*
        this._rutas.route('/data/direccion-orden/:direccion/:orden')
            .put(this.controlador.ligarordenes)
            .delete(this.controlador.desligarordenes);
        this._rutas.route('/data/direccion_asignarPrincipal/:id')
            .get(this.controlador.asignarPrincipal);
    }
    rutas() {
        return this._rutas;
    }
}
exports.DireccionRouter = DireccionRouter;
