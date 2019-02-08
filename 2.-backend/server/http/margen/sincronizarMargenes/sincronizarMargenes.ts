
import { Margen } from '../modelo'

import { Producto } from '../../producto/modelo'

import { Version } from '../../version/modelo'

const _ = require('lodash');

module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {

        Margen.findAll({
            include : [
                {
                    model :  Producto,
                    as : 'Productos',
                    include : [
                        { model :  Version, as : 'Versiones' }
                    ]

                }
            ]
        })
        .then(margenes =>
            Promise.all(margenes.map(async (margen) =>
                Promise.all( margen.Productos.map(async (producto) =>
                    Promise.all( producto.Versiones.map(async (version) =>
                        version.$get('Sucursales')
                        .then((sucursales : any) => Promise.all(
                            sucursales.map(async ( sucursal ) => new Object({
                                margen : margen,
                                inventario : sucursal.Inventario.id
                            }))
                        ))
                    ))

                ))

            ))
        )
        .then(margenes => _.flattenDeep(margenes))
        .then(margenes => {

            var datos = (page) => new Promise((resolve, reject) => resolve(_.chunk(margenes, 10)[page]) )

        // datos(1).then(response => res.status(200).jsonp(response))

            const generador = {
                [Symbol.asyncIterator]: async function* () {

                    let
                        page = 0,
                        cache = null

                    while(!_.isNull(cache) || page === 0) {

                        cache = await datos(page)

                        for (const margen of cache){
                            yield  margen.margen.$add('Inventarios', margen.inventario)
                        }

                        page = page + 1

                    }
                }
            }

            ;(async function(){
                for await (const item of generador[ Symbol.asyncIterator ]() ){

                }
            })()
        })

    })
}
