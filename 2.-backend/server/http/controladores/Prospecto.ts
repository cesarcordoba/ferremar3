import { Prospecto } from "../modelos/Prospecto";
import { Response, Request, NextFunction } from "express-serve-static-core";


export class ProspectoController {
    
    crear(req: Request, res: Response, next: NextFunction) {
        Prospecto.create(req.body)
            .then(response => res.status(200).jsonp(response));
    }

    buscar(req: Request, res: Response, next: NextFunction) {
        req.params.id ?
        Prospecto.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
        :
        Prospecto.findAll()
                .then(response => res.status(200).jsonp(response))
    }

    actualizar(req: Request, res: Response, next: NextFunction) {
        Prospecto.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp({msj: 'SUCCESS!'}))
    }

    eliminar(req: Request, res: Response, next: NextFunction)  {
        Prospecto.findById(req.params.id)
            .then(prospecto => prospecto.destroy().then(response => res.status(200).jsonp(response)))
    }

}