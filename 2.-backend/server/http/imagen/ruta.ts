
import { Router } from "express";
import { ImagenController } from "./controlador";

export class ImagenRouter {
    private _rutas = Router();
    private controlador: ImagenController;

    constructor() {
        this.controlador = new ImagenController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/imagen')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/imagen/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/imagen/paginacion')
            .post(this.controlador.paginacion);


        this._rutas.route('/data/imagen/xProducto/:id')
            .get(this.controlador.xproducto)

        this._rutas.route('/data/imagen/Producto/:id')
            .get(this.controlador.producto)

        //*
        this._rutas.route('/data/imagen-producto/:imagen/:producto')
            .put(this.controlador.ligarproductos)
            .delete(this.controlador.desligarproductos)

        
        }

    rutas() {
        return this._rutas;
    }
}
