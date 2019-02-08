
import { Router } from "express";
import { EntranteController } from "./controlador";

export class EntranteRouter {
    private _rutas = Router();
    private controlador: EntranteController;

    constructor() {
        this.controlador = new EntranteController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/entrante')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/entrante/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/entrante/paginacion')
            .post(this.controlador.paginacion);


        }

    rutas() {
        return this._rutas;
    }
}
