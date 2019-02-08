

import { Version } from '../modelo'
const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {

            Version.findById(req.params.id)
            .then(item => item.$get('Sucursales'))
            .then((items : any) =>
                Promise.all(items.map( async (n) => n.Inventario.$get(  'Precios'  )))
            )
        .then(response => resolve(_.flatten(response)))
    })
}
