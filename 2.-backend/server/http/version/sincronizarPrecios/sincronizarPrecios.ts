

import { Version } from '../modelo'


import { Sucursal } from '../../sucursal/modelo'
import { Inventario } from '../../inventario/modelo'
import { Precio } from '../../precio/modelo'


const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {


        Inventario.findAll({
            include : [
                { model : Precio,
                as : 'Precios'}
            ]
        })
        // .then(inventarios => Promise.all(
        //     inventarios.map(async (inventario) => new Object({
        //         inventario : inventario,
        //         precios : await inventario.$get('Precios')
        //     }))
        // ))
        .then(inventarios => inventarios.filter(inventario => inventario.Precios.length > 0))
        .then(response => resolve(response))

        // Version.findAll({
        //     include : [
        //         {
        //             model : Sucursal, as : 'Sucursales',
        //             through : {
        //                 where: { status : 1 }
        //             }
        //         }
        //     ]
        // })
        // .then(versiones => versiones.filter(n => n.Sucursales.length > 0))
        // .then(versiones => Promise.all(versiones.map(async (version) =>
        //         Promise.all(version.Sucursales.map(async (sucursal : any) =>
        //             Inventario.findById(sucursal.Inventario.id)
        //             .then(inventario => Promise.all([
        //                 inventario.$get('Margenes'),
        //                 inventario.$get('Precions')
        //             ]))
        //         ))
        //     ))
        // )
        //
        //
        // .then(versiones => {
        //
        //     console.log(versiones)
        //
        //     var datos = (page) => new Promise((resolve, reject) => resolve(_.chunk(versiones, 10)[page]) )
        //
        // // datos(1).then(response => res.status(200).jsonp(response))
        //
        //     const generador = {
        //         [Symbol.asyncIterator]: async function* () {
        //
        //             let
        //                 page = 0,
        //                 cache = null
        //
        //             while(!_.isNull(cache) || page === 0) {
        //
        //                 cache = await datos(page)
        //
        //                 for (const version of cache){
        //                     yield version
        //                 }
        //
        //                 page = page + 1
        //
        //             }
        //         }
        //     }
        //
        //     ;(async function(){
        //         for await (const item of generador[ Symbol.asyncIterator ]() ){
        //             resolve(item)
        //         }
        //     })()
        // })


    })
}
