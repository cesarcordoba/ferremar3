

import { Tarjeta } from '../modelo'
const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {

        Tarjeta.findById(req.params.id)
        .then((tarjeta : any) => {
            Tarjeta.update({principal : 0}, {where : { IdUsuario : tarjeta.IdUsuario, id : { $notLike  :  req.params.id} }})
            tarjeta.update({principal : 1})
            .then(response => resolve(response))
        })

    })
}
