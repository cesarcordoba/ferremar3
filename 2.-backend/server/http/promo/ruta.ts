
import { Router } from "express";
import { PromoController } from "./controlador";

export class PromoRouter {
    private _rutas = Router();
    private controlador: PromoController;

    constructor() {
        this.controlador = new PromoController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/promo')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/promo/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/promo/paginacion')
            .post(this.controlador.paginacion);



        //*
        this._rutas.route('/data/promo/descuentos/:id')
            .get(this.controlador.descuentos)

        //*
        this._rutas.route('/data/promo-descuento/:promo/:descuento')
            .put(this.controlador.ligardescuentos)
            .delete(this.controlador.desligardescuentos)

        

        //*
        this._rutas.route('/data/promo/ofertas/:id')
            .get(this.controlador.ofertas)

        //*
        this._rutas.route('/data/promo-oferta/:promo/:oferta')
            .put(this.controlador.ligarofertas)
            .delete(this.controlador.desligarofertas)

        

        //*
        this._rutas.route('/data/promo/transacciones/:id')
            .get(this.controlador.transacciones)

        //*
        this._rutas.route('/data/promo-transaccion/:promo/:transaccion')
            .put(this.controlador.ligartransacciones)
            .delete(this.controlador.desligartransacciones)

        
        //*
        this._rutas.route('/data/promo/Productos/:id')
            .get(this.controlador.productos)

        //*
        this._rutas.route('/data/promo-producto-productos/:promo/:producto')
            .put(this.controlador.ligarproductos)
            .delete(this.controlador.desligarproductos)

                

        this._rutas.route('/data/promo_verificarProducto/:id')
            .get(this.controlador.verificarProducto)

        
        }

    rutas() {
        return this._rutas;
    }
}
