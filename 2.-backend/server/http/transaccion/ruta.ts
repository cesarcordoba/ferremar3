
import { Router } from "express";
import { TransaccionController } from "./controlador";

export class TransaccionRouter {
    private _rutas = Router();
    private controlador: TransaccionController;

    constructor() {
        this.controlador = new TransaccionController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/transaccion')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/transaccion/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/transaccion/paginacion')
            .post(this.controlador.paginacion);


        this._rutas.route('/data/transaccion/xVersion/:id')
            .get(this.controlador.xversion)

        this._rutas.route('/data/transaccion/Version/:id')
            .get(this.controlador.version)

        //*
        this._rutas.route('/data/transaccion-version/:transaccion/:version')
            .put(this.controlador.ligarversiones)
            .delete(this.controlador.desligarversiones)

        

        //*
        this._rutas.route('/data/transaccion/margenes/:id')
            .get(this.controlador.margenes)

        //*
        this._rutas.route('/data/transaccion-margen/:transaccion/:margen')
            .put(this.controlador.ligarmargenes)
            .delete(this.controlador.desligarmargenes)

        
        this._rutas.route('/data/transaccion/xPromo/:id')
            .get(this.controlador.xpromo)

        this._rutas.route('/data/transaccion/Promo/:id')
            .get(this.controlador.promo)

        //*
        this._rutas.route('/data/transaccion-promo/:transaccion/:promo')
            .put(this.controlador.ligarpromos)
            .delete(this.controlador.desligarpromos)

        

        //*
        this._rutas.route('/data/transaccion/descuentos/:id')
            .get(this.controlador.descuentos)

        //*
        this._rutas.route('/data/transaccion-descuento/:transaccion/:descuento')
            .put(this.controlador.ligardescuentos)
            .delete(this.controlador.desligardescuentos)

        
        this._rutas.route('/data/transaccion/xPrecio/:id')
            .get(this.controlador.xprecio)

        this._rutas.route('/data/transaccion/Precio/:id')
            .get(this.controlador.precio)

        //*
        this._rutas.route('/data/transaccion-precio/:transaccion/:precio')
            .put(this.controlador.ligarprecios)
            .delete(this.controlador.desligarprecios)

        
        this._rutas.route('/data/transaccion/xOrden/:id')
            .get(this.controlador.xorden)

        this._rutas.route('/data/transaccion/Orden/:id')
            .get(this.controlador.orden)

        //*
        this._rutas.route('/data/transaccion-orden/:transaccion/:orden')
            .put(this.controlador.ligarordenes)
            .delete(this.controlador.desligarordenes)

        
        this._rutas.route('/data/transaccion/xEntrega/:id')
            .get(this.controlador.xentrega)

        this._rutas.route('/data/transaccion/Entrega/:id')
            .get(this.controlador.entrega)

        //*
        this._rutas.route('/data/transaccion-entrega/:transaccion/:entrega')
            .put(this.controlador.ligarentregas)
            .delete(this.controlador.desligarentregas)

        
        }

    rutas() {
        return this._rutas;
    }
}
