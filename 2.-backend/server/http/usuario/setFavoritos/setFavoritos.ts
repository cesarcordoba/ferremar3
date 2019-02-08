

import { Usuario } from '../modelo'
const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {

        console.log(req.body.favoritos)

        Usuario.findById(req.body.usuario)
        .then(async (usuario) => {

            await usuario.$get('Versiones')
            .then((versiones : any) => Promise.all(
                versiones.map(async (version) => version.$remove('Usuarios', req.body.usuario ))
            ))

            return await Promise.all(
                req.body.favoritos.map(async (favorito) =>
                    await usuario.$add('Versiones', favorito.id, {through : {cantidad : favorito.Favorito.cantidad ?  favorito.Favorito.cantidad : 1 }} )
                )
            )
        })
        .then(response => resolve(response))
    })
}
