

import { Producto } from '../modelo'
const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {
    Promise.all([
		Producto.count(),
		Producto.count({where : { status : 1  }}),
		Producto.count({where : { status : 2  }}),
		Producto.count({where : { status : 3  }}),
		Producto.count({where : { status : 4  }}),
		Producto.count({where : { status : 5  }}),
		Producto.count({where : { status : 6  }}),
		Producto.count({where : { status : 0 }})
	])
	.then(result => resolve(result))

    })
}
