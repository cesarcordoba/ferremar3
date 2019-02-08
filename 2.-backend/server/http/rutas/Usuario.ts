import { Router, Response, Request, NextFunction} from "express";
import { UsuarioController } from "../controladores/Usuario";

export class UsuarioRouter {
    private _rutas = Router();
    private _usController: UsuarioController;
    
    constructor() {
        this._usController = new UsuarioController();
        this.init();
    }

    private init() {
        this._rutas.route('/data/usuario')
            .get(this._usController.buscar)
            .post(this._usController.crear);

        this._rutas.route('/data/usuario/:id')
            .get(this._usController.buscar)
            .put(this._usController.actualizar)
            .delete(this._usController.eliminar);
    }

    rutas() {
        return this._rutas;
    }
}