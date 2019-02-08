

import { Version } from '../modelo'
const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {
    Version.findAll({
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
