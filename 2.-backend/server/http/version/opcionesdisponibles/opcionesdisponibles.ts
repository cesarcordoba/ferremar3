

import { Version } from '../modelo'
const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {
    Version.findById(req.params.id)
    .then(item => item.$get('Opciones', { where : {  status : 1  } }))
    .then(response => resolve(response))

    })
}
