

import { Categoria } from '../modelo'
const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {
        Categoria.findAll({where : { nivel : req.params.id}})
        .then(response => resolve(response))
        .catch(err => reject(err))

    })
}
