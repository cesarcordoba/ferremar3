
import { Router } from "express";
import { ExistenciaController } from "./controlador";

export class ExistenciaRouter {
    private _rutas = Router();
    private controlador: ExistenciaController;

    constructor() {
        this.controlador = new ExistenciaController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/existencia')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/existencia/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/existencia/paginacion')
            .post(this.controlador.paginacion);



        //*
        this._rutas.route('/data/existencia/inventarios/:id')
            .get(this.controlador.inventarios)

        //*
        this._rutas.route('/data/existencia-inventario/:existencia/:inventario')
            .put(this.controlador.ligarinventarios)
            .delete(this.controlador.desligarinventarios)

        
        }

    rutas() {
        return this._rutas;
    }
}
