
import { Router } from "express";
import { CategoriaController } from "./controlador";

export class CategoriaRouter {
    private _rutas = Router();
    private controlador: CategoriaController;

    constructor() {
        this.controlador = new CategoriaController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/categoria')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/categoria/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/categoria/paginacion')
            .post(this.controlador.paginacion);



        //*
        this._rutas.route('/data/categoria/productos/:id')
            .get(this.controlador.productos)

        //*
        this._rutas.route('/data/categoria-producto/:categoria/:producto')
            .put(this.controlador.ligarproductos)
            .delete(this.controlador.desligarproductos)

        

        //*
        this._rutas.route('/data/categoria/subcategorias/:id')
            .get(this.controlador.subcategorias)

        //*
        this._rutas.route('/data/categoria/precategorias/:id')
            .get(this.controlador.precategorias)

    

        //*
        this._rutas.route('/data/categoria/atributos/:id')
            .get(this.controlador.atributos)

        //*
        this._rutas.route('/data/categoria-atributo/:categoria/:atributo')
            .put(this.controlador.ligaratributos)
            .delete(this.controlador.desligaratributos)

        

        this._rutas.route('/data/categoria_ultimoproductoXcategoria/:id')
            .get(this.controlador.ultimoproducto)

        

        this._rutas.route('/data/categoria_nivel/:id')
            .get(this.controlador.nivel)

        

        this._rutas.route('/data/categoria_xNombre')
            .put(this.controlador.xNombre)

        

        this._rutas.route('/data/categoria_completo/')
            .get(this.controlador.completo)

        

        this._rutas.route('/data/categoria_padres/:id')
            .get(this.controlador.padres)

        

        this._rutas.route('/data/categoria_restructurar')
            .get(this.controlador.restructurar)

        
        }

    rutas() {
        return this._rutas;
    }
}
