
import { Router } from "express";
import { FavoritoController } from "./controlador";

export class FavoritoRouter {
    private _rutas = Router();
    private controlador: FavoritoController;

    constructor() {
        this.controlador = new FavoritoController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/favorito')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/favorito/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/favorito/paginacion')
            .post(this.controlador.paginacion);


        }

    rutas() {
        return this._rutas;
    }
}
