
import { Router } from "express";
import { PrecioController } from "./controlador";

export class PrecioRouter {
    private _rutas = Router();
    private controlador: PrecioController;

    constructor() {
        this.controlador = new PrecioController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/precio')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/precio/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/precio/paginacion')
            .post(this.controlador.paginacion);



        //*
        this._rutas.route('/data/precio/transacciones/:id')
            .get(this.controlador.transacciones)

        //*
        this._rutas.route('/data/precio-transaccion/:precio/:transaccion')
            .put(this.controlador.ligartransacciones)
            .delete(this.controlador.desligartransacciones)

        
        //*
        this._rutas.route('/data/precio/Inventarios/:id')
            .get(this.controlador.inventarios)

        //*
        this._rutas.route('/data/precio-inventario-inventarios/:precio/:inventario')
            .put(this.controlador.ligarinventarios)
            .delete(this.controlador.desligarinventarios)

                
        }

    rutas() {
        return this._rutas;
    }
}
