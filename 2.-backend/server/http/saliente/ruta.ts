
import { Router } from "express";
import { SalienteController } from "./controlador";

export class SalienteRouter {
    private _rutas = Router();
    private controlador: SalienteController;

    constructor() {
        this.controlador = new SalienteController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/saliente')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/saliente/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/saliente/paginacion')
            .post(this.controlador.paginacion);


        }

    rutas() {
        return this._rutas;
    }
}
