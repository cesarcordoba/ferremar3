
import { Router } from "express";
import { OfertaController } from "./controlador";

export class OfertaRouter {
    private _rutas = Router();
    private controlador: OfertaController;

    constructor() {
        this.controlador = new OfertaController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/oferta')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/oferta/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/oferta/paginacion')
            .post(this.controlador.paginacion);


        this._rutas.route('/data/oferta/xPromo/:id')
            .get(this.controlador.xpromo)

        this._rutas.route('/data/oferta/Promo/:id')
            .get(this.controlador.promo)

        //*
        this._rutas.route('/data/oferta-promo/:oferta/:promo')
            .put(this.controlador.ligarpromos)
            .delete(this.controlador.desligarpromos)

        
        //*
        this._rutas.route('/data/oferta/Salientes/:id')
            .get(this.controlador.salientes)

        //*
        this._rutas.route('/data/oferta-version-salientes/:oferta/:version')
            .put(this.controlador.ligarsalientes)
            .delete(this.controlador.desligarsalientes)

                
        //*
        this._rutas.route('/data/oferta/Entrantes/:id')
            .get(this.controlador.entrantes)

        //*
        this._rutas.route('/data/oferta-version-entrantes/:oferta/:version')
            .put(this.controlador.ligarentrantes)
            .delete(this.controlador.desligarentrantes)

                
        }

    rutas() {
        return this._rutas;
    }
}
