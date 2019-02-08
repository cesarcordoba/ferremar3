

import { Promo } from '../modelo'


import { Producto } from '../../producto/modelo'


const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {
        Producto.findById(req.params.id)
        .then(producto => producto.$get('Promos', { where : { status : 1 }}))
        .then((response : any) => resolve(response))
    })
}
