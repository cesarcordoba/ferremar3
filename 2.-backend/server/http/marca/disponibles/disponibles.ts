

import { Marca } from '../modelo'
const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {
    Marca.findAll({where : {status : 1}})
    .then(response => resolve(response))

    })
}
