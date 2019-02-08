import { Video } from "../modelos/Video";
import { Response, Request, NextFunction } from "express-serve-static-core";


export class VideoController {
    
    crear(req: Request, res: Response, next: NextFunction) {
        Video.create(req.body)
            .then(response => res.status(200).jsonp(response));
    }

    buscar(req: Request, res: Response, next: NextFunction) {
        req.params.id ?
        Video.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
        :
        Video.findAll()
                .then(response => res.status(200).jsonp(response))
    }

    actualizar(req: Request, res: Response, next: NextFunction) {
        Video.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp({msj: 'SUCCESS!'}))
    }

    eliminar(req: Request, res: Response, next: NextFunction)  {
        Video.findById(req.params.id)
            .then(video => video.destroy().then(response => res.status(200).jsonp(response)))
    }

}