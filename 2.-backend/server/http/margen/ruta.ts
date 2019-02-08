
import { Router } from "express";
import { MargenController } from "./controlador";

export class MargenRouter {
    private _rutas = Router();
    private controlador: MargenController;

    constructor() {
        this.controlador = new MargenController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/margen')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/margen/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/margen/paginacion')
            .post(this.controlador.paginacion);



        //*
        this._rutas.route('/data/margen/productos/:id')
            .get(this.controlador.productos)

        //*
        this._rutas.route('/data/margen-producto/:margen/:producto')
            .put(this.controlador.ligarproductos)
            .delete(this.controlador.desligarproductos)

        
        this._rutas.route('/data/margen/xMarca/:id')
            .get(this.controlador.xmarca)

        this._rutas.route('/data/margen/Marca/:id')
            .get(this.controlador.marca)

        //*
        this._rutas.route('/data/margen-marca/:margen/:marca')
            .put(this.controlador.ligarmarcas)
            .delete(this.controlador.desligarmarcas)

        

        //*
        this._rutas.route('/data/margen/transacciones/:id')
            .get(this.controlador.transacciones)

        //*
        this._rutas.route('/data/margen-transaccion/:margen/:transaccion')
            .put(this.controlador.ligartransacciones)
            .delete(this.controlador.desligartransacciones)

        
        //*
        this._rutas.route('/data/margen/Inventarios/:id')
            .get(this.controlador.inventarios)

        //*
        this._rutas.route('/data/margen-inventario-inventarios/:margen/:inventario')
            .put(this.controlador.ligarinventarios)
            .delete(this.controlador.desligarinventarios)

                

        this._rutas.route('/data/margen_sincronizarMargenes/')
            .get(this.controlador.sincronizarMargenes)

        
        }

    rutas() {
        return this._rutas;
    }
}
