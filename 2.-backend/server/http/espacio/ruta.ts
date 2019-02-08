
import { Router } from "express";
import { EspacioController } from "./controlador";

export class EspacioRouter {
    private _rutas = Router();
    private controlador: EspacioController;

    constructor() {
        this.controlador = new EspacioController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/espacio')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/espacio/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/espacio/paginacion')
            .post(this.controlador.paginacion);


        this._rutas.route('/data/espacio/xAmbiente/:id')
            .get(this.controlador.xambiente)

        this._rutas.route('/data/espacio/Ambiente/:id')
            .get(this.controlador.ambiente)

        //*
        this._rutas.route('/data/espacio-ambiente/:espacio/:ambiente')
            .put(this.controlador.ligarambientes)
            .delete(this.controlador.desligarambientes)

        
        }

    rutas() {
        return this._rutas;
    }
}
