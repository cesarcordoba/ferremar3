import { Imagen } from "../modelos/Imagen";
import { Response, Request, NextFunction } from "express-serve-static-core";
import * as FroalaEditor from 'wysiwyg-editor-node-sdk';


export class ImagenController {

    crear(req: Request, res: Response, next: NextFunction) {
        Imagen.create(req.body)
            .then(response => res.status(200).jsonp(response));
    }

    buscar(req: Request, res: Response, next: NextFunction) {
        req.params.id ?
        Imagen.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
        :
        Imagen.findAll()
                .then(response => res.status(200).jsonp(response))
    }

    actualizar(req: Request, res: Response, next: NextFunction) {
        Imagen.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp({msj: 'SUCCESS!'}))
    }

    eliminar(req: Request, res: Response, next: NextFunction)  {
        Imagen.findById(req.params.id)
            .then(imagen => imagen.destroy().then(response => res.status(200).jsonp(response)))
    }

    froala(req: Request, res: Response, next: NextFunction){
        var configs = {
			// The name of your bucket.
			bucket: 'colnal-imagenes',
		 
			// S3 region. If you are using the default us-east-1, it this can be ignored.
			region: 'us-east-1',
		 
			// The folder where to upload the images.
			keyStart: 'imagenes/',
		 
			// File access.
			acl: 'public-read',
		 
			// AWS keys.
			accessKey: 'AKIAJEYX66PCBH6V4VHQ',
			secretKey: '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'
		  }
		 
          var s3Hash = FroalaEditor.S3.getHash(configs);
          res.status(200).jsonp(s3Hash)
		  console.log(s3Hash)
    }

}
