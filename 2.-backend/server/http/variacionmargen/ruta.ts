
import { Router } from "express";
import { VariacionmargenController } from "./controlador";

export class VariacionmargenRouter {
    private _rutas = Router();
    private controlador: VariacionmargenController;

    constructor() {
        this.controlador = new VariacionmargenController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/variacionmargen')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/variacionmargen/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/variacionmargen/paginacion')
            .post(this.controlador.paginacion);



        this._rutas.route('/data/variacionmargen_cambiarStatus')
            .get(this.controlador.cambiarStatus)

        
        }

    rutas() {
        return this._rutas;
    }
}
