
import { Router } from "express";
import { GamaController } from "./controlador";

export class GamaRouter {
    private _rutas = Router();
    private controlador: GamaController;

    constructor() {
        this.controlador = new GamaController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/gama')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/gama/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/gama/paginacion')
            .post(this.controlador.paginacion);



        //*
        this._rutas.route('/data/gama/productos/:id')
            .get(this.controlador.productos)

        //*
        this._rutas.route('/data/gama-producto/:gama/:producto')
            .put(this.controlador.ligarproductos)
            .delete(this.controlador.desligarproductos)

        
        this._rutas.route('/data/gama/xMarca/:id')
            .get(this.controlador.xmarca)

        this._rutas.route('/data/gama/Marca/:id')
            .get(this.controlador.marca)

        //*
        this._rutas.route('/data/gama-marca/:gama/:marca')
            .put(this.controlador.ligarmarcas)
            .delete(this.controlador.desligarmarcas)

        

        this._rutas.route('/data/gama_ambientes/:id')
            .get(this.controlador.ambientes)

        

        this._rutas.route('/data/gama_xNombre')
            .put(this.controlador.xNombre)

        
        }

    rutas() {
        return this._rutas;
    }
}
