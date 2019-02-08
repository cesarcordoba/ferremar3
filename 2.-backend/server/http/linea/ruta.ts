
import { Router } from "express";
import { LineaController } from "./controlador";

export class LineaRouter {
    private _rutas = Router();
    private controlador: LineaController;

    constructor() {
        this.controlador = new LineaController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/linea')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/linea/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/linea/paginacion')
            .post(this.controlador.paginacion);



        //*
        this._rutas.route('/data/linea/productos/:id')
            .get(this.controlador.productos)

        //*
        this._rutas.route('/data/linea-producto/:linea/:producto')
            .put(this.controlador.ligarproductos)
            .delete(this.controlador.desligarproductos)

        
        this._rutas.route('/data/linea/xMarca/:id')
            .get(this.controlador.xmarca)

        this._rutas.route('/data/linea/Marca/:id')
            .get(this.controlador.marca)

        //*
        this._rutas.route('/data/linea-marca/:linea/:marca')
            .put(this.controlador.ligarmarcas)
            .delete(this.controlador.desligarmarcas)

        

        this._rutas.route('/data/linea_xNombre')
            .put(this.controlador.xNombre)

        
        }

    rutas() {
        return this._rutas;
    }
}
