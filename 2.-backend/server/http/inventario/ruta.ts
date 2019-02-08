
import { Router } from "express";
import { InventarioController } from "./controlador";

export class InventarioRouter {
    private _rutas = Router();
    private controlador: InventarioController;

    constructor() {
        this.controlador = new InventarioController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/inventario')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/inventario/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/inventario/paginacion')
            .post(this.controlador.paginacion);



        //*
        this._rutas.route('/data/inventario/existencias/:id')
            .get(this.controlador.existencias)

        //*
        this._rutas.route('/data/inventario-existencia/:inventario/:existencia')
            .put(this.controlador.ligarexistencias)
            .delete(this.controlador.desligarexistencias)

        
        //*
        this._rutas.route('/data/inventario/Margenes/:id')
            .get(this.controlador.margenes)

        //*
        this._rutas.route('/data/inventario-margen-margenes/:inventario/:margen')
            .put(this.controlador.ligarmargenes)
            .delete(this.controlador.desligarmargenes)

                
        //*
        this._rutas.route('/data/inventario/Precios/:id')
            .get(this.controlador.precios)

        //*
        this._rutas.route('/data/inventario-precio-precios/:inventario/:precio')
            .put(this.controlador.ligarprecios)
            .delete(this.controlador.desligarprecios)

                

        this._rutas.route('/data/inventario_sincronizarStatus/')
            .get(this.controlador.sincronizarStatus)

        

        this._rutas.route('/data/inventario_cambiarStatus/:id')
            .get(this.controlador.cambiarStatus)

        

        this._rutas.route('/data/inventario_sincronizarPrecios/')
            .get(this.controlador.sincronizarPrecios)

        
        }

    rutas() {
        return this._rutas;
    }
}
