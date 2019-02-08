
import { Router } from "express";
import { AmbienteController } from "./controlador";

export class AmbienteRouter {
    private _rutas = Router();
    private controlador: AmbienteController;

    constructor() {
        this.controlador = new AmbienteController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/ambiente')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/ambiente/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/ambiente/paginacion')
            .post(this.controlador.paginacion);


        this._rutas.route('/data/ambiente/xCuarto/:id')
            .get(this.controlador.xcuarto)

        this._rutas.route('/data/ambiente/Cuarto/:id')
            .get(this.controlador.cuarto)

        //*
        this._rutas.route('/data/ambiente-cuarto/:ambiente/:cuarto')
            .put(this.controlador.ligarcuartos)
            .delete(this.controlador.desligarcuartos)

        

        //*
        this._rutas.route('/data/ambiente/espacios/:id')
            .get(this.controlador.espacios)

        //*
        this._rutas.route('/data/ambiente-espacio/:ambiente/:espacio')
            .put(this.controlador.ligarespacios)
            .delete(this.controlador.desligarespacios)

        
        //*
        this._rutas.route('/data/ambiente/Productos/:id')
            .get(this.controlador.productos)

        //*
        this._rutas.route('/data/ambiente-producto-productos/:ambiente/:producto')
            .put(this.controlador.ligarproductos)
            .delete(this.controlador.desligarproductos)

                
        }

    rutas() {
        return this._rutas;
    }
}
