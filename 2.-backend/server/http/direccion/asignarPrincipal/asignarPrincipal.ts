

import { Direccion } from '../modelo'
const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {
        Direccion.findById(req.params.id)
        .then((direccion : any) => {
            Direccion.update({principal : 0}, {where : { IdUsuario : direccion.IdUsuario, id : { $notLike  :  req.params.id} }})
            direccion.update({principal : 1})
            .then(response => resolve(response))
        })
    })
}
