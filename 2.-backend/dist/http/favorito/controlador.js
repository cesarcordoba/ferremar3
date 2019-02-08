"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = require('../error');
const _ = require('lodash');
const modelo_1 = require("./modelo");
class FavoritoController {
    constructor() {
        //* null
        this.crear = (req, res, next) => modelo_1.Favorito.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearFavorito', res));
        //* null
        this.buscar = (req, res, next) => req.params.id ?
            modelo_1.Favorito.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
                .catch(err => errorHandler(err, 'buscarFavorito', res))
            :
                modelo_1.Favorito.findAll()
                    .then(response => res.status(200).jsonp(response))
                    .catch(err => errorHandler(err, 'buscarFavorito', res));
        //* null
        this.actualizar = (req, res, next) => modelo_1.Favorito.update(req.body, { where: { id: req.params.id } })
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarFavorito', res));
        //* null
        this.eliminar = (req, res, next) => modelo_1.Favorito.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarFavorito', res));
        //* null
        this.paginacion = (req, res, next) => modelo_1.Favorito.findAndCountAll({
            order: req.body.order,
            where: req.body.where
        }).then(response => res.status(200).jsonp(new Object({
            items: _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
            paginas: Math.round(response.count / req.body.limite)
        })))
            .catch(err => errorHandler(err, 'paginacionFavorito', res));
    }
}
exports.FavoritoController = FavoritoController;
