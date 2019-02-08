import { Producto } from '../../producto/modelo'
import { Categoria } from '../modelo'
const _ = require('lodash')


function jerarquia(){


    var items = Categoria.findAll().then(response => response.map(n => n.get({ plain : true})))


    var buscar = (array, id) => array.filter(n => n.IdCategoria === id).map(n => [  n.id, buscar(array, n.id) ])
    return {
            subniveles : (id) => new Promise((resolve) => {
            items.then(response => {
                resolve(  _.flattenDeep([ Number(id) , buscar(response, Number(id)) ])   )
            })
        })
    }
}


module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {

    console.log(req.params.id)

    jerarquia().subniveles(req.params.id)
        .then(response => Producto.findOne({ where : { IdCategoria  :  response, status : 1}}))
        .then(response => resolve(response))
        .catch(err => reject(err))

    })
}


    // Producto.findById(req.params.id)
    // .then(result => res.status(200).jsonp(result))
