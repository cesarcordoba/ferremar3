
import { Router } from "express";
import { SucursalController } from "./controlador";

export class SucursalRouter {
    private _rutas = Router();
    private controlador: SucursalController;

    constructor() {
        this.controlador = new SucursalController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/sucursal')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/sucursal/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/sucursal/paginacion')
            .post(this.controlador.paginacion);



        this._rutas.route('/data/sucursal/Usuario/:id')
            .get(this.controlador.usuario)

        //*
        this._rutas.route('/data/sucursal-usuario/:sucursal/:usuario')
            .put(this.controlador.ligarusuarios)
            .delete(this.controlador.desligarusuarios)

        

        //*
        this._rutas.route('/data/sucursal/ordenes/:id')
            .get(this.controlador.ordenes)

        //*
        this._rutas.route('/data/sucursal-orden/:sucursal/:orden')
            .put(this.controlador.ligarordenes)
            .delete(this.controlador.desligarordenes)

        
        //*
        this._rutas.route('/data/sucursal/Versiones/:id')
            .get(this.controlador.versiones)

        //*
        this._rutas.route('/data/sucursal-version-versiones/:sucursal/:version')
            .put(this.controlador.ligarversiones)
            .delete(this.controlador.desligarversiones)

                
        }

    rutas() {
        return this._rutas;
    }
}
