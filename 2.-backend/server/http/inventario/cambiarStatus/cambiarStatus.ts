

import { Inventario } from '../modelo'
const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {

        Inventario.findById(req.params.id)
        .then((inventario : any) => Promise.all([
            inventario.update({status : 1}),
            Inventario.update({status : 0}, {  where : {id : { $not : req.params.id } , IdVersion : inventario.IdVersion }})
        ]))
        .then(response => resolve(response))
        
    })
}
