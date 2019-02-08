
import * as S3 from 'aws-sdk/clients/s3';
import { config } from '../../../conf/config'
import { Portada } from '../modelo'
import * as _ from 'lodash';
import * as fs from 'fs'
var jimp = require('jimp');


let s3 = new S3({
    accessKeyId: 'AKIAJCKJUEZYTONXU7OQ',
    secretAccessKey: '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',
    region: 'us-east-1'
})

module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {




        Portada.findAll()
        .then(portadas => {
            var datos = (page) => new Promise((resolve, reject) => resolve(_.chunk(portadas, 10)[page]) )

        // datos(1).then(response => res.status(200).jsonp(response))

            const generador = {
                [Symbol.asyncIterator]: async function* () {

                    let
                        page = 0,
                        cache = null

                    while(!_.isNull(cache) || page === 0) {

                        cache = await datos(page)

                        for (const portada of cache){

                            yield new Object({
                                origen : portada,
                                nuevos : await Promise.all([50,100,200].map(async (nuevo) =>
                                    await procesarArchivos(nuevo, portada)
                                        .then(body => crearArchivo(nuevo, portada, body))
                                        .then(path => subirArchivo(nuevo, portada, path))
                                        .then((key : any) =>
                                            Portada.findOrCreate({ where : { link : portada.IdProducto, dimension : nuevo + "x" + nuevo }, defaults : new Object({
                                                "link": key.Location,
                                                "Key" : nuevo + '_' + portada.IdProducto + '.png',
                                                "dimension": nuevo + "x" + nuevo,
                                                "folio": portada.folio,
                                                "width": nuevo,
                                                "height": nuevo,
                                                    "IdProducto": portada.IdProducto,
                                                })
                                            })
                                            .spread((portada : Portada, created) => {

                                                portada.update({
                                                    "link": key.Location
                                                })

                                            })
                                        )))
                                })
                        }

                        page = page + 1

                    }
                }
            }

            ;(async function(){
                for await (const item of generador[ Symbol.asyncIterator ]() ){
                    resolve(item)
                }
            })()
        })


    })
}

var procesarArchivos = (nuevo, portada) =>
    new Promise((resolve, reject) =>
        jimp.read(portada.link, (err, image) => {
            if (err) reject(err)
            image.resize(nuevo, nuevo).getBase64("image/png", (err, Buff) => {
                if (err) reject(err)
                resolve(Buff)
            })


        }))

var crearArchivo = (nuevo, portada, body) =>
    new Promise((resolve, reject) => {
        fs.exists('../temp/ '+ nuevo + '_' + portada.IdProducto + '.png', (exists) => {
            resolve('../temp/ '+ nuevo + '_' + portada.IdProducto + '.png')

            // fs.writeFile('../temp/ '+ nuevo + '_' + portada.IdProducto + '.png', body.replace(/^data:image\/png;base64,/, ""), 'base64', (err) => {
            //     })
        })
    })

var subirArchivo = (nuevo, portada, path) =>
    new Promise((resolve, reject) => {
        // fs.writeFile('../temp/ '+ nuevo + '_' + portada.IdProducto + '.png', body.replace(/^data:image\/png;base64,/, ""), 'base64', (err) => {
            s3.upload({
                Bucket: 'star-pruebas',
                Key: nuevo + '_' + portada.IdProducto + '.png',
                // ContentLength: 'file_info.size',
                Body: fs.createReadStream(path),
                ACL: 'public-read'
            }, (err, data) => {
                console.log(data)
                if (err) console.log('There was an error uploading your file: ', err)
                console.log(data)
                resolve(data)
            })
        })
