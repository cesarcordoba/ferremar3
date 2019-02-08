
import { Router } from "express";
import { TutorialController } from "./controlador";

export class TutorialRouter {
    private _rutas = Router();
    private controlador: TutorialController;

    constructor() {
        this.controlador = new TutorialController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/tutorial')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/tutorial/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/tutorial/paginacion')
            .post(this.controlador.paginacion);


        }

    rutas() {
        return this._rutas;
    }
}
