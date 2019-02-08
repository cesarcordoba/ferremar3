
import { Router } from "express";
import { CartelController } from "./controlador";

export class CartelRouter {
    private _rutas = Router();
    private controlador: CartelController;

    constructor() {
        this.controlador = new CartelController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/cartel')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/cartel/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/cartel/paginacion')
            .post(this.controlador.paginacion);


        this._rutas.route('/data/cartel/xAnuncio/:id')
            .get(this.controlador.xanuncio)

        this._rutas.route('/data/cartel/Anuncio/:id')
            .get(this.controlador.anuncio)

        //*
        this._rutas.route('/data/cartel-anuncio/:cartel/:anuncio')
            .put(this.controlador.ligaranuncios)
            .delete(this.controlador.desligaranuncios)

        
        }

    rutas() {
        return this._rutas;
    }
}
