import { Router } from "express";
import { ImagenController } from "../controladores/Imagen";

export class ImagenRouter {
    private _rutas = Router();
    private _controller: ImagenController;
    
    constructor() {
        this._controller = new ImagenController();
        this.init();
    }

    private init() {
        this._rutas.route('/data/imagen')
            .get(this._controller.buscar)
            .post(this._controller.crear);

        this._rutas.route('/data/imagen/:id')
            .get(this._controller.buscar)
            .put(this._controller.actualizar)
            .delete(this._controller.eliminar);

        this._rutas.route('/froalahash')
            .get(this._controller.froala)
            
    }

    rutas() {
        return this._rutas;
    }
}
