
import { Router } from "express";
import { OpcionController } from "./controlador";

export class OpcionRouter {
    private _rutas = Router();
    private controlador: OpcionController;

    constructor() {
        this.controlador = new OpcionController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/opcion')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/opcion/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/opcion/paginacion')
            .post(this.controlador.paginacion);



        //*
        this._rutas.route('/data/opcion/versiones/:id')
            .get(this.controlador.versiones)

        //*
        this._rutas.route('/data/opcion-version/:opcion/:version')
            .put(this.controlador.ligarversiones)
            .delete(this.controlador.desligarversiones)

        
        this._rutas.route('/data/opcion/xAtributo/:id')
            .get(this.controlador.xatributo)

        this._rutas.route('/data/opcion/Atributo/:id')
            .get(this.controlador.atributo)

        //*
        this._rutas.route('/data/opcion-atributo/:opcion/:atributo')
            .put(this.controlador.ligaratributos)
            .delete(this.controlador.desligaratributos)

        
        }

    rutas() {
        return this._rutas;
    }
}
