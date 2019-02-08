import { Router } from "express";
import { VideoController } from "../controladores/Video";

export class VideoRouter {
    private _rutas = Router();
    private _controller: VideoController;
    
    constructor() {
        this._controller = new VideoController();
        this.init();
    }

    private init() {
        this._rutas.route('/data/video')
            .get(this._controller.buscar)
            .post(this._controller.crear);

        this._rutas.route('/data/video/:id')
            .get(this._controller.buscar)
            .put(this._controller.actualizar)
            .delete(this._controller.eliminar);
    }

    rutas() {
        return this._rutas;
    }
}
