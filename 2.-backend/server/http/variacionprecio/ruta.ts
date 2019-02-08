
import { Router } from "express";
import { VariacionprecioController } from "./controlador";

export class VariacionprecioRouter {
    private _rutas = Router();
    private controlador: VariacionprecioController;

    constructor() {
        this.controlador = new VariacionprecioController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/variacionprecio')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/variacionprecio/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/variacionprecio/paginacion')
            .post(this.controlador.paginacion);


        }

    rutas() {
        return this._rutas;
    }
}
