

import { Producto } from '../modelo'
import { Version } from '../../version/modelo'
import { Promo } from '../../promo/modelo'
import { Categoria } from '../../categoria/modelo'
import { Color } from '../../color/modelo'
import { Opcion } from '../../opcion/modelo'

const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {

        ;(async function(){

		console.log(req.body)

		var buscar = (array, id) =>  array.filter(n => n.IdCategoria === id).map(n => [  n.id, buscar(array, n.id) ])

		var peticion = {
			// order : req.body.order,
			where : req.body.Where,
			include : []
		}

		if(req.body.Promo)
			peticion.include.push({
				model : Promo,
				as : 'Promos',
				where : { status : 1}
			})

		if(req.body.Precio && req.body.Precio.lenght > 0 && !_.isEqual(req.body.Precio, [ 0, 10000 ]))
			peticion.include.push({
				model : Version,
				as : 'Versiones',
				where : {
					status : 1,
					precio : { $between : req.body.Precio },
				}
			})



		if(req.body.Version && !_.isNull(req.body.Version))
			peticion.include.push({
				model : Version,
				as : 'Versiones',
				where : { nombre :
					{ $like :  '%' + req.body.Version + '%' },
				}
			})

        if(req.body.Producto && !_.isNull(req.body.Producto))
            peticion.where.push({
                nombre :
                    { $like :  '%' + req.body.Producto + '%'}
                })

		if(req.body.Opcion && req.body.Opcion.length > 0)
			peticion.include.push({
				model : Version,
				as : 'Versiones',
				where : {status : 1},
				include : [
					{
						model : Opcion,
						as : 'Opciones',
						where : { status : 1, id : { $or :  req.body.Opcion } }
					}
				]
			})

		if(req.body.nombre)
			peticion.where.push({
				nombre :
					{ $like :  '%' + req.body.nombre + '%'}
				})

		if(req.body.Categoria && req.body.Categoria.id)
			await Categoria.findAll()
			.then(response => {
				peticion.where.push({ IdCategoria : {  $or : _.flattenDeep([req.body.Categoria.id, buscar(response, req.body.Categoria.id)])   }    }   )
			})

		if(req.body.Marcas && req.body.Marcas.length > 0)
			peticion.where.push({ IdMarca : req.body.Marcas })

		if(req.body.Colores && req.body.Colores.length > 0)
			peticion.include.push({
				model : Color,
				as : 'Colores',
				where : { status : 1, id : { $or :  req.body.Colores } }
			})

	    await Producto.findAndCountAll(peticion)
		.then(response => resolve(
	            new Object({
					peticion : peticion,
	                items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
	                paginas : Math.ceil(response.count / req.body.limite)
	            })))

	})()

    })
}
