

import { Orden } from '../modelo'
import { Usuario } from '../../usuario/modelo'
import { Tarjeta } from '../../tarjeta/modelo'
import { Direccion } from '../../direccion/modelo'
import { Transaccion } from '../../transaccion/modelo'
import { Sucursal } from '../../sucursal/modelo'
import { Producto } from '../../producto/modelo'
import { Descuento } from '../../descuento/modelo'
import { Promo } from '../../promo/modelo'
import { Variacionprecio } from '../../variacionprecio/modelo'
import { Variacionmargen } from '../../variacionmargen/modelo'


const _ = require('lodash');

module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {
        Usuario.findById(req.body.usuario)
      .then(usuario => Promise.all([
              usuario.$get('Versiones'),
              usuario.$get('Tarjetas', { where : {principal : 1}}),
              usuario.$get('Direcciones', {where : {principal : 1}}),
              usuario.$get('Sucursal')
      ]))
      .then((response : any) => Orden.create({
              IdUsuario : req.body.usuario,
              IdTarjeta : response[1][0].id,
              IdDireccion : response[2][0].id,
              IdSucursal : response[3].id,
              status : 0
          }).then(orden => Promise.all(
              response[0].map(async (version) => await Promise.all([
                  version.$get('Sucursales')
                  .then((items : any) =>
                      Promise.all(
                          items.filter((sucursal : any) => sucursal.Inventario.status === 1).map( async (n) => Promise.all([
                                      n.Inventario.$get( 'Precios'),
                                      n.Inventario.$get(  'Margenes'  )
                                  ])
                              )))
                              .then(response => _.flattenDepth(response, 1)),
                  version.$get('Descuentos', {include : [
                      { model : Promo, as : 'Promo', where : {
                          status : 1
                      }}
                  ]})
              ]).then((response : any) => {


                    let precio = _.last(response[0][0].filter((item : any) => item.Variacionprecio.status === 1))
                    let margenes = response[0][1].filter((item : any) => item.Variacionmargen.status === 1)
                    let descuentos = response[1]


                  return Transaccion.create({
                    IdOrden : orden.id,
                    IdVersion : version.id,
                    IdPrecio : precio.id,
                    cantidad : version.Favorito.cantidad,
                    total : descuentos.reduce((ac, v : any) => {
                        return ac - (ac * ( v.cantidad / 100)    )
                    },
                      margenes.reduce((ac, v : any ) => {
                        return ac + (ac * (  v.cantidad / 100 ))
                        }, precio.cantidad)
                    )
                  })
                  .then(async (transaccion) => {

                        await Promise.all([
                          transaccion.$set('Margenes', margenes.map(n => n.id)),
                          transaccion.$set('Descuentos', descuentos.map(n => n.id))
                        ])
                        return await  transaccion

                        // new Object({
                        //     transacciones : transaccion,
                        //     precio : precio,
                        //     margenes : margenes,
                        //     descuentos : descuentos
                        // })
                    })
                })
            ))
            .then(transacciones =>

                orden.update({total : transacciones.reduce((ac, v : any ) => ac + v.total , 0) })

            ))
        )
      .then(response =>  resolve(response))

    })
}
