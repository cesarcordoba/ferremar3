
import { Router } from "express";
import { AnuncioController } from "./controlador";

export class AnuncioRouter {
    private _rutas = Router();
    private controlador: AnuncioController;

    constructor() {
        this.controlador = new AnuncioController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/anuncio')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/anuncio/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/anuncio/paginacion')
            .post(this.controlador.paginacion);



        //*
        this._rutas.route('/data/anuncio/carteles/:id')
            .get(this.controlador.carteles)

        //*
        this._rutas.route('/data/anuncio-cartel/:anuncio/:cartel')
            .put(this.controlador.ligarcarteles)
            .delete(this.controlador.desligarcarteles)

        
        }

    rutas() {
        return this._rutas;
    }
}
