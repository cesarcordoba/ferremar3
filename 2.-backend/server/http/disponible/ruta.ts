
import { Router } from "express";
import { DisponibleController } from "./controlador";

export class DisponibleRouter {
    private _rutas = Router();
    private controlador: DisponibleController;

    constructor() {
        this.controlador = new DisponibleController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/disponible')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/disponible/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/disponible/paginacion')
            .post(this.controlador.paginacion);


        }

    rutas() {
        return this._rutas;
    }
}
