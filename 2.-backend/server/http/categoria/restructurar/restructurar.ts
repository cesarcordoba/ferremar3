
import { Categoria } from '../modelo'

const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {



        var buscar = (array, id, nivel) => {
            return new Promise(resolve => resolve(
                Promise.all(

                array.filter(n => n.IdCategoria === id).map(async (categoria) => new Object({
                    verdad : await categoria.update({nivel : nivel}),
                    categoria : categoria,
                    nivel : nivel,
                    hijos : await buscar(todas, categoria.id, nivel + 1),
                }))
            )))
        }

        var todas


        Categoria.findAll()
        .then(categorias => todas = categorias)
        .then(categorias => categorias.filter((categoria : any) => categoria.IdCategoria === null))
        .then(categorias =>
            Promise.all(
                categorias.map(async (categoria) => new Object({
                    categoria : categoria,
                    verdad : await categoria.update({nivel : 1}),
                    nivel : 1,
                    hijos : await buscar(todas, categoria.id, 2)
                })
        )))
        .then((categoria : any) => {
            console.log(categoria)
            resolve(categoria)
        })




    })
}
