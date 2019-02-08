

import { Version } from '../modelo'
import { Promo } from '../../promo/modelo'
const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {

        Version.findById(req.params.id)
        .then(version =>
            Promise.all([
                version.$get('Sucursales')
                .then((items : any) =>
                    Promise.all(
                        items.filter((sucursal : any) => sucursal.Inventario.status === 1).map( async (n) => Promise.all([
                                    n.Inventario.$get(  'Precios'  ),
                                    n.Inventario.$get(  'Margenes'  )
                                ])
                            )))
                            .then(response => _.flattenDepth(response, 1)),

                // version.$get('Margenes'),
                version.$get('Descuentos', {include : [
                    { model : Promo, as : 'Promo', where : {
                        status : 1
                    }}
                ]})
                // .then((descuentos : any) => Promise.all([
                //     descuentos.map(async (descuento) =>  descuento.$get('Promo'))
                // ]))
            ]))
        .then((response : any) => {



            let precio = _.last(response[0][0])
            let margenes = response[0][1].map(n => n.cantidad)
            let descuentos = response[1].map(n => n.cantidad)

            return {
                // precio : precio,
                // margenes : margenes,
                promo : descuentos.length > 0 ? true : false,
                precioactual : descuentos.reduce((ac, v) => {
                    return ac - (ac * ( v / 100)    )
                },
                  margenes.reduce((ac, v) => {
                    return ac + (ac * (  v / 100 ))
                    }, precio.cantidad)
                )
            }

        })
        .then(response => resolve(response))

    })
}
