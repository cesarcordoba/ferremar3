
import { Router } from "express";
import { CatalogoController } from "./controlador";

export class CatalogoRouter {
    private _rutas = Router();
    private controlador: CatalogoController;

    constructor() {
        this.controlador = new CatalogoController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/catalogo')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/catalogo/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/catalogo/paginacion')
            .post(this.controlador.paginacion);


        this._rutas.route('/data/catalogo/xMarca/:id')
            .get(this.controlador.xmarca)

        this._rutas.route('/data/catalogo/Marca/:id')
            .get(this.controlador.marca)

        //*
        this._rutas.route('/data/catalogo-marca/:catalogo/:marca')
            .put(this.controlador.ligarmarcas)
            .delete(this.controlador.desligarmarcas)

        
        }

    rutas() {
        return this._rutas;
    }
}
