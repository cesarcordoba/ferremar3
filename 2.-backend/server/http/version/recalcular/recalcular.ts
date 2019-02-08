

import { Version } from '../modelo'

import { Inventario } from '../../inventario/modelo'


const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {

        Version.findById(req.params.id)
        .then(version => version.$get('Sucursales'))
        .then((sucursales : any)  => sucursales.find(sucursal => sucursal.Inventario.status === 1))
        .then(sucursal => Inventario.findById(sucursal.Inventario.id))
        .then(async (inventario) => Promise.all([
            inventario.$get('Precios'),
            inventario.$get('Margenes')
        ]))
        .then((array : any) => {


            let precio = array[0].find(precio => precio.Variacionprecio.status === 1)
            let margenes = array[1].filter(margen => margen.Variacionmargen.status === 1)

            return margenes.reduce((precio, margen) => {
                return precio + (precio * (margen.cantidad / 100))
            }, precio.cantidad)

        })
        .then(precio => {

            Version.update({precio : precio}, { where : { id : req.params.id }})

            resolve(precio)

        })

    })
}
