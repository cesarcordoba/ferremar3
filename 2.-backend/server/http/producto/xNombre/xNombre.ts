

import { Producto } from '../modelo'
const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {

        Producto.findAll({
            where : {
                nombre : {
                    $like :  '%' + req.body.nombre + '%',
                },
                status : req.body.status
            }
        })
    	.then(response => resolve(response))

    })
}
