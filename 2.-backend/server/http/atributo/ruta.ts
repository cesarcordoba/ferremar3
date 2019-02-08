
import { Router } from "express";
import { AtributoController } from "./controlador";

export class AtributoRouter {
    private _rutas = Router();
    private controlador: AtributoController;

    constructor() {
        this.controlador = new AtributoController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/atributo')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/atributo/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/atributo/paginacion')
            .post(this.controlador.paginacion);



        //*
        this._rutas.route('/data/atributo/categorias/:id')
            .get(this.controlador.categorias)

        //*
        this._rutas.route('/data/atributo-categoria/:atributo/:categoria')
            .put(this.controlador.ligarcategorias)
            .delete(this.controlador.desligarcategorias)

        

        //*
        this._rutas.route('/data/atributo/opciones/:id')
            .get(this.controlador.opciones)

        //*
        this._rutas.route('/data/atributo-opcion/:atributo/:opcion')
            .put(this.controlador.ligaropciones)
            .delete(this.controlador.desligaropciones)

        
        }

    rutas() {
        return this._rutas;
    }
}
