

import { Inventario } from '../modelo'

import { Precio } from '../../precio/modelo'

const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {

        Inventario.findAll({
            include : [
                { model : Precio, as : 'Precios'}
            ]
        })
        .then(inventarios => inventarios.filter(inventario => inventario.Precios.length > 0))

        // .then(inventarios => Promise.all(inventarios.map(async (inventario) =>
        //     inventario.$get('Precios')
        // )))
        .then(inventarios => {

            let items = _.flattenDeep(Object.entries(_.groupBy(inventarios, (x) => x.IdVersion )
                ).map(n => new Object({ version : Number(n[0]), inventarios : n[1]  })
            ).filter((item : any) => item.inventarios.length > 0)
                .map((version : any) =>
                    version.inventarios.map(inventario =>
                        inventario.Precios.map(precio =>
                            new Object({
                                inventario : inventario.id,
                                version : version.version,
                                clave : inventario.clave,
                                precio : precio.cantidad,
                                fecha : precio.createdAt
                            })
            ))))

            let item2 = Object.entries(_.groupBy(items, (x) => x.version )).map((n : any) =>
                new Object({
                    version : Number(n[0]),
                    inventario : _.last(n[1].sort((a, b) => (new Date(b.createdAt).getTime()) + ( new Date(a.createdAt).getTime())))
                })
            )

            resolve(item2)

            var datos = (page) => new Promise((resolve, reject) => resolve(_.chunk(items, 10)[page]) )

        // datos(1).then(response => res.status(200).jsonp(response))

            const generador = {
                [Symbol.asyncIterator]: async function* () {

                    let
                        page = 0,
                        cache = null

                    while(!_.isNull(cache) || page === 0) {

                        cache = await datos(page)

                        for (const inventario of cache){

                            console.log(inventario)

                            yield Inventario.findById(inventario.inventario).then(inventario => inventario.update({status : 1}))
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
        // .then(response => resolve(response))

    })
}
