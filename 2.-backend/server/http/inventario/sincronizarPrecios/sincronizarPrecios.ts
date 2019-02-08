

import { Inventario } from '../modelo'
import { Precio } from '../../precio/modelo'
import { Variacionprecio } from '../../variacionprecio/modelo'


const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {

        Inventario.findAll({
            include : [
                { model : Precio,
                as : 'Precios'}
            ]
        })
        .then(inventarios => inventarios.filter(inventario => inventario.Precios.length > 0))
        .then(inventarios => Promise.all(inventarios.map(async (inventario) => {


            let precio = _.first(inventario.Precios.sort((a, b) => (new Date(a.createdAt).getTime()) + ( new Date(b.createdAt).getTime())))

            return await new Object({
                inventario : inventario,
                precio :  precio,
                precios : inventario.Precios.filter(n => n.id !== precio.id)
            })
        })))
        .then(inventarios => Promise.all(inventarios.map(async (inventario : any) =>
            await Promise.all([
                Variacionprecio.update({status : 1}, { where : { IdPrecio : inventario.precio.id , IdInventario: inventario.inventario.id }}),
                Promise.all(
                    inventario.precios.map(async (precio) =>
                        await Variacionprecio.update({status : 1}, { where : { IdPrecio : precio.id , IdInventario: inventario.inventario.id }}))
                )
            ])

        )))
        .then(response => resolve(response))




    })
}
