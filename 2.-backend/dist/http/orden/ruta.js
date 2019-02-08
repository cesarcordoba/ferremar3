"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controlador_1 = require("./controlador");
class OrdenRouter {
    constructor() {
        this._rutas = express_1.Router();
        this.controlador = new controlador_1.OrdenController();
        this.init();
    }
    init() {
        //*
        this._rutas.route('/data/orden')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);
        //*
        this._rutas.route('/data/orden/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);
        //*
        this._rutas.route('/data/orden/paginacion')
            .post(this.controlador.paginacion);
        this._rutas.route('/data/orden/xSucursal/:id')
            .get(this.controlador.xsucursal);
        this._rutas.route('/data/orden/Sucursal/:id')
            .get(this.controlador.sucursal);
        //*
        this._rutas.route('/data/orden-sucursal/:orden/:sucursal')
            .put(this.controlador.ligarsucursales)
            .delete(this.controlador.desligarsucursales);
        this._rutas.route('/data/orden/xUsuario/:id')
            .get(this.controlador.xusuario);
        this._rutas.route('/data/orden/Usuario/:id')
            .get(this.controlador.usuario);
        //*
        this._rutas.route('/data/orden-usuario/:orden/:usuario')
            .put(this.controlador.ligarusuarios)
            .delete(this.controlador.desligarusuarios);
        //*
        this._rutas.route('/data/orden/transacciones/:id')
            .get(this.controlador.transacciones);
        //*
        this._rutas.route('/data/orden-transaccion/:orden/:transaccion')
            .put(this.controlador.ligartransacciones)
            .delete(this.controlador.desligartransacciones);
        this._rutas.route('/data/orden/xDireccion/:id')
            .get(this.controlador.xdireccion);
        this._rutas.route('/data/orden/Direccion/:id')
            .get(this.controlador.direccion);
        //*
        this._rutas.route('/data/orden-direccion/:orden/:direccion')
            .put(this.controlador.ligardirecciones)
            .delete(this.controlador.desligardirecciones);
        this._rutas.route('/data/orden/xTarjeta/:id')
            .get(this.controlador.xtarjeta);
        this._rutas.route('/data/orden/Tarjeta/:id')
            .get(this.controlador.tarjeta);
        //*
        this._rutas.route('/data/orden-tarjeta/:orden/:tarjeta')
            .put(this.controlador.ligartarjetas)
            .delete(this.controlador.desligartarjetas);
        //*
        this._rutas.route('/data/orden/entregas/:id')
            .get(this.controlador.entregas);
        //*
        this._rutas.route('/data/orden-entrega/:orden/:entrega')
            .put(this.controlador.ligarentregas)
            .delete(this.controlador.desligarentregas);
        //*
        this._rutas.route('/data/orden/cargos/:id')
            .get(this.controlador.cargos);
        //*
        this._rutas.route('/data/orden-cargo/:orden/:cargo')
            .put(this.controlador.ligarcargos)
            .delete(this.controlador.desligarcargos);
        this._rutas.route('/data/orden_crearOrden/')
            .post(this.controlador.crearOrden);
        this._rutas.route('/data/orden_crearCargo/')
            .put(this.controlador.crearCargo);
    }
    rutas() {
        return this._rutas;
    }
}
exports.OrdenRouter = OrdenRouter;
