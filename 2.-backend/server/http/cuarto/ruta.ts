
import { Router } from "express";
import { CuartoController } from "./controlador";

export class CuartoRouter {
    private _rutas = Router();
    private controlador: CuartoController;

    constructor() {
        this.controlador = new CuartoController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/cuarto')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/cuarto/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/cuarto/paginacion')
            .post(this.controlador.paginacion);



        //*
        this._rutas.route('/data/cuarto/ambientes/:id')
            .get(this.controlador.ambientes)

        //*
        this._rutas.route('/data/cuarto-ambiente/:cuarto/:ambiente')
            .put(this.controlador.ligarambientes)
            .delete(this.controlador.desligarambientes)

        
        }

    rutas() {
        return this._rutas;
    }
}
