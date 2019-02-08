"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controlador_1 = require("./controlador");
class VersionRouter {
    constructor() {
        this._rutas = express_1.Router();
        this.controlador = new controlador_1.VersionController();
        this.init();
    }
    init() {
        //*
        this._rutas.route('/data/version')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);
        //*
        this._rutas.route('/data/version/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);
        //*
        this._rutas.route('/data/version/paginacion')
            .post(this.controlador.paginacion);
        this._rutas.route('/data/version/xProducto/:id')
            .get(this.controlador.xproducto);
        this._rutas.route('/data/version/Producto/:id')
            .get(this.controlador.producto);
        //*
        this._rutas.route('/data/version-producto/:version/:producto')
            .put(this.controlador.ligarproductos)
            .delete(this.controlador.desligarproductos);
        //*
        this._rutas.route('/data/version/opciones/:id')
            .get(this.controlador.opciones);
        //*
        this._rutas.route('/data/version-opcion/:version/:opcion')
            .put(this.controlador.ligaropciones)
            .delete(this.controlador.desligaropciones);
        //*
        this._rutas.route('/data/version/descuentos/:id')
            .get(this.controlador.descuentos);
        //*
        this._rutas.route('/data/version-descuento/:version/:descuento')
            .put(this.controlador.ligardescuentos)
            .delete(this.controlador.desligardescuentos);
        //*
        this._rutas.route('/data/version/transacciones/:id')
            .get(this.controlador.transacciones);
        //*
        this._rutas.route('/data/version-transaccion/:version/:transaccion')
            .put(this.controlador.ligartransacciones)
            .delete(this.controlador.desligartransacciones);
        //*
        this._rutas.route('/data/version/Salientes/:id')
            .get(this.controlador.salientes);
        //*
        this._rutas.route('/data/version-oferta-salientes/:version/:oferta')
            .put(this.controlador.ligarsalientes)
            .delete(this.controlador.desligarsalientes);
        //*
        this._rutas.route('/data/version/Entrantes/:id')
            .get(this.controlador.entrantes);
        //*
        this._rutas.route('/data/version-oferta-entrantes/:version/:oferta')
            .put(this.controlador.ligarentrantes)
            .delete(this.controlador.desligarentrantes);
        //*
        this._rutas.route('/data/version/Sucursales/:id')
            .get(this.controlador.sucursales);
        //*
        this._rutas.route('/data/version-sucursal-sucursales/:version/:sucursal')
            .put(this.controlador.ligarsucursales)
            .delete(this.controlador.desligarsucursales);
        //*
        this._rutas.route('/data/version/Usuarios/:id')
            .get(this.controlador.usuarios);
        //*
        this._rutas.route('/data/version-usuario-usuarios/:version/:usuario')
            .put(this.controlador.ligarusuarios)
            .delete(this.controlador.desligarusuarios);
        this._rutas.route('/data/version_opcionesdisponibles/:id')
            .get(this.controlador.opcionesdisponibles);
        this._rutas.route('/data/version_precios/:id')
            .get(this.controlador.precios);
        this._rutas.route('/data/version_xNombre')
            .put(this.controlador.xNombre);
        this._rutas.route('/data/version_precioactual/:id')
            .get(this.controlador.precioactual);
        this._rutas.route('/data/version_margenes/:id')
            .get(this.controlador.margenes);
        this._rutas.route('/data/version_sincronizarPrecios')
            .get(this.controlador.sincronizarPrecios);
        this._rutas.route('/data/version_recalcular/:id')
            .get(this.controlador.recalcular);
    }
    rutas() {
        return this._rutas;
    }
}
exports.VersionRouter = VersionRouter;
