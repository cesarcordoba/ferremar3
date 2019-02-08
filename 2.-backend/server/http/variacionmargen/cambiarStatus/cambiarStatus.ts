

import { Variacionmargen } from '../modelo'

const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {

        Variacionmargen.findAll()
        .then(variaciones => Promise.all(variaciones.map(async(variacion) => variacion.update({status : 1}))))
        .then(response => resolve(response))

    })
}
