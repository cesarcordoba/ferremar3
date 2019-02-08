
import { Router } from "express";
import { DescuentoController } from "./controlador";

export class DescuentoRouter {
    private _rutas = Router();
    private controlador: DescuentoController;

    constructor() {
        this.controlador = new DescuentoController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/descuento')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/descuento/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/descuento/paginacion')
            .post(this.controlador.paginacion);



        //*
        this._rutas.route('/data/descuento/versiones/:id')
            .get(this.controlador.versiones)

        //*
        this._rutas.route('/data/descuento-version/:descuento/:version')
            .put(this.controlador.ligarversiones)
            .delete(this.controlador.desligarversiones)

        
        this._rutas.route('/data/descuento/xPromo/:id')
            .get(this.controlador.xpromo)

        this._rutas.route('/data/descuento/Promo/:id')
            .get(this.controlador.promo)

        //*
        this._rutas.route('/data/descuento-promo/:descuento/:promo')
            .put(this.controlador.ligarpromos)
            .delete(this.controlador.desligarpromos)

        

        //*
        this._rutas.route('/data/descuento/transacciones/:id')
            .get(this.controlador.transacciones)

        //*
        this._rutas.route('/data/descuento-transaccion/:descuento/:transaccion')
            .put(this.controlador.ligartransacciones)
            .delete(this.controlador.desligartransacciones)

        
        }

    rutas() {
        return this._rutas;
    }
}
