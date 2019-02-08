
import { Router } from "express";
import { AccionController } from "./controlador";

export class AccionRouter {
    private _rutas = Router();
    private controlador: AccionController;

    constructor() {
        this.controlador = new AccionController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/accion')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/accion/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/accion/paginacion')
            .post(this.controlador.paginacion);


        this._rutas.route('/data/accion/xUsuario/:id')
            .get(this.controlador.xusuario)

        this._rutas.route('/data/accion/Usuario/:id')
            .get(this.controlador.usuario)

        //*
        this._rutas.route('/data/accion-usuario/:accion/:usuario')
            .put(this.controlador.ligarusuarios)
            .delete(this.controlador.desligarusuarios)

        
        }

    rutas() {
        return this._rutas;
    }
}
