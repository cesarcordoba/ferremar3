"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = require('../error');
const _ = require('lodash');
const modelo_1 = require("./modelo");
class TutorialController {
    constructor() {
        //* null
        this.crear = (req, res, next) => modelo_1.Tutorial.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearTutorial', res));
        //* null
        this.buscar = (req, res, next) => req.params.id ?
            modelo_1.Tutorial.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
                .catch(err => errorHandler(err, 'buscarTutorial', res))
            :
                modelo_1.Tutorial.findAll()
                    .then(response => res.status(200).jsonp(response))
                    .catch(err => errorHandler(err, 'buscarTutorial', res));
        //* null
        this.actualizar = (req, res, next) => modelo_1.Tutorial.update(req.body, { where: { id: req.params.id } })
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarTutorial', res));
        //* null
        this.eliminar = (req, res, next) => modelo_1.Tutorial.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarTutorial', res));
        //* null
        this.paginacion = (req, res, next) => modelo_1.Tutorial.findAndCountAll({
            order: req.body.order,
            where: req.body.where
        }).then(response => res.status(200).jsonp(new Object({
            items: _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
            paginas: Math.round(response.count / req.body.limite)
        })))
            .catch(err => errorHandler(err, 'paginacionTutorial', res));
    }
}
exports.TutorialController = TutorialController;
