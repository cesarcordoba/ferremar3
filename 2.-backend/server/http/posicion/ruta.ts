
import { Router } from "express";
import { PosicionController } from "./controlador";

export class PosicionRouter {
    private _rutas = Router();
    private controlador: PosicionController;

    constructor() {
        this.controlador = new PosicionController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/posicion')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/posicion/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/posicion/paginacion')
            .post(this.controlador.paginacion);


        }

    rutas() {
        return this._rutas;
    }
}
