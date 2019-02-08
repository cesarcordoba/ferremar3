

import { Linea } from '../modelo'
const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {
    Linea.findAll({
                where : {
                    nombre : {
                        $like :  '%' + req.body.nombre + '%',
                    }
                }
            })
        .then(response => resolve(response))
    })
}
