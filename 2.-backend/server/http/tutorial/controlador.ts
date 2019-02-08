
const errorHandler = require('../error');
const _ = require('lodash');

import { Tutorial } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class TutorialController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Tutorial.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearTutorial', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Tutorial.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarTutorial', res))
        :
        Tutorial.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarTutorial', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Tutorial.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarTutorial', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Tutorial.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarTutorial', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Tutorial.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionTutorial', res))


}