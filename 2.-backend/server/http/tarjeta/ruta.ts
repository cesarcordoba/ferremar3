
import { Router } from "express";
import { TarjetaController } from "./controlador";

export class TarjetaRouter {
    private _rutas = Router();
    private controlador: TarjetaController;

    constructor() {
        this.controlador = new TarjetaController();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/tarjeta')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/tarjeta/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/tarjeta/paginacion')
            .post(this.controlador.paginacion);


        this._rutas.route('/data/tarjeta/xUsuario/:id')
            .get(this.controlador.xusuario)

        this._rutas.route('/data/tarjeta/Usuario/:id')
            .get(this.controlador.usuario)

        //*
        this._rutas.route('/data/tarjeta-usuario/:tarjeta/:usuario')
            .put(this.controlador.ligarusuarios)
            .delete(this.controlador.desligarusuarios)

        

        //*
        this._rutas.route('/data/tarjeta/ordenes/:id')
            .get(this.controlador.ordenes)

        //*
        this._rutas.route('/data/tarjeta-orden/:tarjeta/:orden')
            .put(this.controlador.ligarordenes)
            .delete(this.controlador.desligarordenes)

        

        //*
        this._rutas.route('/data/tarjeta/cargos/:id')
            .get(this.controlador.cargos)

        //*
        this._rutas.route('/data/tarjeta-cargo/:tarjeta/:cargo')
            .put(this.controlador.ligarcargos)
            .delete(this.controlador.desligarcargos)

        

        this._rutas.route('/data/tarjeta_asignarPrincipal/:id')
            .get(this.controlador.asignarPrincipal)

        

        this._rutas.route('/data/tarjeta_validarOpenpay')
            .post(this.controlador.validarOpenpay)

        
        }

    rutas() {
        return this._rutas;
    }
}
