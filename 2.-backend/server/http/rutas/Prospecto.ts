import { Router } from "express";
import { ProspectoController } from "../controladores/Prospecto";

export class ProspectoRouter {
    private _rutas = Router();
    private _controller: ProspectoController;
    
    constructor() {
        this._controller = new ProspectoController();
        this.init();
    }

    private init() {
        this._rutas.route('/data/prospecto')
            .get(this._controller.buscar)
            .post(this._controller.crear);

        this._rutas.route('/data/prospecto/:id')
            .get(this._controller.buscar)
            .put(this._controller.actualizar)
            .delete(this._controller.eliminar);
    }

    rutas() {
        return this._rutas;
    }
}
