

import { Producto } from '../modelo'
const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {
    Producto.findById(req.params.id)
.then(item => item.$get('Versiones', { where : {  status : 1  } }))
.then(response => resolve(response))

    })
}

    