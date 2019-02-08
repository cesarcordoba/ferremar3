

import { Gama } from '../modelo'
const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {
    Gama.findAll({
                where : {
                    nombre : {
                        $like :  '%' + req.body.nombre + '%',
                    }
                }
            })

    })
}
