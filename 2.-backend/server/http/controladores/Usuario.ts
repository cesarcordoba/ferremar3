import { Usuario } from "../modelos/Usuario";
import { Response, Request, NextFunction } from "express-serve-static-core";
import { LlaveSocial } from "../modelos/LlaveSocial";


export class UsuarioController {
    
    crear(req: Request, res: Response, next: NextFunction) {
        Usuario.create(req.body)
            .then(response => res.status(200).jsonp(response));
    }

    buscar(req: Request, res: Response, next: NextFunction) {
        req.params.id ?
            Usuario.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
        :
            Usuario.findAll()
                .then(response => res.status(200).jsonp(response))
    }

    actualizar(req: Request, res: Response, next: NextFunction) {
        // Usuario.update(req.body,{ where: { id: req.params.id}, individualHooks: true, include: []})
        //     .then(response => res.status(200).jsonp({msj: 'SUCCESS!'}))

        Usuario.findById(req.params.id, {include: [LlaveSocial]}).then(user => {
            user.update(req.body, {individualHooks: true}).then(user => res.status(200).jsonp({msj: 'SUCCESS!'}))
        })
    }

    eliminar(req: Request, res: Response, next: NextFunction)  {
        Usuario.findById(req.params.id)
            .then(usuario => usuario.destroy().then(response => res.status(200).jsonp(response)))
    }

}