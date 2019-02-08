
import { Router } from "express";
import { PortadaController } from "./controlador";

export class PortadaRouter {
    private _rutas = Router();
    private controlador: PortadaController;

    constructor() {
        this.controlador = new PortadaController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/portada')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/portada/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/portada/paginacion')
            .post(this.controlador.paginacion);


        this._rutas.route('/data/portada/xProducto/:id')
            .get(this.controlador.xproducto)

        this._rutas.route('/data/portada/Producto/:id')
            .get(this.controlador.producto)

        //*
        this._rutas.route('/data/portada-producto/:portada/:producto')
            .put(this.controlador.ligarproductos)
            .delete(this.controlador.desligarproductos)

        

        this._rutas.route('/data/portada_agrupar/:id')
            .get(this.controlador.agrupar)

        
        }

    rutas() {
        return this._rutas;
    }
}
